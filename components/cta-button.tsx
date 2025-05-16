"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  children: React.ReactNode
}

export function CTAButton({ children, className, variant = "default", ...props }: CTAButtonProps) {
  const scrollToForm = () => {
    // Obtener el elemento del formulario
    const formElement = document.getElementById("hero-form-section")

    if (formElement) {
      // Scroll suave hasta el formulario
      formElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Opcional: añadir un efecto de resaltado al formulario
      formElement.classList.add("highlight-pulse")
      setTimeout(() => {
        formElement.classList.remove("highlight-pulse")
      }, 2000)
    } else {
      // Si no se encuentra el elemento, hacer scroll al inicio
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <Button
      variant={variant}
      className={cn(
        "relative overflow-hidden group",
        variant === "default" ? "bg-orange hover:bg-orange-dark text-white font-bold" : "",
        className,
      )}
      onClick={scrollToForm}
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <span className="absolute inset-0 w-full h-full bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></span>
    </Button>
  )
}
