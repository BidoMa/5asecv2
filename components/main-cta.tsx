"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CTAButton } from "./cta-button"
import { GeometricElements } from "./geometric-elements"

export function MainCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("main-cta")
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

  return (
    <section
      id="main-cta"
      className="w-full py-20 bg-gradient-to-r from-purple to-purple-dark relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <GeometricElements variant="dark" density="medium" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-light/20 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Abrí tu propio <span className="text-orange font-extrabold">5ASEC</span>
            </h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Convertite en parte de la cadena líder mundial en cuidado textil y comenzá tu camino hacia el éxito
              empresarial
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4"
            >
              <CTAButton className="py-4 px-10 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-orange hover:bg-orange-light border-none group">
                Quiero mi franquicia
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-white/70 text-sm"
            >
              Completá el formulario y un asesor se contactará a la brevedad
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
