"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Info } from "lucide-react"

// Datos de ejemplo para las ubicaciones
const locationData = [
  {
    id: 1,
    city: "Buenos Aires",
    position: { x: 48, y: 75 },
    status: "available",
    potential: "alto",
    stores: 12,
    opportunity: "Zona norte con alto potencial de crecimiento",
  },
  {
    id: 2,
    city: "Córdoba",
    position: { x: 42, y: 55 },
    status: "available",
    potential: "medio",
    stores: 4,
    opportunity: "Zonas comerciales en desarrollo",
  },
  {
    id: 3,
    city: "Mendoza",
    position: { x: 30, y: 60 },
    status: "limited",
    potential: "alto",
    stores: 3,
    opportunity: "Oportunidad en centros comerciales",
  },
  {
    id: 4,
    city: "Rosario",
    position: { x: 45, y: 65 },
    status: "available",
    potential: "alto",
    stores: 5,
    opportunity: "Zonas residenciales de alto poder adquisitivo",
  },
  {
    id: 5,
    city: "Mar del Plata",
    position: { x: 52, y: 80 },
    status: "limited",
    potential: "medio",
    stores: 2,
    opportunity: "Oportunidad estacional y permanente",
  },
  {
    id: 6,
    city: "Tucumán",
    position: { x: 38, y: 40 },
    status: "new",
    potential: "alto",
    stores: 1,
    opportunity: "Mercado en expansión con poca competencia",
  },
  {
    id: 7,
    city: "Bariloche",
    position: { x: 25, y: 85 },
    status: "new",
    potential: "medio",
    stores: 0,
    opportunity: "Mercado turístico premium sin explotar",
  },
]

export function TerritoryMap() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("territory-map")
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

  // Determinar el color del pin según el estado
  const getPinColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-500 bg-green-100"
      case "limited":
        return "text-orange bg-orange-100"
      case "new":
        return "text-purple bg-purple-light/20"
      default:
        return "text-gray-500 bg-gray-100"
    }
  }

  // Obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible"
      case "limited":
        return "Plazas limitadas"
      case "new":
        return "Nueva oportunidad"
      default:
        return "No disponible"
    }
  }

  return (
    <section id="territory-map" className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-purple mb-4">Mapa de Oportunidades</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Explorá las zonas disponibles para abrir tu franquicia 5àsec en Argentina
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative h-[500px] bg-gray-100 rounded-xl overflow-hidden shadow-md">
              {/* Mapa de Argentina como fondo */}
              <div className="absolute inset-0 bg-white">
                <Image
                  src="/argentina-provinces-map.png"
                  alt="Mapa de Argentina"
                  fill
                  className="object-contain opacity-20"
                />
              </div>

              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-orange/5"></div>

              {/* Pins de ubicación */}
              {locationData.map((location) => (
                <motion.div
                  key={location.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: location.id * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                  style={{
                    left: `${location.position.x}%`,
                    top: `${location.position.y}%`,
                  }}
                  onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${getPinColor(location.status)} p-2 shadow-md hover:shadow-lg transition-all duration-300 ${selectedLocation === location.id ? "ring-2 ring-purple scale-110" : ""}`}
                  >
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded-full shadow-sm">
                    {location.city}
                  </div>

                  {/* Popup con información */}
                  {selectedLocation === location.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 w-64 bg-white rounded-lg shadow-xl p-4 left-1/2 transform -translate-x-1/2 mt-2"
                      style={{ top: "100%" }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-purple">{location.city}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPinColor(location.status)}`}>
                          {getStatusText(location.status)}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Tiendas actuales:</span> {location.stores}
                        </p>
                        <p>
                          <span className="font-medium">Potencial:</span> {location.potential}
                        </p>
                        <p className="text-gray-700">{location.opportunity}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Leyenda del mapa */}
              <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-sm">
                <div className="text-xs font-medium mb-2">Leyenda:</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange"></div>
                    <span className="text-xs">Plazas limitadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple"></div>
                    <span className="text-xs">Nueva oportunidad</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-purple mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-orange" />
                Información territorial
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Zonas prioritarias</h4>
                  <p className="text-sm text-gray-700">
                    Estamos buscando activamente franquiciados en las zonas marcadas como "Nueva oportunidad", con
                    incentivos especiales para primeros operadores.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Exclusividad territorial</h4>
                  <p className="text-sm text-gray-700">
                    Cada franquiciado recibe exclusividad en un radio determinado según la densidad poblacional de la
                    zona.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Análisis de mercado</h4>
                  <p className="text-sm text-gray-700">
                    Nuestro equipo realiza un estudio detallado de cada ubicación para garantizar la viabilidad del
                    negocio.
                  </p>
                </div>

                <div className="pt-4">
                  <button className="w-full bg-purple hover:bg-purple-light text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Consultar disponibilidad
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
