"use client"

import type React from "react"
import { createContext, useContext } from "react"

// Crear contexto para el modal del formulario
type FormModalContextType = {
  openFormModal: () => void
  closeFormModal: () => void
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined)

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  // Ahora estas funciones solo hacen scroll al formulario
  const openFormModal = () => {
    const formElement = document.getElementById("hero-form-section")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const closeFormModal = () => {
    // Esta función ya no es necesaria pero la mantenemos por compatibilidad
  }

  return <FormModalContext.Provider value={{ openFormModal, closeFormModal }}>{children}</FormModalContext.Provider>
}

// Hook personalizado para usar el contexto
export function useFormModal() {
  const context = useContext(FormModalContext)
  if (context === undefined) {
    throw new Error("useFormModal must be used within a FormModalProvider")
  }
  return context
}
