"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, TrendingUp, Users } from "lucide-react"

export function ProfitSimulator() {
  const [investment, setInvestment] = useState(80000)
  const [location, setLocation] = useState("shopping")

  // Cálculos basados en la inversión y ubicación
  const calculateMetrics = () => {
    // Factores de multiplicación según ubicación
    const factors = {
      shopping: { revenue: 1.2, customers: 1.3, roi: 1.1 },
      street: { revenue: 1.0, customers: 1.0, roi: 1.0 },
      residential: { revenue: 0.9, customers: 0.8, roi: 0.95 },
    }

    const factor = factors[location as keyof typeof factors]

    // Cálculos estimados (simplificados para el ejemplo)
    const monthlyRevenue = (investment * 0.04 * factor.revenue).toFixed(0)
    const annualRevenue = (investment * 0.45 * factor.revenue).toFixed(0)
    const estimatedCustomers = Math.floor((investment / 100) * factor.customers)
    const roiMonths = Math.ceil(24 / factor.roi)

    return { monthlyRevenue, annualRevenue, estimatedCustomers, roiMonths }
  }

  const metrics = calculateMetrics()

  return (
    <section className="w-full py-16 bg-gradient-to-br from-purple/5 to-orange/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-purple mb-4">Simulador de Rentabilidad</h2>
            <p className="text-lg text-gray-700">Descubrí el potencial de tu inversión en una franquicia 5àsec</p>
          </div>

          <Card className="border-purple/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-purple/10 to-orange/10 rounded-t-lg">
              <CardTitle className="text-2xl text-purple">Calculá tu inversión</CardTitle>
              <CardDescription>Ajustá los parámetros para ver proyecciones personalizadas</CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Inversión inicial (USD)</label>
                    <span className="text-xl font-bold text-purple">${investment.toLocaleString()}</span>
                  </div>

                  <Slider
                    value={[investment]}
                    min={50000}
                    max={150000}
                    step={5000}
                    onValueChange={(value) => setInvestment(value[0])}
                    className="py-4"
                  />

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$50,000</span>
                    <span>$150,000</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Ubicación de la tienda</label>
                  <Tabs defaultValue="shopping" value={location} onValueChange={setLocation} className="w-full">
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger
                        value="shopping"
                        className="data-[state=active]:bg-purple data-[state=active]:text-white"
                      >
                        Shopping
                      </TabsTrigger>
                      <TabsTrigger
                        value="street"
                        className="data-[state=active]:bg-purple data-[state=active]:text-white"
                      >
                        Calle comercial
                      </TabsTrigger>
                      <TabsTrigger
                        value="residential"
                        className="data-[state=active]:bg-purple data-[state=active]:text-white"
                      >
                        Zona residencial
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-white p-4 rounded-lg border border-purple/10 shadow-sm flex flex-col items-center text-center">
                    <div className="bg-orange/10 p-3 rounded-full mb-3">
                      <TrendingUp className="h-6 w-6 text-orange" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-700">Facturación mensual est.</h3>
                    <p className="text-2xl font-bold text-purple">
                      ${Number.parseInt(metrics.monthlyRevenue).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-purple/10 shadow-sm flex flex-col items-center text-center">
                    <div className="bg-orange/10 p-3 rounded-full mb-3">
                      <Users className="h-6 w-6 text-orange" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-700">Clientes mensuales est.</h3>
                    <p className="text-2xl font-bold text-purple">{metrics.estimatedCustomers}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-purple/10 shadow-sm flex flex-col items-center text-center">
                    <div className="bg-orange/10 p-3 rounded-full mb-3">
                      <Calculator className="h-6 w-6 text-orange" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-700">Retorno de inversión</h3>
                    <p className="text-2xl font-bold text-purple">{metrics.roiMonths} meses</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-gray-50 rounded-b-lg flex flex-col items-start pt-4">
              <p className="text-sm text-gray-500 mb-2">
                * Estas proyecciones son estimativas y pueden variar según múltiples factores.
              </p>
              <p className="text-sm font-medium text-purple">
                Facturación anual estimada:{" "}
                <span className="font-bold">${Number.parseInt(metrics.annualRevenue).toLocaleString()}</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
