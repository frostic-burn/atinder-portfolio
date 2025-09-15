"use client"
import { motion } from "framer-motion"
import { useEffect, useRef, useState, useCallback } from "react"

interface Skill {
  content: string
}

interface TrueInfiniteScrollProps {
  title: string
  skills: Skill[]
  color?: string
  direction?: "up" | "down"
  speed?: number
}

export default function TrueInfiniteScroll({
  title,
  skills,
  color = "text-white",
  direction = "up",
  speed = 1,
}: TrueInfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number>()
  const scrollPositionRef = useRef(0)

  // Create enough duplicates for truly seamless scrolling
  const duplicatedSkills = [...skills, ...skills, ...skills]

  const animate = useCallback(() => {
    if (!containerRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const container = containerRef.current
    const itemHeight = 60 // Height of each item including margin
    const singleSetHeight = skills.length * itemHeight

    if (!isPaused) {
      // Update scroll position
      scrollPositionRef.current += (direction === "up" ? -speed : speed) * 0.5

      // Reset position for seamless loop when we've scrolled one full set
      if (direction === "up" && scrollPositionRef.current <= -singleSetHeight) {
        scrollPositionRef.current = 0
      } else if (direction === "down" && scrollPositionRef.current >= singleSetHeight) {
        scrollPositionRef.current = 0
      }
    }

    // Apply transform
    container.style.transform = `translateY(${scrollPositionRef.current}px)`

    animationRef.current = requestAnimationFrame(animate)
  }, [direction, speed, skills.length, isPaused])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-black bg-opacity-50 p-6 rounded-lg border border-gray-800 transform rotate-12 origin-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className={`text-xl font-bold mb-4 text-center ${color}`}>{title}</h3>

      <div className="h-64 overflow-hidden relative">
        <div
          ref={containerRef}
          className="flex flex-col space-y-2"
          style={{
            willChange: "transform",
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <div
              key={`${skill.content}-${index}`}
              className="bg-gray-800 bg-opacity-50 p-3 rounded-md text-center text-white hover:bg-opacity-70 transition-all duration-300 flex-shrink-0 min-h-[52px] flex items-center justify-center"
            >
              {skill.content}
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </div>
    </motion.div>
  )
}
