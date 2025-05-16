"use client"

import { useState, useEffect } from "react"

export function HubspotIframeForm() {
  const [iframeHeight, setIframeHeight] = useState(500)
  const [isLoading, setIsLoading] = useState(true)

  // Ajustar la altura del iframe cuando se carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="hubspot-iframe-container">
      {isLoading && (
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 w-1/3 bg-orange rounded"></div>
        </div>
      )}

      <iframe
        src="https://share.hsforms.com/1-_U3qaYnQYKwQMHsocbgcAc3lmx"
        width="100%"
        height={iframeHeight}
        style={{
          border: "none",
          width: "100%",
          display: isLoading ? "none" : "block",
        }}
        title="Formulario de contacto 5ásec"
        onLoad={() => {
          setIsLoading(false)
          // Ajustar la altura después de cargar
          setIframeHeight(550)
        }}
      ></iframe>
    </div>
  )
}
