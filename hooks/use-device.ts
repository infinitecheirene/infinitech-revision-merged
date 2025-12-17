"use client"
import { useEffect, useState } from "react"

const TABLET_MIN = 768
const TABLET_MAX = 1024

export function useDeviceType() {
  const [device, setDevice] = useState<"mobile" | "tablet" | "laptop">("mobile")

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isLandscape = width > height

      if (width < TABLET_MIN) {
        setDevice("mobile")
      } else if (width >= TABLET_MIN && width <= TABLET_MAX) {
        setDevice("tablet")
      } else {
        if (isLandscape && width <= 1366 && height <= 1024) {
          setDevice("tablet")
        } else {
          setDevice("laptop")
        }
      }
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return device
}
