"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GeometricElements } from "./geometric-elements"

export function PhotoGallery() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("gallery-section")
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

  const photos = [
    {
      src: "/images/5asec-store-front.jpeg",
      alt: "Fachada de tienda 5ásec con diseño moderno y logo corporativo",
    },
    {
      src: "/images/5asec-store-interior.jpeg",
      alt: "Interior de tienda 5ásec mostrando el área de atención al cliente",
    },
    {
      src: "/images/5asec-mall-store.jpeg",
      alt: "Tienda 5ásec en centro comercial con alto tráfico de clientes",
    },
    {
      src: "/images/5asec-mall-display.jpeg",
      alt: "Exhibición de servicios 5ásec con muestras de tratamientos textiles",
    },
    {
      src: "/images/5asec-street-store.jpeg",
      alt: "Tienda 5ásec en calle comercial con vista exterior y señalización",
    },
    {
      src: "/images/5asec-bag.jpeg",
      alt: "Bolsa protectora de prendas 5ásec con logo corporativo",
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
    hidden: { opacity: 0, y: 20, rotate: 2 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="gallery-section"
      className="w-full bg-gradient-to-br from-purple-50 to-orange-50 py-20 relative overflow-hidden"
      aria-labelledby="gallery-heading"
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

          <h2 id="gallery-heading" className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Te invitamos a conocer más sobre nosotros
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Descubre cómo nuestras tiendas ofrecen soluciones prácticas para el cuidado textil en todo el país
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative h-[250px] rounded-xl overflow-hidden shadow-md group transform transition-all duration-700"
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-conic from-purple/80 via-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <p className="text-white p-6 font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm bg-black/10 w-full">
                  {photo.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
