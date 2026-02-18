"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import ProfileCard from "./ProfileCard"
import DecryptedText from "@/components/reactbits/DecryptedText"
import BlurText from "@/components/reactbits/BlurText"

const timelineData = [
  {
    id: 1,
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2025 - ",
    location: "Remote",
    type: " ",
    logo: "https://media.istockphoto.com/id/1218868137/vector/young-indian-male-character-portrait-3-4-front-view-millennial-lifestyle-flat-vector-graphics.jpg?s=612x612&w=0&k=20&c=Nno65IIlhYe9-nWa96AbAhw__LUPtEUDtUDxTtqA6rg=",
    skills: ["JavaScript", "TypeScript", "React", "MongoDB"],
  },
  {
    id: 2,
    company: "Chandigarh University",
    role: "Computer Science & Engineering Student",
    period: "2024 - 2028",
    location: "Mohali, Punjab",
    type: "Student",
    logo: "https://i.ibb.co/FLY8qhLS/images.png",
  },
]

export default function AboutMe() {
  return (
    <section id="about" className="py-12 md:py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center bg-black bg-opacity-90 py-3 md:py-4 rounded-lg">
            <span className="text-white">
              <DecryptedText
                text="Readme.md"
                speed={60}
                maxIterations={15}
                characters="01!@#$%^&*<>/\"
                className="text-white"
                encryptedClassName="text-purple-400"
              />
            </span>
          </h2>

          <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-full max-w-xs">
                <ProfileCard
                  name="Atinderpal Singh"
                  title="Student"
                  avatarUrl="https://ik.imagekit.io/cacl2snorter/WhatsApp%20Image%202025-07-13%20at%2021.02.00_d76b459d.jpg?updatedAt=1752420999199"
                  enableTilt={true}
                  showUserInfo={false}
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="prose prose-invert max-w-none text-center md:text-left bg-black bg-opacity-90 p-4 md:p-6 rounded-lg">
                <p className="text-base md:text-lg leading-relaxed md:hidden">
                  Full Stack Dev. Building secure, scalable solutions in the crypto-verse. From DeFi to Web3, turning
                  complex tech into seamless experiences.
                </p>

                <div className="hidden md:block space-y-4">
                  <p className="text-lg md:text-xl font-semibold text-white">I'm Atinderpal Singh!</p>
                  <p className="text-gray-300 leading-relaxed">
                    Busy building and integrating systems that connect software, hardware, and the real world. From
                    full-stack webapps to IoT automation. My goal is to create tech that doesn't just run, I want it to
                    solve problems that I and you face in our day to day lives.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    I'm currently studying Computer Science & Engineering at Chandigarh University. Every project I take
                    on is a step toward building things that make a difference, in how we live, work, rely upon and
                    interact with technology.
                  </p>
                  <p className="text-gray-300">If you're into building tech, let's connect.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 md:mb-16 mt-8 md:mt-12">
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-white">
              <BlurText
                text="My Journey"
                delay={120}
                animateBy="words"
                direction="bottom"
                className="text-xl md:text-2xl font-bold justify-center"
              />
            </h3>
            <div className="space-y-4 md:space-y-6">
              {timelineData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: item.id * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 bg-black bg-opacity-90 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={`${item.company} logo`}
                      width={48}
                      height={48}
                      className="rounded-lg w-10 h-10 sm:w-12 sm:h-12"
                    />
                  </div>
                  <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <div>
                        <h4 className="text-base md:text-lg font-semibold text-white">{item.role}</h4>
                        <p className="text-sm md:text-base text-gray-400 font-medium">{item.company}</p>
                      </div>
                      <div className="text-xs md:text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          {item.period}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                    {item.skills && (
                      <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
                        {item.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs bg-gray-700 bg-opacity-50 text-gray-300 rounded-full border border-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
