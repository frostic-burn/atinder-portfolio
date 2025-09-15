"use client"

import { Github, Linkedin, Twitter, MessageSquare, PenTool, Smartphone } from "lucide-react"
import SocialIcon from "@/components/social-icon"

export default function FooterSection() {
  return (
    <footer className="py-12 bg-black bg-opacity-90">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <SocialIcon icon={<Github />} href="https://github.com/frostic-burn" label="GitHub" />
          <SocialIcon icon={<Linkedin />} href="https://linkedin.com/in/atinderpal-sing" label="LinkedIn" />
          <SocialIcon icon={<Twitter />} href="#" label="Twitter" />
          <SocialIcon icon={<MessageSquare />} href="#" label="Discord" />
          <SocialIcon icon={<PenTool />} href="#" label="Medium" />
          <SocialIcon
            icon={<Smartphone />}
            href="#"
            label="Mobile Apps"
            className="opacity-50 cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault()
              console.log("Mobile icon click prevented")
            }}
          />
        </div>
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Atinderpal Singh. All rights reserved.</p>
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
