"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight } from "lucide-react"

// Datos de ejemplo para los testimonios
const testimonialData = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    location: "Buenos Aires",
    years: "8 años como franquiciado",
    image: "/images/franchisee-testimonial.jpeg",
    videoThumbnail: "/modern-laundry-businessman.png",
    arModel: "/modern-dry-cleaning-storefront.png",
    quote:
      "Unirme a la red de franquicias 5ásec ha sido una de las mejores decisiones de mi vida profesional. El respaldo de una marca internacional y el modelo de negocio probado me permitieron establecer un negocio rentable desde el primer año.",
  },
  {
    id: 2,
    name: "Laura Méndez",
    location: "Córdoba",
    years: "5 años como franquiciada",
    image: "/confident-professional.png",
    videoThumbnail: "/modern-laundry-greeting.png",
    arModel: "/laundry-machinery-3d.png",
    quote:
      "La capacitación y el soporte técnico que recibimos de 5ásec es excepcional. Pude abrir mi segunda tienda en solo 3 años gracias al éxito de la primera ubicación.",
  },
  {
    id: 3,
    name: "Miguel Sánchez",
    location: "Rosario",
    years: "3 años como franquiciado",
    image: "/placeholder.svg?height=400&width=600&query=hombre joven emprendedor",
    videoThumbnail: "/placeholder.svg?height=400&width=600&query=hombre joven en mostrador de tintorería",
    arModel: "/placeholder.svg?height=400&width=400&query=modelo 3D de interior de tienda 5asec",
    quote:
      "Lo que más valoro es el sistema de gestión y la marca reconocida. Los clientes confían en 5ásec desde el primer día, lo que me permitió tener un flujo constante de ingresos desde la apertura.",
  },
]

export function ARTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showAR, setShowAR] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const activeTestimonial = testimonialData[activeIndex]

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("ar-testimonials")
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

  // Reiniciar video cuando cambia el testimonio activo
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [activeIndex])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialData.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialData.length) % testimonialData.length)
  }

  const toggleAR = () => {
    setShowAR(!showAR)
  }

  return (
    <section id="ar-testimonials" className="w-full py-16 bg-gradient-to-br from-purple/5 to-orange/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-purple mb-4">Experiencias Reales en 3D</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conocé las historias de nuestros franquiciados y explorá sus tiendas en realidad aumentada
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden shadow-xl"
            >
              {/* Video/Imagen principal */}
              <div className="relative aspect-video bg-gray-900">
                {/* Thumbnail como fallback */}
                <Image
                  src={activeTestimonial.videoThumbnail || "/placeholder.svg"}
                  alt={`Testimonio de ${activeTestimonial.name}`}
                  fill
                  className={`object-cover transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                />

                {/* Video (simulado para este ejemplo) */}
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                  poster={activeTestimonial.videoThumbnail}
                  muted={isMuted}
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="#" type="video/mp4" />
                  Tu navegador no soporta videos HTML5.
                </video>

                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Controles de video */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <button
                    onClick={handlePlayPause}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                  >
                    {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMuteToggle}
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5 text-white" />
                      ) : (
                        <Volume2 className="h-5 w-5 text-white" />
                      )}
                    </button>

                    <button
                      onClick={toggleAR}
                      className="bg-orange/80 backdrop-blur-sm p-2 rounded-full hover:bg-orange transition-colors duration-200"
                    >
                      <Maximize className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Navegación entre testimonios */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Información del franquiciado */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={activeTestimonial.image || "/placeholder.svg"}
                      alt={activeTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{activeTestimonial.name}</h3>
                    <p className="text-white/80 text-sm">
                      {activeTestimonial.location} • {activeTestimonial.years}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Cita del testimonio */}
              <div className="relative">
                <div className="absolute -top-6 -left-6 text-purple opacity-20">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 11H6C3.79086 11 2 9.20914 2 7V6C2 3.79086 3.79086 2 6 2H7C9.20914 2 11 3.79086 11 6V7C11 9.20914 9.20914 11 7 11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 11H18C15.7909 11 14 9.20914 14 7V6C14 3.79086 15.7909 2 18 2H19C21.2091 2 23 3.79086 23 6V7C23 9.20914 21.2091 11 19 11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 7V13C11 17.4183 7.41828 21 3 21H2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 7V13C23 17.4183 19.4183 21 15 21H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <blockquote className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange">
                  <p className="text-gray-700 italic text-lg leading-relaxed">{activeTestimonial.quote}</p>
                </blockquote>
              </div>

              {/* Modelo AR */}
              <AnimatePresence>
                {showAR && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white p-6 rounded-xl shadow-md overflow-hidden"
                  >
                    <h3 className="text-purple font-bold mb-4">Explora la tienda en 3D</h3>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={activeTestimonial.arModel || "/placeholder.svg"}
                        alt="Modelo 3D de tienda 5àsec"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-purple/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                          Vista previa 3D
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      * En la versión final, aquí se mostraría un modelo 3D interactivo de la tienda que podrías
                      explorar o ver en realidad aumentada.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navegación entre testimonios (versión móvil) */}
              <div className="flex items-center justify-center gap-2 lg:hidden mt-4">
                {testimonialData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === activeIndex ? "bg-orange" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={toggleAR}
                  className="w-full bg-purple hover:bg-purple-light text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {showAR ? "Ocultar modelo 3D" : "Ver tienda en 3D"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
