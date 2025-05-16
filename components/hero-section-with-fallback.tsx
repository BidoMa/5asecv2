"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { HubspotForm } from "@/components/hubspot-form"
import { HubspotIframeFallback } from "@/components/hubspot-iframe-fallback"
import { CheckCircle } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const benefits = [
    "Marca líder con presencia en 34 países",
    "Soporte técnico y comercial continuo",
    "Modelo de negocio probado y rentable",
  ]

  return (
    <section className="w-full bg-white py-8 lg:py-14 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"} transition-all duration-500`}>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple leading-tight">
                Abrí tu propia tienda <span className="text-orange font-extrabold">5ásec</span>
              </h1>
              <p className="text-lg text-gray-700 max-w-lg">
                Convertite en franquiciado de la cadena líder mundial en cuidado textil y llevá un negocio rentable a tu
                comunidad.
              </p>
            </div>

            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-orange flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Formulario de HubSpot con ID para scroll */}
            <div id="hero-form-section" className="bg-white p-6 rounded-xl shadow-lg border border-purple-light/10">
              <h3 className="text-xl font-semibold text-purple mb-4">Solicitá información ahora</h3>
              <HubspotForm />
              <HubspotIframeFallback />
            </div>
          </div>

          <div
            className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"} transition-all duration-500 delay-300`}
          >
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/5asec-mall-store.jpeg"
                alt="Tienda 5ásec en centro comercial"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-diagonal from-purple/40 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-orange text-white p-4 rounded-lg shadow-lg transform rotate-3 animate-pulse-subtle">
              <p className="text-xl font-bold">+1700 tiendas</p>
              <p className="text-sm">en todo el mundo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
