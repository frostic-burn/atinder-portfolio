"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import ErrorBoundary from "@/components/ErrorBoundary"

// Static imports for critical components
import AboutMe from "@/components/about-me"
import HeroSection from "@/components/sections/HeroSection"
import SkillsSection from "@/components/sections/SkillsSection"
import WorkSection from "@/components/sections/WorkSection"
import ContactSection from "@/components/sections/ContactSection"
import FooterSection from "@/components/sections/FooterSection"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ErrorBoundary fallback={<div className="text-center text-white py-20">Error loading page</div>}>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        {/* Hero Section */}
        <ErrorBoundary
          fallback={
            <div className="h-screen flex items-center justify-center">
              <h1 className="text-4xl text-white">Welcome</h1>
            </div>
          }
        >
          <HeroSection />
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
