"use client"

import { Github, Linkedin } from "lucide-react"
import SocialIcon from "@/components/social-icon"
import Magnet from "@/components/reactbits/Magnet"
import ShinyText from "@/components/reactbits/ShinyText"

export default function FooterSection() {
  return (
    <footer className="py-12 bg-black bg-opacity-90">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Magnet magnetStrength={3} padding={40}>
            <SocialIcon icon={<Github />} href="https://github.com/frostic-burn" label="GitHub" />
          </Magnet>
          <Magnet magnetStrength={3} padding={40}>
            <SocialIcon icon={<Linkedin />} href="https://linkedin.com/in/atinderpal-sing" label="LinkedIn" />
          </Magnet>
        </div>
        <div className="text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <ShinyText speed={4} shimmerWidth={80}>
              Atinderpal Singh
            </ShinyText>
            . All rights reserved.
          </p>
          <div className="mt-2">
            <a href="mailto:atinderpaul16@gmail.com" className="text-purple-400 hover:text-purple-300">
              atinderpaul16@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
