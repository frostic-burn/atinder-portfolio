"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import ProfileCard from "./ProfileCard"

const timelineData = [

  {

    id: 1,
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2025 - ",
    location: "Remote",
    type: " ",
    logo: "https://media.istockphoto.com/id/1218868137/vector/young-indian-male-character-portrait-3-4-front-view-millennial-lifestyle-flat-vector-graphics.jpg?s=612x612&w=0&k=20&c=Nno65IIlhYe9-nWa96AbAhw__LUPtEUDtUDxTtqA6rg=",
    skills: ["JavaScript", "TypeScript","React", "MongoDB"],
  },

  {
    id: 2,
    company: "The Akaal Thrifts",
    role: "Full Stack Dev",
    period: "2025 - ",
    location: "Remote",
    type: "Business Startup",
    logo: "https://i.ibb.co/6MyjZWn/Screenshot-2025-04-29-212433.png",
    skills: ["JavaScript", "TypeScript"],
  },
  {
    id: 3,
    company: "Chandigarh University",
    role: "Computer Science & Engineering Student",
    period: "2024 - 2028",
    location: " Mohali, Punjab",
    type: "Student",
    logo: "https://i.ibb.co/FLY8qhLS/images.png",
  },
]

const skillsData = {
  "Programming Languages": [
    { name: "JavaScript", proficiency: 90 },
    { name: "TypeScript", proficiency: 80 },
    { name: "Python", proficiency: 70 },
    { name: "HTML+CSS", proficiency: 95 },
    { name: "Kotlin", proficiency: 60 },
  ],
  "Frameworks/Libraries": [
    { name: "React", proficiency: 75 },
    { name: "Next.js", proficiency: 85 },
    { name: "Node.js", proficiency: 75 },
    { name: "Express.js", proficiency: 65 },
  ],
  Tools: [
    { name: "Git", proficiency: 98 },
    { name: "Docker", proficiency: 88 },
    { name: "Kubernetes", proficiency: 78 },
  ],
}

export default function AboutMe() {
  return (
    <section id="about" className="py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-black bg-opacity-90 py-4 rounded-lg">
          <span className="text-white">Readme<span className="text-red-500">.</span>md</span>
          </h2>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="relative mx-auto max-w-sm">
                <ProfileCard
                  name="Atinderpal Singh"
                  title="Student"
                  avatarUrl="https://ik.imagekit.io/cacl2snorter/WhatsApp%20Image%202025-07-13%20at%2021.02.00_d76b459d.jpg?updatedAt=1752420999199"
                  enableTilt={true}
                  showUserInfo={false}
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="prose prose-invert max-w-none text-center md:text-left bg-black bg-opacity-90 p-6 rounded-lg">
                <p className="text-lg leading-relaxed md:hidden">
                  Full Stack Dev. Building secure, scalable solutions in the crypto-verse. From DeFi to Web3, turning
                  complex tech into seamless experiences.
                </p>

                <div className="hidden md:block">
                  <p className="text-xl mb-4">
                    <strong>I'm Atinderpal Singh!</strong>
                  </p>
                  <p className="mb-4">
                    Busy building and and integrating systems that connect software, hardware, and the real world. From
                    full-stack webapps to IoT automation. My goal is to create tech that doesn't just run, I want it it
                    solves problems that I and you face in our day to day lives.
                  </p>
                  <p className="mb-4">
                    I'm currently studying Computer Science & Engineering at Chandigarh University. Every project I take
                    on is a step toward building things that make a difference, in how we live, work, rely upon and
                    interact with technology.
                  </p>
                  <p>If you're into building tech, let's connect.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 mt-12">
            <h3 className="text-2xl font-bold mb-8 text-center text-white">My Journey</h3>
            <div className="space-y-6">
              {timelineData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: item.id * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-black bg-opacity-90 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={`${item.company} logo`}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{item.role}</h4>
                        <p className="text-gray-400 font-medium">{item.company}</p>
                      </div>
                      <div className="text-sm text-gray-400 mt-2 sm:mt-0">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.period}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                    {item.skills && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-700 bg-opacity-50 text-gray-300 rounded-full border border-gray-600"
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

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-white">Technical Expertise</h3>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {Object.entries(skillsData).map(([category, skills]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-black bg-opacity-90 p-6 rounded-lg border border-gray-800"
                >
                  <h4 className="text-lg font-semibold mb-4 text-gray-300">{category}</h4>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white text-sm">{skill.name}</span>
                          <span className="text-gray-400 text-xs">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-300 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Horizontal Scroll Layout */}
            <div className="md:hidden overflow-x-auto pb-4" style={{ scrollBehavior: "smooth" }}>
              <div className="flex gap-6" style={{ width: "max-content" }}>
                {Object.entries(skillsData).map(([category, skills]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-black bg-opacity-90 p-6 rounded-lg border border-gray-800 flex-shrink-0"
                    style={{ width: "280px" }}
                  >
                    <h4 className="text-lg font-semibold mb-4 text-gray-300">{category}</h4>
                    <div className="space-y-3">
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm">{skill.name}</span>
                            <span className="text-gray-400 text-xs">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="bg-gray-300 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
