"use client"

import Image from "next/image"
import { CTAButton } from "./cta-button"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function CallToActionBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("cta-banner")
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
    <section id="cta-banner" className="w-full relative h-[500px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/5asec-store-interior.jpeg" alt="Interior de tienda 5ásec" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple/90 to-purple/70"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex items-center justify-start relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
          >
            Consultá a un asesor
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/90 text-lg mb-8"
          >
            Para llevar nuestra tienda a tu comunidad
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CTAButton className="py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-orange hover:bg-orange-light border-none">
              Contactar ahora
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
