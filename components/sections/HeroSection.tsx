"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import ErrorBoundary from "@/components/ErrorBoundary"
import SplitText from "@/components/reactbits/SplitText"
import GradientText from "@/components/reactbits/GradientText"
import StarBorder from "@/components/reactbits/StarBorder"

const Orb = dynamic(() => import("@/components/Orb"), {
  ssr: false,
  loading: () => (
    <div className="w-[600px] h-[600px] opacity-30 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
    </div>
  ),
})

export default function HeroSection({ mounted }: { mounted: boolean }) {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Orb Background Effect */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-full flex items-center justify-center pointer-events-auto">
            <div className="w-[600px] h-[600px] opacity-60 pointer-events-auto relative z-10">
              <ErrorBoundary
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></div>
                  </div>
                }
              >
                <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      )}

      <div className="container relative z-30 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-8 flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-white">
              <SplitText
                text="I'm Atinderpal Singh"
                delay={40}
                className="font-bold"
                animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0) rotateX(-20deg)" }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0) rotateX(0deg)" }}
              />
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-center mt-4">
              <GradientText
                colors={["#8b5cf6", "#06b6d4", "#ec4899", "#f59e0b", "#8b5cf6"]}
                animationSpeed={6}
                className="font-semibold"
              >
                Computer Science Student | Full-Stack Developer | Tech Enthusiast
              </GradientText>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-30">
            <a href="#work">
              <StarBorder color="#8b5cf6" speed="5s">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border-none px-8 py-3">
                  View Projects
                </Button>
              </StarBorder>
            </a>
            <a href="#contact">
              <StarBorder color="#06b6d4" speed="7s">
                <Button
                  variant="outline"
                  className="bg-transparent border-none text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3"
                >
                  Contact Me
                </Button>
              </StarBorder>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
