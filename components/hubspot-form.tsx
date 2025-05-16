"use client"

import { useEffect, useRef, useState } from "react"

export function HubspotForm() {
  const [isLoading, setIsLoading] = useState(true)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const formId = useRef(`hubspot-form-${Math.random().toString(36).substring(2, 9)}`)
  const scriptLoadedRef = useRef(false)
  const formCreatedRef = useRef(false)

  // Efecto para cargar el script y crear el formulario
  useEffect(() => {
    // Evitar múltiples cargas
    if (scriptLoadedRef.current) return

    // Función para crear el formulario
    const createForm = () => {
      if (!window.hbspt || !formContainerRef.current || formCreatedRef.current) return

      try {
        // Limpiar el contenedor antes de crear el formulario
        if (formContainerRef.current.children.length > 0) {
          formContainerRef.current.innerHTML = ""
        }

        // Crear el formulario
        formCreatedRef.current = true
        window.hbspt.forms.create({
          region: "na1",
          portalId: "22460986",
          formId: "7ec72945-1c2c-4c5a-82ae-e91808252a55",
          target: `#${formId.current}`,
          onFormReady: () => {
            setIsLoading(false)
          },
        })
      } catch (error) {
        console.error("Error creating HubSpot form:", error)
      }
    }

    // Función para cargar el script de HubSpot
    const loadScript = () => {
      // Verificar si el script ya está cargado
      if (window.hbspt) {
        scriptLoadedRef.current = true
        createForm()
        return
      }

      // Crear el script
      const script = document.createElement("script")
      script.src = "https://js.hsforms.net/forms/v2.js"
      script.async = true
      script.onload = () => {
        scriptLoadedRef.current = true
        // Esperar un momento para asegurar que hbspt esté disponible
        setTimeout(createForm, 100)
      }

      // Añadir el script al documento
      document.head.appendChild(script)
    }

    // Cargar el script
    loadScript()

    // Limpieza al desmontar
    return () => {
      formCreatedRef.current = false
    }
  }, [])

  return (
    <div className="hubspot-form-container">
      <div id={formId.current} ref={formContainerRef} className="min-h-[300px]">
        {isLoading && (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 w-1/3 bg-orange rounded"></div>
          </div>
        )}
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
