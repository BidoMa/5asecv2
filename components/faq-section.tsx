"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { GeometricElements } from "./geometric-elements"

interface FAQItem {
  question: string
  answer: string
}

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("faq-section")
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

  const faqItems: FAQItem[] = [
    {
      question: "¿Qué experiencia previa necesito para abrir una franquicia?",
      answer:
        "No es necesario tener experiencia previa en el sector de cuidado textil. 5àsec proporciona capacitación completa y soporte continuo para que puedas gestionar tu negocio exitosamente. Lo importante es tener actitud emprendedora, capacidad de gestión y orientación al cliente.",
    },
    {
      question: "¿Cuánto tiempo toma abrir una franquicia desde el primer contacto?",
      answer:
        "El proceso completo desde el primer contacto hasta la apertura de la tienda suele tomar entre 4 y 6 meses. Esto incluye la selección del local, firma del contrato, adecuación del espacio, instalación de equipos, capacitación del personal y preparación para la apertura.",
    },
    {
      question: "¿Qué apoyo recibo como franquiciado?",
      answer:
        "Como franquiciado 5àsec recibirás: capacitación inicial completa, soporte técnico y comercial continuo, manuales operativos detallados, sistema de gestión propio, campañas de marketing nacionales e internacionales, asesoramiento en la selección de ubicación, y acceso a nuestra red global de franquiciados para compartir mejores prácticas.",
    },
    {
      question: "¿Puedo abrir más de una franquicia?",
      answer:
        "¡Absolutamente! Muchos de nuestros franquiciados más exitosos operan múltiples tiendas. Una vez que demuestres una gestión exitosa de tu primera tienda, te ofrecemos condiciones preferenciales para la apertura de unidades adicionales, incluyendo posibles descuentos en el canon de entrada.",
    },
    {
      question: "¿Qué características debe tener el local para una franquicia 5àsec?",
      answer:
        "Buscamos locales en zonas comerciales o residenciales de nivel socioeconómico medio-alto, con buena visibilidad y fácil acceso. El tamaño ideal es entre 60 y 100 m², preferentemente en esquina o con amplia vidriera. Nuestro equipo te asesorará en la búsqueda y evaluación del local para asegurar el éxito de tu franquicia.",
    },
    {
      question: "¿Cómo se seleccionan los franquiciados de 5àsec?",
      answer:
        "Buscamos emprendedores comprometidos con la excelencia en el servicio y la calidad. Valoramos personas con capacidad de gestión, orientación al cliente y disposición para seguir los estándares de la marca. El proceso de selección incluye entrevistas, evaluación de perfil y análisis de la zona donde se planea abrir la franquicia.",
    },
  ]

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section id="faq-section" className="w-full bg-white py-20 relative overflow-hidden">
      <GeometricElements variant="light" density="low" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Todo lo que necesitás saber</h2>
          <p className="text-lg text-gray-700">Respondemos las dudas más comunes sobre nuestro modelo de franquicias</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-orange flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            ¿Tenés más preguntas? No dudes en{" "}
            <a href="#hero-form-section" className="text-orange hover:text-orange-dark font-medium">
              contactarnos directamente
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}
