"use client"

import { useEffect, useState } from "react"

export function HubspotIframeFallback() {
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    // Mostrar el iframe de respaldo después de 5 segundos si no se detecta el formulario de HubSpot
    const timer = setTimeout(() => {
      const hubspotForm = document.querySelector(".hs-form")
      if (!hubspotForm) {
        setShowFallback(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!showFallback) return null

  return (
    <div className="hubspot-iframe-fallback mt-4">
      <iframe
        src="https://share.hsforms.com/1-_U3qaYnQYKwQMHsocbgcAc3lmx"
        width="100%"
        height="550"
        style={{ border: "none" }}
        title="Formulario de contacto 5ásec"
      ></iframe>
    </div>
  )
}
