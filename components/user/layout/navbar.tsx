"use client"

import { useState, useEffect } from "react"
import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
} from "@heroui/react"
import { LuArrowRight, LuDownload } from "react-icons/lu"
import { Logo } from "@/components/globals/icons"
import { usePathname, useRouter } from "next/navigation"
import { links } from "@/data/links"

const NavBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const isActive = (href: string) => pathname == href

  // 👉 State for PWA install
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    const handleAppInstalled = () => {
      setShowInstallButton(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallApp = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowInstallButton(false)
    }
    setDeferredPrompt(null)
  }

  return (
    <Navbar
      className="fixed shadow-lg w-full top-0 z-50 bg-white"
      maxWidth="2xl"
      position="sticky"
      isMenuOpen={isOpen}
    >
      <NavbarContent className="basis-auto sm:basis-1/2" justify="start">
        <NavbarBrand
          className="flex items-center gap-3 cursor-pointer min-w-0"
          onClick={() => router.push("/")}
        >
          <Logo />
          <div className="hidden md:flex flex-col leading-tight">
            <p className="font-bold text-md xl:text-3xl text-primary">INFINITECH</p>
            <p className="text-xs font-semibold text-primary whitespace-nowrap">
              ADVERTISING CORPORATION
            </p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        justify="center"
        className="hidden xl:flex gap-1 xl:gap-3"
      >
        {links.map((link) => (
          <NavbarItem key={link.name}>
            <Button
              onPress={() => router.push(link.href)}
              className={`cursor-pointer ${
                isActive(link.href)
                  ? "text-gray-100 bg-primary font-semibold"
                  : "text-black"
              }`}
              variant={isActive(link.href) ? "solid" : "light"}
            >
              {link.name}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className="hidden xl:flex basis-auto"
        justify="end"
      >
        {showInstallButton && (
          <NavbarItem>
            <Button
              onPress={handleInstallApp}
              className="bg-blue-600 text-white font-medium hover:bg-blue-700"
              variant="solid"
              startContent={<LuDownload />}
            >
              Install App
            </Button>
          </NavbarItem>
        )}

        <NavbarItem>
          <Button
            className="text-sm bg-primary text-white font-medium hover:bg-primary-light"
            endContent={<LuArrowRight />}
            variant="solid"
            onPress={() => router.push("/quote")}
          >
            Get a Quote
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="xl:hidden basis-auto pl-3"
        justify="end"
      >
        {showInstallButton && (
          <NavbarItem>
            <Button
              onPress={handleInstallApp}
              className="bg-blue-600 text-white font-medium hover:bg-blue-700 mr-2"
              size="sm"
              variant="solid"
              startContent={<LuDownload />}
            >
              Install App
            </Button>
          </NavbarItem>
        )}

        <NavbarMenuToggle onClick={() => setIsOpen(!isOpen)} />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu className="overflow-y-auto max-h-[90vh]">
        <div className="mx-4 mt-4 flex flex-col gap-3 pb-6">
          {links.map((link) => (
            <NavbarMenuItem
              key={link.name}
              className={`cursor-pointer text-lg ${
                isActive(link.href) ? "text-primary" : "text-black"
              }`}
              onClick={() => {
                setIsOpen(false);
                router.push(link.href);
              }}
            >
              {link.name}
            </NavbarMenuItem>
          ))}

          <NavbarMenuItem
            className={`cursor-pointer text-lg ${
              isActive("/quote") ? "text-primary" : "text-black"
            }`}
            onClick={() => {
              setIsOpen(false);
              router.push("/quote");
            }}
          >
            Get a Quote
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </Navbar>
  )
}

export default NavBar
