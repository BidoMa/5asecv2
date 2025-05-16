"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Users, Search, FileText, GraduationCap } from "lucide-react"
import { GeometricElements } from "./geometric-elements"

export function FranchiseProcess() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("franchise-process")
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

  const steps = [
    {
      number: 1,
      title: "Contacto inicial",
      description:
        "Completá el formulario de contacto y nuestro equipo se comunicará contigo para brindarte información detallada.",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
    },
    {
      number: 2,
      title: "Entrevista inicial",
      description:
        "Nos reuniremos para conocerte mejor, evaluar tu perfil como franquiciado y responder todas tus dudas.",
      icon: <Users className="h-6 w-6 text-white" />,
    },
    {
      number: 3,
      title: "Seña y búsqueda de local",
      description:
        "Una vez aprobada tu solicitud, realizarás la seña y comenzaremos la búsqueda del local ideal para tu franquicia.",
      icon: <Search className="h-6 w-6 text-white" />,
    },
    {
      number: 4,
      title: "Contrato de franquicia",
      description:
        "Formalizamos nuestra relación mediante la firma del contrato de franquicia que establece los términos y condiciones.",
      icon: <FileText className="h-6 w-6 text-white" />,
    },
    {
      number: 5,
      title: "Capacitación de apertura",
      description:
        "Recibirás capacitación completa sobre la operación del negocio y te acompañaremos durante todo el proceso de apertura.",
      icon: <GraduationCap className="h-6 w-6 text-white" />,
    },
  ]

  return (
    <section id="franchise-process" className="w-full bg-gray-50 py-20 relative overflow-hidden">
      <GeometricElements variant="light" density="low" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block bg-purple text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
            Cómo funciona
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Proceso para obtener tu franquicia</h2>
          <p className="text-lg text-gray-700">Conocé los pasos para convertirte en parte de la familia 5àsec</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Línea vertical conectora */}
          <div className="absolute left-[28px] md:left-[36px] top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-start"
              >
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-purple flex items-center justify-center shadow-lg z-10">
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>
                </div>

                <div className="glass-card p-6 md:p-8 flex-grow">
                  <h3 className="text-xl font-bold text-purple mb-3">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-700">
            ¿Listo para comenzar?{" "}
            <a href="#hero-form-section" className="text-orange hover:text-orange-dark font-medium">
              Contactanos ahora
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
