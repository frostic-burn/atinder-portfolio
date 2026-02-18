"use client"

import { motion } from "framer-motion"
import ErrorBoundary from "@/components/ErrorBoundary"
import TrueInfiniteScroll from "@/components/TrueInfiniteScroll"
import BlurText from "@/components/reactbits/BlurText"

const languagesSkills = [
  { content: "JavaScript" },
  { content: "TypeScript" },
  { content: "Python" },
  { content: "C/C++" },
  { content: "Java" },
  { content: "Kotlin" },
  { content: "HTML5" },
  { content: "CSS3" },
]

const developerToolsSkills = [
  { content: "VS Code" },
  { content: "Git" },
  { content: "Docker" },
  { content: "Kubernetes" },
  { content: "GCP" },
  { content: "Arduino IDE" },
  { content: "Postman" },
  { content: "Firebase" },
]

const areasOfInterestSkills = [
  { content: "Web Development" },
  { content: "Full Stack Dev" },
  { content: "IoT & Embedded" },
  { content: "Robotics" },
  { content: "Machine Learning" },
  { content: "Cybersecurity" },
  { content: "Mobile Dev" },
  { content: "API Development" },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-black bg-opacity-90 py-4 rounded-lg">
            <BlurText
              text="Tech Skills"
              delay={150}
              animateBy="letters"
              direction="bottom"
              className="text-white text-3xl md:text-4xl font-bold justify-center"
            />
          </h2>

          <div className="max-w-6xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              <ErrorBoundary>
                <TrueInfiniteScroll
                  title="Languages"
                  skills={languagesSkills}
                  color="text-gray-300"
                  direction="up"
                  speed={1}
                />
              </ErrorBoundary>

              <ErrorBoundary>
                <TrueInfiniteScroll
                  title="Developer Tools"
                  skills={developerToolsSkills}
                  color="text-white"
                  direction="down"
                  speed={1.2}
                />
              </ErrorBoundary>

              <ErrorBoundary>
                <TrueInfiniteScroll
                  title="Areas of Interest"
                  skills={areasOfInterestSkills}
                  color="text-gray-400"
                  direction="up"
                  speed={0.8}
                />
              </ErrorBoundary>
            </div>

            {/* Mobile Horizontal Scroll Layout */}
            <div className="md:hidden overflow-x-auto pb-4" style={{ scrollBehavior: "smooth" }}>
              <div className="flex gap-6" style={{ width: "max-content" }}>
                <ErrorBoundary>
                  <div className="flex-shrink-0" style={{ width: "280px" }}>
                    <TrueInfiniteScroll
                      title="Languages"
                      skills={languagesSkills}
                      color="text-gray-300"
                      direction="up"
                      speed={1}
                    />
                  </div>
                </ErrorBoundary>

                <ErrorBoundary>
                  <div className="flex-shrink-0" style={{ width: "280px" }}>
                    <TrueInfiniteScroll
                      title="Developer Tools"
                      skills={developerToolsSkills}
                      color="text-white"
                      direction="down"
                      speed={1.2}
                    />
                  </div>
                </ErrorBoundary>

                <ErrorBoundary>
                  <div className="flex-shrink-0" style={{ width: "280px" }}>
                    <TrueInfiniteScroll
                      title="Areas of Interest"
                      skills={areasOfInterestSkills}
                      color="text-gray-400"
                      direction="up"
                      speed={0.8}
                    />
                  </div>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
