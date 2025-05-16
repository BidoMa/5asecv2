"use client"

import { Award, BookOpen, Headphones, BarChart, MapPin, Building } from "lucide-react"
import Image from "next/image"
import { CTAButton } from "./cta-button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GeometricElements } from "./geometric-elements"

export function FranchiseeBenefits() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("franchisee-benefits")
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
    {
      icon: <BookOpen className="h-12 w-12 text-orange" />,
      title: "Transferencia de Know How",
      description: "Te enseñamos todo lo necesario para tu éxito",
    },
    {
      icon: <Award className="h-12 w-12 text-orange" />,
      title: "Capacitación permanente",
      description: "Para vos y tu equipo en técnicas y atención al cliente",
    },
    {
      icon: <Headphones className="h-12 w-12 text-orange" />,
      title: "Soporte continuo",
      description: "Técnico y comercial, con control de gestión periódico",
    },
    {
      icon: <BarChart className="h-12 w-12 text-orange" />,
      title: "Acciones de marketing",
      description: "Publicidad nacional y local para tu negocio",
    },
    {
      icon: <MapPin className="h-12 w-12 text-orange" />,
      title: "Exclusividad de zona",
      description: "Para potenciar tu inversión",
    },
    {
      icon: <Building className="h-12 w-12 text-orange" />,
      title: "Ubicaciones estratégicas",
      description: "Acceso a convenios con grandes cadenas",
    },
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section
      id="franchisee-benefits"
      className="w-full bg-gradient-to-br from-purple-50 to-orange-50 py-20 relative overflow-hidden"
    >
      <GeometricElements variant="light" density="medium" />

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

          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Beneficios para nuestros franquiciados</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={item}
              className="glass-card flex flex-col items-center text-center p-8 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 relative">
                <div className="absolute inset-0 bg-orange/20 rounded-full blur-lg transform group-hover:scale-125 transition-transform duration-300" />
                <div className="relative z-10">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gradient mb-3">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 relative overflow-hidden rounded-xl"
        >
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <Image
              src="/images/5asec-mall-display.jpeg"
              alt="Exhibición de servicios 5ásec"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-conic from-purple/90 via-purple/70 to-orange/60 flex items-center">
              <div className="p-10 max-w-lg backdrop-blur-sm bg-white/5 rounded-r-2xl border-l-4 border-orange">
                <h3 className="text-2xl font-bold text-white mb-4">Consultá a un asesor</h3>
                <p className="text-white/90 mb-6">Para llevar nuestra tienda a tu comunidad</p>
                <CTAButton className="py-3 px-8 rounded-lg shadow-lg bg-gradient-to-r from-orange to-orange-dark hover:from-orange-dark hover:to-orange border-none">
                  Contactar ahora
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-40 h-40 bg-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}
