"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface GeometricElementsProps {
  variant?: "light" | "dark"
  density?: "low" | "medium" | "high"
}

export function GeometricElements({ variant = "light", density = "medium" }: GeometricElementsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Determinar el número de elementos según la densidad
  const getElementCount = () => {
    switch (density) {
      case "low":
        return 3
      case "high":
        return 8
      case "medium":
      default:
        return 5
    }
  }

  const elements = Array.from({ length: getElementCount() }).map((_, index) => {
    // Generar posiciones y tamaños aleatorios pero deterministas
    const size = 20 + ((index * 15) % 60)
    const top = (index * 17) % 80
    const left = (index * 19) % 85
    const delay = index * 0.2
    const duration = 15 + index * 2
    const rotate = index % 2 === 0

    // Determinar el color según la variante
    const getColor = () => {
      if (variant === "dark") {
        return index % 3 === 0 ? "bg-purple-500/10" : index % 3 === 1 ? "bg-orange-500/10" : "bg-white/5"
      }
      return index % 3 === 0 ? "bg-purple-200/30" : index % 3 === 1 ? "bg-orange-200/20" : "bg-purple-100/15"
    }

    // Determinar la forma
    const getShape = () => {
      if (index % 3 === 0) return "rounded-full"
      if (index % 3 === 1) return "rounded-xl"
      return "blob-shape"
    }

    return (
      <motion.div
        key={index}
        className={`absolute ${getColor()} ${getShape()} blur-md`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          zIndex: 0,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isVisible
            ? {
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.1, 0.8],
                rotate: rotate ? [0, 360] : undefined,
              }
            : { opacity: 0, scale: 0.5 }
        }
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          delay: delay,
          ease: "easeInOut",
        }}
      />
    )
  })

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{elements}</div>
}
