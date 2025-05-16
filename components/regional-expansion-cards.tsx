"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, TrendingUp, Users, Clock, Check } from "lucide-react"

// Datos de regiones
const regionData = [
  {
    id: "bsas",
    name: "Buenos Aires y AMBA",
    stats: {
      stores: 45,
      population: "17 millones",
      competition: "Media",
      potential: "Alto",
    },
    cities: [
      {
        name: "Zona Norte GBA",
        status: "available",
        details: "Zonas premium con alto poder adquisitivo",
        locations: ["San Isidro", "Vicente López", "Tigre"],
      },
      {
        name: "Zona Oeste GBA",
        status: "limited",
        details: "Mercado en desarrollo con baja competencia",
        locations: ["Morón", "Castelar", "Ituzaingó"],
      },
      {
        name: "CABA",
        status: "available",
        details: "Múltiples ubicaciones disponibles en barrios exclusivos",
        locations: ["Palermo", "Belgrano", "Recoleta", "Caballito"],
      },
      {
        name: "Zona Sur GBA",
        status: "available",
        details: "Áreas con potencial de crecimiento",
        locations: ["Quilmes", "Lomas de Zamora", "Adrogué"],
      },
    ],
  },
  {
    id: "centro",
    name: "Región Centro",
    stats: {
      stores: 18,
      population: "8 millones",
      competition: "Baja",
      potential: "Alto",
    },
    cities: [
      {
        name: "Córdoba",
        status: "available",
        details: "Segunda ciudad más grande con mercado en expansión",
        locations: ["Nueva Córdoba", "Cerro de las Rosas", "Villa Allende"],
      },
      {
        name: "Rosario",
        status: "available",
        details: "Centro económico con alta demanda de servicios premium",
        locations: ["Centro", "Fisherton", "Puerto Norte"],
      },
      {
        name: "Santa Fe",
        status: "new",
        details: "Mercado emergente con poca competencia",
        locations: ["Centro", "Guadalupe", "Candioti"],
      },
    ],
  },
  {
    id: "cuyo",
    name: "Cuyo",
    stats: {
      stores: 7,
      population: "3 millones",
      competition: "Muy baja",
      potential: "Medio-Alto",
    },
    cities: [
      {
        name: "Mendoza",
        status: "available",
        details: "Ciudad turística con clientela premium",
        locations: ["Ciudad", "Godoy Cruz", "Chacras de Coria"],
      },
      {
        name: "San Juan",
        status: "new",
        details: "Mercado en desarrollo con oportunidades de pionero",
        locations: ["Centro", "Santa Lucía", "Rivadavia"],
      },
    ],
  },
  {
    id: "patagonia",
    name: "Patagonia",
    stats: {
      stores: 5,
      population: "2.5 millones",
      competition: "Muy baja",
      potential: "Alto",
    },
    cities: [
      {
        name: "Neuquén",
        status: "new",
        details: "Centro económico patagónico en crecimiento",
        locations: ["Centro", "Rincón de Emilio", "Santa Genoveva"],
      },
      {
        name: "Bariloche",
        status: "new",
        details: "Destino turístico premium con clientela internacional",
        locations: ["Centro", "Melipal", "Llao Llao"],
      },
      {
        name: "Comodoro Rivadavia",
        status: "new",
        details: "Ciudad petrolera con alto poder adquisitivo",
        locations: ["Centro", "Rada Tilly"],
      },
    ],
  },
  {
    id: "norte",
    name: "Norte Argentino",
    stats: {
      stores: 6,
      population: "5 millones",
      competition: "Baja",
      potential: "Medio",
    },
    cities: [
      {
        name: "Tucumán",
        status: "available",
        details: "Principal centro urbano del norte",
        locations: ["Centro", "Yerba Buena", "San Miguel"],
      },
      {
        name: "Salta",
        status: "new",
        details: "Ciudad turística con demanda creciente",
        locations: ["Centro", "Tres Cerritos"],
      },
      {
        name: "Jujuy",
        status: "new",
        details: "Mercado emergente con potencial turístico",
        locations: ["San Salvador", "Palpalá"],
      },
    ],
  },
]

export function RegionalExpansionCards() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("regional-expansion")
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

  const toggleRegion = (id: string) => {
    setExpandedRegion(expandedRegion === id ? null : id)
  }

  // Obtener el color según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700"
      case "limited":
        return "bg-orange/10 text-orange"
      case "new":
        return "bg-purple/10 text-purple"
      default:
        return "bg-gray-100 text-gray-700"
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
    <section id="regional-expansion" className="w-full py-16 bg-gradient-to-br from-purple/5 to-orange/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple mb-4">Expansión Regional</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Descubrí las oportunidades para abrir tu franquicia 5àsec en las distintas regiones de Argentina
            </p>
          </div>

          <div className="space-y-6">
            {regionData.map((region) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: regionData.findIndex((r) => r.id === region.id) * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <div
                  className={`p-6 cursor-pointer transition-colors duration-300 ${
                    expandedRegion === region.id ? "bg-purple/5" : "hover:bg-gray-50"
                  }`}
                  onClick={() => toggleRegion(region.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          expandedRegion === region.id ? "bg-purple text-white" : "bg-purple/10 text-purple"
                        }`}
                      >
                        <MapPin className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{region.name}</h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                        expandedRegion === region.id ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-orange/10 p-1.5 rounded-full">
                        <MapPin className="h-4 w-4 text-orange" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tiendas actuales</p>
                        <p className="font-bold text-gray-800">{region.stats.stores}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-orange/10 p-1.5 rounded-full">
                        <Users className="h-4 w-4 text-orange" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Población</p>
                        <p className="font-bold text-gray-800">{region.stats.population}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-orange/10 p-1.5 rounded-full">
                        <TrendingUp className="h-4 w-4 text-orange" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Potencial</p>
                        <p className="font-bold text-gray-800">{region.stats.potential}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-orange/10 p-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-orange" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Competencia</p>
                        <p className="font-bold text-gray-800">{region.stats.competition}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedRegion === region.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-gray-100 mt-4">
                        <h4 className="font-medium text-gray-700 mb-4">Oportunidades disponibles:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {region.cities.map((city, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-bold text-gray-800">{city.name}</h5>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(city.status)}`}>
                                  {getStatusText(city.status)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-3">{city.details}</p>
                              <div>
                                <p className="text-xs font-medium text-gray-700 mb-1">Ubicaciones destacadas:</p>
                                <div className="flex flex-wrap gap-1">
                                  {city.locations.map((location, i) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-white px-2 py-1 rounded-full text-gray-700 border border-gray-200"
                                    >
                                      {location}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="px-6 pb-6 flex justify-end">
                        <button className="flex items-center gap-2 bg-purple hover:bg-purple-light text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                          <Check className="h-4 w-4" />
                          Consultar esta región
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              * La disponibilidad de ubicaciones puede variar. Nuestro equipo de desarrollo territorial te brindará
              información actualizada y personalizada para tu zona de interés.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
