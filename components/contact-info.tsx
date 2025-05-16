"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ContactInfo() {
  return (
    <div className="w-full bg-gradient-to-r from-purple to-purple-dark">
      <div className="container mx-auto px-4">
        {/* Logo header con fondo púrpura - logo agrandado */}
        <div className="py-3 flex items-center">
          <motion.div
            className="relative h-16 w-48"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/5asec-logo-official.jpeg"
              alt="5ásec Logo"
              fill
              className="object-contain object-left"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
