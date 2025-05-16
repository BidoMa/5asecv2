"use client"
import { Quote } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GeometricElements } from "./geometric-elements"

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("testimonials-section")
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

  const testimonials = [
    {
      id: 1,
      name: "Carlos. R",
      location: "Buenos Aires, Argentina",
      years: "1 año como franquiciado",
      quote:
        "Unirme a la red de franquicias 5ásec ha sido una de las mejores decisiones de mi vida profesional. El respaldo de una marca internacional, la capacitación constante y el modelo de negocio probado me permitieron establecer un negocio rentable desde el primer año. La asistencia técnica y comercial que recibimos es excepcional, y el equipo central siempre está disponible para ayudarnos a crecer.",
    },
  ]

  return (
    <section id="testimonials-section" className="w-full bg-white py-20 relative overflow-hidden">
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

          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Testimonios de franquiciados exitosos</h2>
          <p className="text-lg text-gray-700">
            Conocé las experiencias de quienes ya forman parte de la familia 5ásec y han logrado construir negocios
            prósperos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="glass-card overflow-hidden flex flex-col md:flex-row transform hover:shadow-xl transition-all duration-500"
            >
              {/* Image section removed */}
              <div className="w-full p-8 md:p-10 flex flex-col justify-center relative backdrop-blur-sm bg-white/80">
                <div className="absolute top-6 right-6 text-orange-light opacity-40">
                  <Quote size={60} />
                </div>
                <blockquote className="text-gray-700 italic mb-8 relative z-10">{testimonial.quote}</blockquote>
                <div className="mt-auto">
                  <p className="font-bold text-gradient text-xl">{testimonial.name}</p>
                  <p className="text-gray-700">{testimonial.location}</p>
                  <p className="text-orange font-medium">{testimonial.years}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Estos son solo algunos ejemplos de franquiciados que han encontrado el éxito con 5ásec.
            <span className="text-gradient font-semibold"> ¿Estás listo para ser el próximo?</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
