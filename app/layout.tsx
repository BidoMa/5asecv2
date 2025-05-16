import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { FormModalProvider } from "@/components/form-modal-provider"
import Script from "next/script"

// Usar Inter como fuente variable con display swap para mejor rendimiento
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const metadata = {
  title: "Franquicias 5ásec - Líder mundial en cuidado textil",
  description:
    "Convertite en franquiciado de la cadena líder mundial en cuidado textil. Negocio rentable con soporte continuo y marca reconocida en 34 países.",
  keywords:
    "franquicia 5asec, franquicias rentables, negocio de tintorería, franquicia de lavandería, invertir en franquicia, 5asec Argentina",
  openGraph: {
    title: "Franquicias 5ásec - Líder mundial en cuidado textil",
    description:
      "Convertite en franquiciado de la cadena líder mundial en cuidado textil. Negocio rentable con soporte continuo y marca reconocida en 34 países.",
    type: "website",
    locale: "es_AR",
    url: "https://franquicias.5asec.com.ar",
    siteName: "Franquicias 5ásec Argentina",
    images: [
      {
        url: "/images/5asec-store-showcase.webp",
        width: 1200,
        height: 630,
        alt: "Franquicias 5ásec Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Franquicias 5ásec - Líder mundial en cuidado textil",
    description:
      "Convertite en franquiciado de la cadena líder mundial en cuidado textil. Negocio rentable con soporte continuo.",
    images: ["/images/5asec-store-showcase.webp"],
  },
  alternates: {
    canonical: "https://franquicias.5asec.com.ar",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KS2C6MN4');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Preconexiones para recursos críticos */}
        <link rel="preconnect" href="https://js.hsforms.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://js.hsforms.net" />

        {/* Precargar fuentes críticas */}
        <link rel="preload" href={inter.url} as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Precargar imágenes críticas */}
        <link rel="preload" href="/images/5asec-store-showcase.webp" as="image" type="image/webp" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KS2C6MN4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <FormModalProvider>{children}</FormModalProvider>

        {/* Cargar el script de HubSpot con estrategia diferida */}
        <Script src="//js.hsforms.net/forms/embed/v2.js" strategy="lazyOnload" id="hubspot-script" />

        {/* Agregar Schema.org para franquicias */}
        <Script id="schema-script" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "5àsec Argentina",
              "url": "https://franquicias.5asec.com.ar",
              "logo": "https://franquicias.5asec.com.ar/images/logo-5asec-official.jpeg",
              "description": "Franquicias de tintorerías y lavanderías 5àsec en Argentina. Líder mundial en cuidado textil.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Argentina"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+54-11-0000-0000",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/5asecArgentina",
                "https://www.instagram.com/5asecArgentina"
              ]
            }
          `}
        </Script>
      </body>
    </html>
  )
}
