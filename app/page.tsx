"use client"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import ErrorBoundary from "@/components/ErrorBoundary"

// Static imports for critical components
import AboutMe from "@/components/about-me"
import HeroSection from "@/components/sections/HeroSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ServicesSection from "@/components/sections/ServicesSection"
import WorkSection from "@/components/sections/WorkSection"
import ContactSection from "@/components/sections/ContactSection"
import FooterSection from "@/components/sections/FooterSection"

// Dynamic imports for client-side only components
const SimpleParticles = dynamic(() => import("@/components/simple-particles"), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ErrorBoundary>
      <div className="min-h-screen text-white overflow-hidden relative bg-black">
        {/* Particle Background - only render if mounted */}
        {mounted && (
          <ErrorBoundary fallback={null}>
            <SimpleParticles />
          </ErrorBoundary>
        )}

        <Navbar />

        {/* Hero Section */}
        <ErrorBoundary fallback={<div className="h-screen flex items-center justify-center"><h1 className="text-4xl text-white">Welcome</h1></div>}>
          <HeroSection mounted={mounted} />
        </ErrorBoundary>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container px-4 mx-auto">
            <ErrorBoundary fallback={<div className="text-center text-white">About section loading...</div>}>
              <AboutMe />
            </ErrorBoundary>
          </div>
        </section>

        {/* Skills Section */}
        <ErrorBoundary fallback={<div className="text-center text-white py-20">Skills section loading...</div>}>
          <SkillsSection />
        </ErrorBoundary>

        {/* Services Section */}
        <ErrorBoundary fallback={<div className="text-center text-white py-20">Services section loading...</div>}>
          <ServicesSection />
        </ErrorBoundary>

        {/* Work Section */}
        <ErrorBoundary fallback={<div className="text-center text-white py-20">Work section loading...</div>}>
          <WorkSection mounted={mounted} />
        </ErrorBoundary>

        {/* Contact Section */}
        <ErrorBoundary fallback={<div className="text-center text-white py-20">Contact section loading...</div>}>
          <ContactSection />
        </ErrorBoundary>

        {/* Footer */}
        <ErrorBoundary fallback={<div className="text-center text-white py-12">Footer loading...</div>}>
          <FooterSection />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}
