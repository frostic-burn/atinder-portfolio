"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import ErrorBoundary from "@/components/ErrorBoundary"
import DecryptedText from "@/components/reactbits/DecryptedText"

const Folder = dynamic(() => import("@/components/Folder"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-white text-lg">Loading projects...</div>
    </div>
  ),
})

// Centralized projects data - this is the single source of truth
export const projectsData = [
  {
    title: "Notesy",
    description:
      "A minimal, fast, and intuitive note-taking application designed for productivity. Supports markdown formatting, instant search, offline access, and cross-device syncing. Built with a clean UI to help users focus on their ideas without distractions.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PWA"],
    date: "July 2025",
    demoUrl: "https://notsey.vercel.app",
    githubUrl: "https://github.com/frostic-burn/notsey",
  },
  {
    title: "The Akaal Thrifts",
    description:
      "A comprehensive e-commerce platform featuring dynamic UI, integrated backend, secure payment processing with Razorpay, and a complete online shopping experience with user authentication and order management.",
    tags: ["JavaScript", "E-commerce", "Backend Integration", "Razorpay", "Payment Gateway"],
    date: "Feb 2025",
    demoUrl: "https://the-akaal-thrifts.vercel.app",
    githubUrl: "https://github.com/frostic-burn/akaal-thrifts",
  },
  {
    title: "Life Lane(API Expired)",
    description:
      "A Smart Traffic Light Management System that prioritizes emergency vehicles using AI-powered traffic signal management and optimized routing with Google Maps APIs. This system helps reduce emergency response times by intelligently managing traffic flow.",
    tags: ["React", "Google Maps API", "TypeScript", "Next.js", "Vercel", "AI"],
    date: "April 2025",
    demoUrl: "https://lifelane2.vercel.app",
    githubUrl: "https://github.com/frostic-burn/life-lane",
  },
  {
    title: "QuickLaunch Extension",
    description:
      "This extension makes it very convenient to save all open tabs into named sessions, which can be relaunched anytime with a single click. Each session can be renamed, deleted, or reordered with drag-and-drop, you can open single tabs, delete sessions, remove them, or even launch only the selected ones.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "Chart.js"],
    date: "August 2025",
    demoUrl: "https://www.linkedin.com/posts/atinderpal-sing_chromeextension-webdevelopment-productivitytools-activity-7376247401755418625-AfUu",
    githubUrl: "https://github.com/frostic-burn/quicklaunch-extension",
  },
]

export default function WorkSection({ mounted }: { mounted: boolean }) {
  return (
    <section id="work" className="py-32">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-black bg-opacity-90 py-4 rounded-lg">
            <span className="text-white">
              <DecryptedText
                text="Projects.zip"
                speed={50}
                maxIterations={18}
                characters="ABCDEFabcdef0123456789!@#$%"
                className="text-white"
                encryptedClassName="text-cyan-400"
              />
            </span>
          </h2>

          <p className="text-center text-gray-400 text-sm mb-16 opacity-75">
            Click on the folder below to explore my projects
          </p>

          <div className="flex justify-center items-center min-h-[600px]">
            <div
              style={{
                height: "600px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ErrorBoundary>
                {mounted && <Folder size={3} color="#5227FF" className="custom-folder" items={projectsData} />}
              </ErrorBoundary>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
