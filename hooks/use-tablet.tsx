"use client"
import { useEffect, useState } from "react"

const TABLET_MIN = 768 // start of tablet range
const TABLET_MAX = 1024 // end of tablet range

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${TABLET_MIN}px) and (max-width: ${TABLET_MAX}px)`)

    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsTablet(e.matches)
    }

    // initial check
    setIsTablet(mql.matches)

    // subscribe
    mql.addEventListener("change", onChange)

    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return !!isTablet
}
