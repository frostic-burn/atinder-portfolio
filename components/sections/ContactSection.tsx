"use client"
import { useState } from "react"
import BlurText from "@/components/reactbits/BlurText"
import StarBorder from "@/components/reactbits/StarBorder"

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showResumeHint, setShowResumeHint] = useState(false)

  const RESUME_URLS = {
    messageKeyword: "https://drive.google.com/file/d/1Jc4HqJaWfePJnGDCJAKrjS_Bm9xGA1cb/view?usp=drive_link",
    downloadButton: "https://drive.google.com/file/d/14wWwfFRKMQLIJvk2K2JAJI68qIsX6SvR/view?usp=sharing",
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const checkForResumeKeyword = (message: string): boolean => {
    const resumeKeywords = ["resume", "cv"]
    const lowerMessage = message.toLowerCase().trim()

    return resumeKeywords.some((keyword) => lowerMessage === keyword || lowerMessage.includes(keyword))
  }

  const handleResumeRedirect = () => {
    setSubmitStatus("success")
    setTimeout(() => {
      window.open(RESUME_URLS.messageKeyword, "_blank")
      setFormData({ name: "", email: "", message: "" })
      setSubmitStatus("idle")
      setShowResumeHint(false)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    if (name === "message") {
      const hasResumeKeyword = checkForResumeKeyword(value)
      setShowResumeHint(hasResumeKeyword)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (checkForResumeKeyword(formData.message)) {
      handleResumeRedirect()
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://formspree.io/f/xdkgajpz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setErrors({})
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (fieldName: keyof FormErrors) => {
    const baseClasses =
      "mt-1 block w-full rounded-lg bg-gray-800 bg-opacity-50 border-2 text-white px-3 md:px-4 py-2 md:py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 backdrop-blur-sm text-sm md:text-base"
    const errorClasses = errors[fieldName]
      ? "border-red-500 focus:border-red-500"
      : "border-gray-700 focus:border-gray-500 hover:border-gray-600"

    return `${baseClasses} ${errorClasses}`
  }

  const MailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )

  const FileTextIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )

  const SendIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )

  const CheckCircleIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )

  const AlertCircleIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )

  const LoaderIcon = () => (
    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  return (
    <div id="contact" className="py-12 md:py-20 relative min-h-screen">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="opacity-100">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center bg-black bg-opacity-90 py-3 md:py-4 rounded-lg">
            <BlurText
              text="Let's Connect"
              delay={120}
              animateBy="words"
              direction="bottom"
              className="text-white text-2xl md:text-3xl lg:text-4xl font-bold justify-center"
            />
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-black bg-opacity-60 backdrop-blur-lg p-4 md:p-6 lg:p-8 rounded-2xl border border-gray-800 border-opacity-50 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Send me a message</h3>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={inputClasses("name")}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <p className="mt-1 md:mt-2 text-xs md:text-sm text-red-400 flex items-center gap-1">
                        <AlertCircleIcon />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClasses("email")}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 md:mt-2 text-xs md:text-sm text-red-400 flex items-center gap-1">
                        <AlertCircleIcon />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={inputClasses("message")}
                      placeholder="Tell me about your project, ideas, or just say hello"
                    />
                    {errors.message && (
                      <p className="mt-1 md:mt-2 text-xs md:text-sm text-red-400 flex items-center gap-1">
                        <AlertCircleIcon />
                        {errors.message}
                      </p>
                    )}

                    {showResumeHint && (
                      <div className="mt-2 p-2 md:p-3 bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-50 rounded-lg text-blue-400 flex items-center gap-2 text-xs md:text-sm">
                        <FileTextIcon />
                        <span>Hit send to download resume or replace with "CV" to continue typing</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base ${showResumeHint
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-white hover:bg-gray-200 text-black"
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoaderIcon />
                        <span>Sending...</span>
                      </div>
                    ) : showResumeHint ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileTextIcon />
                        <span>Download Resume</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <SendIcon />
                        <span>Send Message</span>
                      </div>
                    )}
                  </button>

                  {submitStatus === "success" && (
                    <div className="p-3 md:p-4 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-50 rounded-lg text-green-400 flex items-center gap-2 text-xs md:text-sm">
                      <CheckCircleIcon />
                      <span>
                        {checkForResumeKeyword(formData.message) || showResumeHint
                          ? "Opening resume download..."
                          : "Message sent successfully! I'll get back to you soon."}
                      </span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-3 md:p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg text-red-400 flex items-center gap-2 text-xs md:text-sm">
                      <AlertCircleIcon />
                      <span>Failed to send message. Please try again or contact me directly.</span>
                    </div>
                  )}
                </form>
              </div>

              <div className="space-y-4 md:space-y-6">
                <StarBorder color="#8b5cf6" speed="8s">
                  <div className="p-4 md:p-6 lg:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Get in touch</h3>
                    <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                      I'm always excited to discuss new opportunities, innovative projects, or just have a chat about
                      technology. Let's connect!
                    </p>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                        <MailIcon />
                        <span>atinderpaul16@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                        <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span>Atinderpal Singh</span>
                      </div>
                    </div>
                  </div>
                </StarBorder>

                <div className="bg-black bg-opacity-60 backdrop-blur-lg p-4 md:p-6 lg:p-8 rounded-2xl border border-gray-800 border-opacity-50 shadow-2xl">
                  <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Quick Actions</h4>
                  <div className="space-y-2 md:space-y-3">
                    <a
                      href="mailto:atinderpaul16@gmail.com?subject=Let's%20Connect&body=Hi%20Atinderpal,"
                      className="flex items-center justify-center gap-2 md:gap-3 w-full px-4 md:px-6 py-2.5 md:py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm md:text-base rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <MailIcon />
                      Email Me
                    </a>
                    <a
                      href={RESUME_URLS.downloadButton}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 md:gap-3 w-full px-4 md:px-6 py-2.5 md:py-3 bg-white hover:bg-gray-200 text-black font-medium text-sm md:text-base rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <FileTextIcon />
                      Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
