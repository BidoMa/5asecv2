"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Users, MapPin } from "lucide-react"

// Datos de regiones
const regionData = [
  {
    id: 1,
    name: "Buenos Aires",
    potential: "alto",
    saturation: "media",
    description: "Zona con alta demanda y oportunidades en barrios exclusivos y centros comerciales.",
    opportunities: ["Recoleta", "Palermo", "San Isidro", "Tigre"],
  },
  {
    id: 2,
    name: "Córdoba",
    potential: "alto",
    saturation: "baja",
    description: "Mercado en crecimiento con baja competencia y alta demanda de servicios premium.",
    opportunities: ["Nueva Córdoba", "Cerro de las Rosas", "Villa Allende"],
  },
  {
    id: 3,
    name: "Litoral",
    potential: "medio",
    saturation: "baja",
    description: "Región con ciudades en desarrollo y pocas opciones de tintorerías de calidad.",
    opportunities: ["Rosario", "Santa Fe", "Paraná"],
  },
  {
    id: 4,
    name: "Cuyo",
    potential: "medio",
    saturation: "baja",
    description: "Zona con potencial turístico y creciente demanda de servicios de calidad.",
    opportunities: ["Mendoza", "San Juan"],
  },
  {
    id: 5,
    name: "Patagonia",
    potential: "alto",
    saturation: "muy baja",
    description: "Mercado premium con clientes de alto poder adquisitivo y casi sin competencia.",
    opportunities: ["Bariloche", "Neuquén", "Puerto Madryn"],
  },
  {
    id: 6,
    name: "Norte",
    potential: "medio",
    saturation: "muy baja",
    description: "Región con grandes ciudades en desarrollo y oportunidades de ser pioneros.",
    opportunities: ["Tucumán", "Salta", "Jujuy"],
  },
]

export function OpportunityHeatmap() {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("opportunity-heatmap")
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

  // Obtener el color según el potencial
  const getPotentialColor = (potential: string, saturation: string) => {
    if (potential === "alto" && saturation === "muy baja") return "bg-green-500"
    if (potential === "alto" && saturation === "baja") return "bg-green-400"
    if (potential === "alto" && saturation === "media") return "bg-yellow-500"
    if (potential === "medio" && saturation === "muy baja") return "bg-blue-400"
    if (potential === "medio" && saturation === "baja") return "bg-blue-500"
    return "bg-gray-400"
  }

  const getTextColor = (potential: string, saturation: string) => {
    if (potential === "alto" && saturation === "muy baja") return "text-green-500"
    if (potential === "alto" && saturation === "baja") return "text-green-400"
    if (potential === "alto" && saturation === "media") return "text-yellow-500"
    if (potential === "medio" && saturation === "muy baja") return "text-blue-400"
    if (potential === "medio" && saturation === "baja") return "text-blue-500"
    return "text-gray-400"
  }

  return (
    <section id="opportunity-heatmap" className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple mb-4">Mapa de Oportunidades</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Descubrí las regiones con mayor potencial para abrir tu franquicia 5àsec
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mapa de calor */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-purple flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-orange" />
                  Regiones con mayor potencial
                </h3>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {regionData.map((region) => (
                  <motion.div
                    key={region.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: region.id * 0.1 }}
                    className={`rounded-lg border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedRegion === region.id ? "ring-2 ring-purple shadow-md" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                  >
                    <div className={`${getPotentialColor(region.potential, region.saturation)} h-2 w-full`}></div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-800">{region.name}</h4>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${getTextColor(
                            region.potential,
                            region.saturation,
                          )} bg-opacity-10 ${getPotentialColor(region.potential, region.saturation)} bg-opacity-10`}
                        >
                          {region.potential === "alto" ? "Alto potencial" : "Potencial medio"}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Saturación: <span className="font-medium">{region.saturation}</span>
                      </p>
                      {selectedRegion === region.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-gray-100"
                        >
                          <p className="text-sm text-gray-700 mb-2">{region.description}</p>
                          <div className="mt-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Ubicaciones destacadas:</p>
                            <div className="flex flex-wrap gap-1">
                              {region.opportunities.map((city, index) => (
                                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                                  {city}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs text-gray-700">Oportunidad óptima</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs text-gray-700">Oportunidad buena</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-gray-700">Oportunidad emergente</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Haz clic en una región para más detalles</span>
                </div>
              </div>
            </div>

            {/* Panel de información */}
            <div className="bg-gradient-to-br from-purple/5 to-orange/5 p-6 rounded-xl shadow-lg border border-purple/10">
              <h3 className="text-xl font-bold text-purple mb-4">¿Por qué elegir 5àsec?</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-orange/10 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Mercado en crecimiento</h4>
                    <p className="text-sm text-gray-700">
                      El sector de cuidado textil profesional crece un 8% anual en Argentina, con mayor demanda en
                      servicios premium.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-orange/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Clientes fidelizados</h4>
                    <p className="text-sm text-gray-700">
                      El 70% de los clientes de 5àsec son recurrentes, garantizando un flujo constante de ingresos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-orange/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Exclusividad territorial</h4>
                    <p className="text-sm text-gray-700">
                      Cada franquiciado recibe exclusividad en su zona, protegiendo tu inversión y maximizando tu
                      potencial de mercado.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full bg-purple hover:bg-purple-light text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    Solicitar información sobre zonas
                    <ArrowRight className="h-4 w-4" />
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
