"use client"

import { motion } from "framer-motion"
import { Github, Cpu, Braces, Code, Zap } from "lucide-react"
import SpotlightCard from "@/components/SpotlightCard"

function ServiceCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="p-6 rounded-lg bg-black bg-opacity-90 border border-gray-800 hover:border-gray-600 transition-all duration-300 text-center md:text-left group hover:scale-105"
    >
      <div className="mb-4 flex justify-center md:justify-start group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

export default function ServicesSection() {
  const services = [
    {
      icon: <Code className="w-10 h-10 text-gray-300" />,
      title: "Web Development",
      description: "Responsive and dynamic web applications using modern frameworks and technologies.",
    },
    {
      icon: <Braces className="w-10 h-10 text-white" />,
      title: "Full Stack Development",
      description: "End-to-end web application development with modern frameworks and best practices.",
    },
    {
      icon: <Cpu className="w-10 h-10 text-gray-400" />,
      title: "Embedded Systems",
      description: "Development of hardware and software solutions for IoT and robotics applications.",
    },
    {
      icon: <Github className="w-10 h-10 text-gray-300" />,
      title: "Project Management",
      description:
        "Efficient planning, execution, and delivery of technical projects with focus on quality and timeliness.",
    },
    {
      icon: <Code className="w-10 h-10 text-white" />,
      title: "Frontend Engineering",
      description:
        "Scalable, maintainable user interfaces with Next.js, React 18, TypeScript, Tailwind CSS, and Framer Motion.",
    },
    {
      icon: <Zap className="w-10 h-10 text-gray-400" />,
      title: "Automation & Scripting",
      description:
        "Custom automation tools and scripts to streamline workflows, optimize performance, and boost productivity using Python and JavaScript.",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-black bg-opacity-90 py-4 rounded-lg">
            <span className="text-white">Domains</span>
          </h2>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <SpotlightCard key={index} spotlightColor="rgba(255, 255, 255, 0.1)">
                <ServiceCard icon={service.icon} title={service.title} description={service.description} />
              </SpotlightCard>
            ))}
          </div>

          {/* Mobile Horizontal Scroll Layout */}
          <div className="md:hidden overflow-x-auto pb-4" style={{ scrollBehavior: "smooth" }}>
            <div className="flex gap-6" style={{ width: "max-content" }}>
              {services.map((service, index) => (
                <div key={index} className="flex-shrink-0" style={{ width: "280px" }}>
                  <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.1)">
                    <ServiceCard icon={service.icon} title={service.title} description={service.description} />
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
