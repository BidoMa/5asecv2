"use client"

import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GeometricElements } from "./geometric-elements"

export function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("benefits-section")
      if (element) {
        const position = element.getBoundingClientRect()
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const benefits = [
    "Negocio altamente rentable: margen operativo entre 25 % y 45 % sobre ventas y recupero de inversión en 24‑30 meses.",
    "Marca líder con casi 100 locales en Argentina y más de 1.700 en 34 países.",
    "Innovación constante en tratamientos y tecnología textil.",
    "Abastecimiento centralizado de insumos y equipamiento para simplificar tu gestión.",
    "Operación simple con sistema de gestión propio y precios transparentes para el cliente.",
    "Equipo de especialistas que te acompaña antes, durante y después de la apertura.",
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <section id="benefits-section" className="w-full bg-white py-20 relative overflow-hidden">
      <GeometricElements variant="light" density="low" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block mx-auto mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-purple to-orange rounded-full mb-2" />
            <div className="h-1 w-12 bg-gradient-to-r from-purple to-orange rounded-full ml-auto" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">BENEFICIOS</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Sumate a la cadena Nº 1 de tintorerías y lavanderías del mundo y llevá un negocio probado y rentable a tu
            comunidad.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl transform group-hover:scale-[1.03] transition-transform duration-300" />
              <div className="glass-card relative p-6 border-l-4 border-orange hover:border-purple transition-colors duration-300 group-hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 bg-gradient-to-r from-orange to-orange-light rounded-full p-1 shadow-md group-hover:shadow-orange/20 transition-all duration-300">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-700 group-hover:translate-x-1 transition-transform duration-300">{benefit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
