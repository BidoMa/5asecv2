import Image from "next/image"

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-purple to-purple-dark text-white py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-light/10 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative h-16 w-48 glass-card-dark p-2 rounded-lg">
            <Image src="/images/5asec-logo-official.jpeg" alt="5ásec Logo" fill className="object-contain" />
          </div>
        </div>

        <div className="border-t border-purple-light/30 mt-8 pt-8 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} 5ásec. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
