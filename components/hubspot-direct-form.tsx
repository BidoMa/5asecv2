"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function HubspotDirectForm() {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)
  const formCreated = useRef(false)
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    // Verificar si el elemento está en el viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFormVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (formContainerRef.current) {
      observer.observe(formContainerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    // Solo cargar el formulario cuando sea visible
    if (!isFormVisible) return

    // Función para crear el formulario
    const createForm = () => {
      if (window.hbspt && formContainerRef.current && !formCreated.current) {
        try {
          formCreated.current = true
          window.hbspt.forms.create({
            portalId: "22460986",
            formId: "7ec72945-1c2c-4c5a-82ae-e91808252a55",
            region: "na1",
            target: "#hubspot-form-container",
            cssClass: "hubspot-custom-form",
            onFormReady: (form) => {
              // Añadir clases personalizadas al formulario cuando esté listo
              try {
                const formElement = document.querySelector(".hubspot-custom-form form")
                if (formElement) {
                  const inputs = formElement.querySelectorAll("input, select, textarea")
                  inputs.forEach((input) => {
                    input.classList.add("focus:ring-2", "focus:ring-purple", "transition-all", "duration-200")
                  })

                  // Hacer el textarea más pequeño
                  const textarea = formElement.querySelector("textarea")
                  if (textarea) {
                    textarea.setAttribute("rows", "3")
                  }

                  const submitButton = formElement.querySelector('input[type="submit"]')
                  if (submitButton) {
                    submitButton.classList.add(
                      "bg-gradient-to-r",
                      "from-orange",
                      "to-orange-dark",
                      "hover:from-orange-dark",
                      "hover:to-orange",
                      "text-white",
                      "font-bold",
                      "py-2",
                      "px-6",
                      "rounded-lg",
                      "shadow-lg",
                      "hover:shadow-xl",
                      "transition-all",
                      "duration-300",
                      "w-full",
                      "mt-2",
                    )
                  }
                }
              } catch (error) {
                console.error("Error customizing form:", error)
              }
            },
          })
        } catch (error) {
          console.error("Error creating HubSpot form:", error)
        }
      }
    }

    // Verificar si el script ya está cargado
    if (window.hbspt) {
      scriptLoaded.current = true
      createForm()
      return
    }

    // Verificar periódicamente si el script se ha cargado (ya que lo cargamos con lazyOnload en layout)
    const checkInterval = setInterval(() => {
      if (window.hbspt) {
        scriptLoaded.current = true
        createForm()
        clearInterval(checkInterval)
      }
    }, 200)

    return () => {
      clearInterval(checkInterval)
    }
  }, [isFormVisible])

  return (
    <div className="hubspot-form-wrapper">
      {/* Contenedor para el formulario de HubSpot */}
      <div id="hubspot-form-container" ref={formContainerRef} className="min-h-[300px]">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="h-10 bg-gradient-to-r from-purple-100 to-orange-100 rounded-lg"></div>
          <div className="h-10 bg-gradient-to-r from-purple-100 to-orange-100 rounded-lg"></div>
          <div className="h-10 bg-gradient-to-r from-purple-100 to-orange-100 rounded-lg"></div>
          <div className="h-10 bg-gradient-to-r from-purple-100 to-orange-100 rounded-lg"></div>
          <div className="h-10 w-full bg-gradient-to-r from-orange to-orange-light rounded-lg"></div>
          <div className="h-4 w-3/4 bg-gray-100 rounded-lg"></div>
        </motion.div>
      </div>
    </div>
  )
}

// Declaración de tipos para window.hbspt
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: any) => any
      }
    }
  }
}
