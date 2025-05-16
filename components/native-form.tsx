"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, User, MapPin, Building2 } from "lucide-react"

export function NativeForm() {
  const [formState, setFormState] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    provincia: "",
    mensaje: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Aquí normalmente enviarías los datos a tu backend
      // Por ahora, simularemos un envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Opcional: enviar datos a un webhook o servicio de email
      // const response = await fetch('/api/submit-form', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formState)
      // })

      setSubmitted(true)

      // También podemos intentar enviar los datos a HubSpot directamente
      if (typeof window !== "undefined" && window.hbspt) {
        try {
          // Intentar enviar los datos al formulario de HubSpot
          const hubspotForm = document.querySelector(".hs-form")
          if (hubspotForm) {
            // Si existe un formulario de HubSpot, podríamos intentar llenarlo
            console.log("HubSpot form found, but direct submission not implemented")
          }
        } catch (hsError) {
          console.error("Error submitting to HubSpot:", hsError)
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 p-6 rounded-lg text-center">
        <div className="text-green-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-purple mb-2">¡Gracias por tu interés!</h3>
        <p className="text-gray-700">Hemos recibido tu solicitud y nos pondremos en contacto contigo a la brevedad.</p>
        <Button className="mt-4 bg-orange hover:bg-orange-light" onClick={() => setSubmitted(false)}>
          Enviar otra consulta
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <User size={18} />
          </div>
          <input
            type="text"
            name="nombre"
            value={formState.nombre}
            onChange={handleChange}
            placeholder="Nombre y Apellido"
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Mail size={18} />
          </div>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Phone size={18} />
          </div>
          <input
            type="tel"
            name="telefono"
            value={formState.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            name="ciudad"
            value={formState.ciudad}
            onChange={handleChange}
            placeholder="Ciudad"
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
          />
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          <Building2 size={18} />
        </div>
        <input
          type="text"
          name="provincia"
          value={formState.provincia}
          onChange={handleChange}
          placeholder="Provincia"
          required
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
        />
      </div>

      <textarea
        name="mensaje"
        value={formState.mensaje}
        onChange={handleChange}
        placeholder="¿Tienes alguna consulta específica?"
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange hover:bg-orange-light text-white font-bold py-3 rounded-md transition-colors duration-300"
      >
        {isSubmitting ? "Enviando..." : "Solicitar información"}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Al enviar este formulario, aceptas recibir información sobre franquicias 5ásec.
      </p>
    </form>
  )
}
