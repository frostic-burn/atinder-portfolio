import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Atinderpal Singh - Full Stack Developer | Frontend Engineer | Portfolio",
  description:
    "Atinderpal Singh (Atinder) - Computer Science Student & Full Stack Developer specializing in React, Next.js, TypeScript, Python, IoT, and Embedded Systems. View my portfolio of web development projects and technical expertise.",
  keywords: [
    "Atinder",
    "Atinderpal",
    "Atinderpal Singh",
    "Atinder Pal Singh",
    "Atinderpal Singh Bangalore",
    "Atinder Pal Singh Chandigarh University",
    "Atinder Instagram",
    "Atinder vercel",
    "Atinder vercel app",
    "front end developer",
    "frontend developer",
    "full stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "JavaScript developer",
    "Python developer",
    "computer science student",
    "software engineer",
    "web development",
    "portfolio",
    "Chandigarh University",
    "IoT developer",
    "embedded systems",
    "Arduino developer",
    "ESP32",
    "automation",
    "robotics",
    "machine learning",
    "cybersecurity",
    "tech enthusiast",
    "programmer",
    "coding",
    "software development",
    "responsive design",
    "UI/UX",
    "backend development",
    "database",
    "API development",
    "mobile development",
    "Chrome extension",
    "Android development",
    "project management",
    "technical skills",
    "programming languages",
    "developer tools",
    "networking",
    "TCP/IP",
    "WebSockets",
    "HTTP",
    "MQTT",
    "Google Cloud Platform",
    "VS Code",
    "Git",
    "Docker",
    "Kubernetes",
  ],
  authors: [{ name: "Atinderpal Singh", url: "https://atinder.vercel.app" }],
  creator: "Atinderpal Singh",
  publisher: "Atinderpal Singh",
  generator: "Next.js",
  applicationName: "Atinderpal Singh Portfolio",
  referrer: "origin-when-cross-origin",
  themeColor: "#8b5cf6",
  manifest: "/manifest.json",
  icons: {
    icon: "https://ik.imagekit.io/cacl2snorter/AS%20(1).png?updatedAt=1752497226528",
    shortcut: "https://ik.imagekit.io/cacl2snorter/AS%20(1).png?updatedAt=1752497226528",
    apple: "https://ik.imagekit.io/cacl2snorter/AS%20(1).png?updatedAt=1752497226528",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atinder.vercel.app",
    siteName: "Atinderpal Singh - Full Stack Developer Portfolio",
    title: "Atinderpal Singh - Full Stack Developer | Frontend Engineer | Portfolio",
    description:
      "Atinderpal Singh (Atinder) - Computer Science Student & Full Stack Developer specializing in React, Next.js, TypeScript, Python, IoT, and Embedded Systems. View my portfolio of web development projects.",
    images: [
      {
        url: "https://ik.imagekit.io/cacl2snorter/WhatsApp%20Image%202025-07-13%20at%2021.02.00_d76b459d.webp?updatedAt=1752421638768",
        width: 1200,
        height: 630,
        alt: "Atinderpal Singh - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atinderpal Singh - Full Stack Developer | Frontend Engineer",
    description:
      "Computer Science Student & Full Stack Developer specializing in React, Next.js, TypeScript, Python, IoT, and Embedded Systems.",
    images: [
      "https://ik.imagekit.io/cacl2snorter/WhatsApp%20Image%202025-07-13%20at%2021.02.00_d76b459d.webp?updatedAt=1752421638768",
    ],
    creator: "@atinderpal_singh",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://atinder.vercel.app",
  },
  category: "technology",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-R1SYHPMQYM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R1SYHPMQYM');
            `,
          }}
        />



        {/* Structured Data - Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atinderpal Singh",
              alternateName: ["Atinder", "Atinder Pal Singh"],
              url: "https://atinder.vercel.app",
              image:
                "https://ik.imagekit.io/cacl2snorter/WhatsApp%20Image%202025-07-13%20at%2021.02.00_d76b459d.webp?updatedAt=1752421638768",
              sameAs: ["https://github.com/frostic-burn", "https://linkedin.com/in/atinderpal-sing"],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "The Akaal Thrifts",
              },
              alumniOf: {
                "@type": "Organization",
                name: "Chandigarh University",
              },
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Python",
                "Full Stack Development",
                "Frontend Development",
                "Web Development",
                "IoT",
                "Embedded Systems",
                "Arduino",
                "ESP32",
                "Machine Learning",
                "Cybersecurity",
              ],
              email: "atinderpaul16@gmail.com",
              description:
                "Computer Science Student & Full Stack Developer specializing in React, Next.js, TypeScript, Python, IoT, and Embedded Systems.",
            }),
          }}
        />

        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Atinderpal Singh" />
        <meta name="copyright" content="Atinderpal Singh" />
        <meta name="language" content="English" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://atinder.vercel.app" />
      </head>
      <body className="bg-black">
        {children}
      </body>
    </html>
  )
}
