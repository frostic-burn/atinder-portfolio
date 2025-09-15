import React from "react"
import { useState, useRef } from "react"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")
  const [showResumeHint, setShowResumeHint] = useState(false)

  // Different resume URLs
  const RESUME_URLS = {
    messageKeyword: "https://drive.google.com/file/d/1Jc4HqJaWfePJnGDCJAKrjS_Bm9xGA1cb/view?usp=drive_link",
    downloadButton: "https://drive.google.com/file/d/14wWwfFRKMQLIJvk2K2JAJI68qIsX6SvR/view?usp=sharing"
  }

  const validateForm = () => {
    const newErrors = {}

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

  const checkForResumeKeyword = (message) => {
    const resumeKeywords = ['resume']
    const lowerMessage = message.toLowerCase().trim()
    
    return resumeKeywords.some(keyword => lowerMessage === keyword || lowerMessage.includes(keyword))
  }

  const handleResumeRedirect = () => {
    setSubmitStatus("success")
    setTimeout(() => {
      // Use the message keyword resume URL
      window.open(RESUME_URLS.messageKeyword, "_blank")
      setFormData({ name: "", email: "", message: "" })
      setSubmitStatus("idle")
      setShowResumeHint(false)
    }, 1500)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    if (name === 'message') {
      const hasResumeKeyword = checkForResumeKeyword(value)
      setShowResumeHint(hasResumeKeyword)
    }
  }

  const handleSubmit = async (e) => {
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

  const inputClasses = (fieldName) => {
    const baseClasses = "mt-1 block w-full rounded-lg bg-gray-800 bg-opacity-50 border-2 text-white px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 backdrop-blur-sm"
    const errorClasses = errors[fieldName] 
      ? "border-red-500 focus:border-red-500"
      : "border-gray-700 focus:border-gray-500 hover:border-gray-600"
    
    return `${baseClasses} ${errorClasses}`
  }

  const MailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )

  const FileTextIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )

  const SendIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )

  const CheckCircleIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  const AlertCircleIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  const LoaderIcon = () => (
    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )

  return (
    <div className="py-20 relative min-h-screen">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="opacity-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-black bg-opacity-90 py-4 rounded-lg">
            <span className="text-white">Let's Connect</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black bg-opacity-60 backdrop-blur-lg p-8 rounded-2xl border border-gray-800 border-opacity-50 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-white">Send me a message</h3>

                <div onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
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
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1 opacity-100 transform translate-y-0">
                        <AlertCircleIcon />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClasses("email")}
                      placeholder="shersingh@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1 opacity-100 transform translate-y-0">
                        <AlertCircleIcon />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={inputClasses("message")}
                      placeholder="Tell me about your project, ideas, or just say hello"
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1 opacity-100 transform translate-y-0">
                        <AlertCircleIcon />
                        {errors.message}
                      </p>
                    )}
                    
                    {showResumeHint && (
                      <div className="mt-2 p-3 bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-50 rounded-lg text-blue-400 flex items-center gap-2 opacity-100 transform translate-y-0">
                        <FileTextIcon />
                        <span>Hit send message to download resume, or replace with "CV" to continue typing</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      showResumeHint 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                        : 'bg-white hover:bg-gray-200 text-black'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <LoaderIcon />
                        <span className="ml-2">Sending...</span>
                      </div>
                    ) : showResumeHint ? (
                      <div className="flex items-center justify-center">
                        <FileTextIcon />
                        <span className="ml-2">Download Resume</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <SendIcon />
                        <span className="ml-2">Send Message</span>
                      </div>
                    )}
                  </button>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-50 rounded-lg text-green-400 flex items-center gap-2 opacity-100 transform translate-y-0">
                      <CheckCircleIcon />
                      <span>
                        {checkForResumeKeyword(formData.message) || showResumeHint
                          ? "Opening resume download..."
                          : "Message sent successfully! I'll get back to you soon."
                        }
                      </span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg text-red-400 flex items-center gap-2 opacity-100 transform translate-y-0">
                      <AlertCircleIcon />
                      <span>Failed to send message. Please try again or contact me directly.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-black bg-opacity-60 backdrop-blur-lg p-8 rounded-2xl border border-gray-800 border-opacity-50 shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 text-white">Get in touch</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    I'm always excited to discuss new opportunities, innovative projects, or just have a chat about
                    technology. Whether you have a project in mind or want to explore possibilities, let's connect!
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <MailIcon />
                      <span>atinderpaul16@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span>Atinderpal Singh </span>
                    </div>
                  </div>
                </div>

                <div className="bg-black bg-opacity-60 backdrop-blur-lg p-8 rounded-2xl border border-gray-800 border-opacity-50 shadow-2xl">
                  <h4 className="text-xl font-bold mb-4 text-white">Quick Actions</h4>
                  <div className="space-y-3">
                    <a
                      href="mailto:atinderpaul16@gmail.com?subject=Let's%20Connect&body=Hi%20Atinderpal,"
                      className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <MailIcon />
                      Email Me Directly
                    </a>
                    <a
                      href={RESUME_URLS.downloadButton}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-white hover:bg-gray-200 text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <FileTextIcon />
                      Download Resume
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
