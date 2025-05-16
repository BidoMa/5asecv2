import { ContactInfo } from "@/components/contact-info"
import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { CallToActionBanner } from "@/components/call-to-action-banner"
import { FranchiseeBenefits } from "@/components/franchisee-benefits"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FranchiseProcess } from "@/components/franchise-process"
import { PhotoGallery } from "@/components/photo-gallery"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { MainCTA } from "@/components/main-cta"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F5F5F5]">
      <ContactInfo />
      <HeroSection />
      <BenefitsSection />
      <CallToActionBanner />
      <FranchiseeBenefits />
      <TestimonialsSection />
      <FranchiseProcess />
      <PhotoGallery />
      <MainCTA /> {/* Añadimos el nuevo CTA principal aquí, antes de las FAQ */}
      <FAQSection />
      <Footer />
    </main>
  )
}
