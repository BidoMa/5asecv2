"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CheckCircle, ChevronDown } from "lucide-react"
import { HubspotDirectForm } from "./hubspot-direct-form"
import { motion } from "framer-motion"
import { GeometricElements } from "./geometric-elements"

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

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("benefits-section")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-white via-purple-50 to-orange-50 pt-10 pb-20 overflow-hidden relative flex items-center"
      aria-label="Información principal sobre franquicias 5àsec"
    >
      <GeometricElements variant="light" density="medium" />

      {/* Círculos decorativos */}
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-orange-500/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Columna izquierda: Contenido principal */}
          <div className="w-full lg:w-3/5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-100 to-orange-100 border border-purple-200/50">
                <span className="text-sm font-medium bg-gradient-to-r from-purple-800 to-orange-600 bg-clip-text text-transparent">
                  Oportunidad de negocio
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Abrí tu propia franquicia{" "}
                <span className="relative">
                  <span className="text-gradient font-extrabold">5ásec</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1.5 bg-orange rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h1>

              <p className="text-xl text-gray-700 max-w-xl">
                Convertite en franquiciado de la cadena líder mundial en cuidado textil y llevá un negocio rentable a tu
                comunidad.
              </p>
            </motion.div>

            {/* Imagen principal con superposición - Volvemos a usar Image directamente */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <Image
                  src="/images/5asec-store-showcase.webp"
                  alt="Tienda 5àsec en centro comercial"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple/50 via-purple/20 to-transparent"></div>

                {/* Overlay con beneficios */}
                <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30 p-6 space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-orange flex-shrink-0" aria-hidden="true" />
                      <span className="text-white text-sm md:text-base">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Badge flotante */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: -5 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange to-orange-dark text-white p-4 rounded-lg shadow-xl transform animate-float"
              >
                <p className="text-xl font-bold">+1700 tiendas</p>
                <p className="text-sm">en todo el mundo</p>
              </motion.div>
            </motion.div>

            {/* Indicador de scroll - Movido debajo de la imagen */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="flex justify-center pt-4 cursor-pointer"
              onClick={scrollToNextSection}
              aria-label="Desplazarse a la siguiente sección"
            >
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 mb-2">Descubre más</span>
                <ChevronDown className="h-6 w-6 text-purple" aria-hidden="true" />
              </div>
            </motion.div>
          </div>

          {/* Columna derecha: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full lg:w-2/5"
          >
            <div className="glass-card p-6 relative overflow-hidden border-t-4 border-orange shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-conic from-orange-500/20 via-purple-500/20 to-orange-500/20 rounded-bl-full" />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gradient mb-2">Solicitá información ahora</h2>
                <p className="text-gray-600 mb-4 text-sm">
                  Completá el formulario y un asesor se contactará a la brevedad
                </p>
              </motion.div>

              {/* Formulario de HubSpot directo */}
              <div id="hero-form-section" className="relative z-10">
                <HubspotDirectForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
