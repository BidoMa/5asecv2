"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Info, Plus, X } from "lucide-react"

// Datos de las sucursales existentes
const locationData = [
  {
    id: 1,
    city: "Buenos Aires",
    position: { x: 76, y: 58 },
    stores: 50,
    details: "Centro económico del país con alta densidad poblacional",
    opportunities: ["Zona Norte", "Zona Sur", "Zona Oeste"],
  },
  {
    id: 2,
    city: "Córdoba",
    position: { x: 61, y: 42 },
    stores: 8,
    details: "Segunda ciudad más grande con mercado en expansión",
    opportunities: ["Nueva Córdoba", "Villa Allende"],
  },
  {
    id: 3,
    city: "Mendoza",
    position: { x: 48, y: 49 },
    stores: 5,
    details: "Ciudad turística con clientela premium",
    opportunities: ["Ciudad", "Godoy Cruz"],
  },
  {
    id: 4,
    city: "Tucumán",
    position: { x: 60, y: 24 },
    stores: 4,
    details: "Principal centro urbano del norte",
    opportunities: ["Centro", "Yerba Buena"],
  },
  {
    id: 5,
    city: "Salta",
    position: { x: 59, y: 16 },
    stores: 3,
    details: "Ciudad turística con demanda creciente",
    opportunities: ["Centro", "Zona Norte"],
  },
  {
    id: 6,
    city: "Neuquén",
    position: { x: 47, y: 73 },
    stores: 3,
    details: "Centro económico patagónico en crecimiento",
    opportunities: ["Centro", "Plottier"],
  },
  {
    id: 7,
    city: "Rosario",
    position: { x: 67, y: 47 },
    stores: 4,
    details: "Centro económico con alta demanda de servicios premium",
    opportunities: ["Centro", "Fisherton"],
  },
  {
    id: 8,
    city: "Mar del Plata",
    position: { x: 78, y: 72 },
    stores: 2,
    details: "Ciudad turística con alta demanda estacional",
    opportunities: ["Centro", "Zona Costera"],
  },
  {
    id: 9,
    city: "Comodoro Rivadavia",
    position: { x: 55, y: 85 },
    stores: 1,
    details: "Ciudad petrolera con alto poder adquisitivo",
    opportunities: ["Centro"],
  },
  {
    id: 10,
    city: "Río Gallegos",
    position: { x: 53, y: 95 },
    stores: 3,
    details: "Capital provincial con potencial de crecimiento",
    opportunities: ["Centro"],
  },
  {
    id: 11,
    city: "Ushuaia",
    position: { x: 53, y: 99 },
    stores: 1,
    details: "Ciudad turística en el extremo sur",
    opportunities: ["Centro"],
  },
]

// Datos de oportunidades de expansión
const opportunityData = [
  {
    id: 101,
    city: "Bariloche",
    position: { x: 43, y: 78 },
    potential: "alto",
    details: "Destino turístico premium con clientela internacional",
    advantages: ["Turismo internacional", "Alto poder adquisitivo", "Baja competencia"],
  },
  {
    id: 102,
    city: "Santa Fe",
    position: { x: 67, y: 42 },
    potential: "medio",
    details: "Capital provincial con economía estable",
    advantages: ["Centro administrativo", "Población estable", "Universidades"],
  },
  {
    id: 103,
    city: "San Juan",
    position: { x: 45, y: 42 },
    potential: "medio",
    details: "Capital provincial en desarrollo",
    advantages: ["Crecimiento económico", "Baja competencia"],
  },
  {
    id: 104,
    city: "Resistencia",
    position: { x: 72, y: 30 },
    potential: "medio",
    details: "Capital provincial del noreste",
    advantages: ["Centro regional", "Baja competencia"],
  },
  {
    id: 105,
    city: "Bahía Blanca",
    position: { x: 68, y: 78 },
    potential: "alto",
    details: "Centro económico del sur bonaerense",
    advantages: ["Puerto importante", "Centro comercial regional", "Universidad"],
  },
]

export function FranchiseMap() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showOpportunities, setShowOpportunities] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("franchise-map")
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

  const handleLocationClick = (id: number) => {
    setSelectedOpportunity(null)
    setSelectedLocation(selectedLocation === id ? null : id)
  }

  const handleOpportunityClick = (id: number) => {
    setSelectedLocation(null)
    setSelectedOpportunity(selectedOpportunity === id ? null : id)
  }

  const getMarkerSize = (stores: number) => {
    if (stores >= 20) return "w-12 h-12 text-lg"
    if (stores >= 5) return "w-10 h-10 text-base"
    return "w-8 h-8 text-sm"
  }

  return (
    <section id="franchise-map" className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-purple mb-4">Nuestra Presencia y Oportunidades</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Descubrí dónde estamos y dónde podés llevar 5àsec a tu comunidad
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative h-[600px] bg-gray-50 rounded-xl overflow-hidden shadow-md border border-gray-100">
              {/* Mapa como fondo */}
              <div className="absolute inset-0">
                <Image
                  src="/images/argentina-map.png"
                  alt="Mapa de Argentina con sucursales 5àsec"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Controles del mapa */}
              <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md p-2">
                <button
                  onClick={() => setShowOpportunities(!showOpportunities)}
                  className="flex items-center gap-2 text-sm font-medium text-purple hover:text-purple-light transition-colors"
                >
                  {showOpportunities ? (
                    <>
                      <X size={16} /> Ocultar oportunidades
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Mostrar oportunidades
                    </>
                  )}
                </button>
              </div>

              {/* Marcadores de sucursales existentes */}
              {locationData.map((location) => (
                <motion.div
                  key={location.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: location.id * 0.05,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${location.position.x}%`,
                    top: `${location.position.y}%`,
                  }}
                  onClick={() => handleLocationClick(location.id)}
                >
                  <div
                    className={`flex items-center justify-center ${getMarkerSize(location.stores)} rounded-full bg-orange text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 ${selectedLocation === location.id ? "ring-2 ring-white scale-110" : ""}`}
                  >
                    {location.stores}
                  </div>

                  {/* Popup con información */}
                  {selectedLocation === location.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 w-64 bg-white rounded-lg shadow-xl p-4 left-1/2 transform -translate-x-1/2 mt-2"
                      style={{ top: "100%" }}
                    >
                      <h3 className="font-bold text-purple text-lg mb-1">{location.city}</h3>
                      <p className="text-sm text-gray-700 mb-2">{location.details}</p>
                      <div className="mb-2">
                        <span className="text-xs font-medium bg-orange/10 text-orange px-2 py-1 rounded-full">
                          {location.stores} tiendas activas
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-700">Zonas con potencial:</p>
                        <div className="flex flex-wrap gap-1">
                          {location.opportunities.map((zone, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                              {zone}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Marcadores de oportunidades */}
              {showOpportunities &&
                opportunityData.map((opportunity) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (opportunity.id - 100) * 0.05 + 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${opportunity.position.x}%`,
                      top: `${opportunity.position.y}%`,
                    }}
                    onClick={() => handleOpportunityClick(opportunity.id)}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full bg-purple text-white shadow-md hover:shadow-lg transition-all duration-300 ${selectedOpportunity === opportunity.id ? "ring-2 ring-white scale-110" : ""}`}
                    >
                      <Plus size={16} />
                    </div>

                    {/* Popup con información */}
                    {selectedOpportunity === opportunity.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-10 w-64 bg-white rounded-lg shadow-xl p-4 left-1/2 transform -translate-x-1/2 mt-2"
                        style={{ top: "100%" }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-purple text-lg">{opportunity.city}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              opportunity.potential === "alto"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {opportunity.potential === "alto" ? "Alto potencial" : "Potencial medio"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{opportunity.details}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-700">Ventajas:</p>
                          <ul className="space-y-1">
                            {opportunity.advantages.map((advantage, idx) => (
                              <li key={idx} className="text-xs flex items-start gap-1">
                                <span className="text-orange mt-0.5">•</span>
                                <span>{advantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

              {/* Leyenda del mapa */}
              <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-sm">
                <div className="text-xs font-medium mb-2">Referencias:</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange flex items-center justify-center text-white text-xs font-bold">
                      5
                    </div>
                    <span className="text-xs">Tiendas existentes (el número indica la cantidad)</span>
                  </div>
                  {showOpportunities && (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple flex items-center justify-center text-white">
                        <Plus size={12} />
                      </div>
                      <span className="text-xs">Oportunidades de expansión</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple/5 to-orange/5 p-6 rounded-xl shadow-lg border border-purple/10">
              <h3 className="text-xl font-bold text-purple mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-orange" />
                Expansión estratégica
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Presencia actual</h4>
                  <p className="text-sm text-gray-700">
                    5àsec cuenta con más de 90 tiendas en Argentina, con fuerte presencia en Buenos Aires, Córdoba y
                    otras ciudades principales.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Oportunidades de crecimiento</h4>
                  <p className="text-sm text-gray-700">
                    Buscamos expandirnos en ciudades con alto potencial como Bariloche, Bahía Blanca y capitales
                    provinciales donde aún no tenemos presencia significativa.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Criterios de ubicación</h4>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                      <span>Zonas comerciales o residenciales de nivel socioeconómico medio-alto</span>
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                      <span>Centros comerciales o calles con alto tránsito peatonal</span>
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                      <span>Ciudades con población superior a 100.000 habitantes</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <button className="w-full bg-purple hover:bg-purple-light text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    Consultar disponibilidad en mi zona
                    <MapPin className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              * El mapa muestra la distribución actual de tiendas 5àsec y zonas con potencial de expansión. Nuestro
              equipo de desarrollo territorial te brindará información detallada sobre las oportunidades en tu área de
              interés.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
