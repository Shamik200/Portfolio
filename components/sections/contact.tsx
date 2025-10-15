"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Send, Github, Linkedin } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "shamikmunjani@gmail.com",
    href: "mailto:shamikmunjani@gmail.com"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Shamik200",
    href: "https://github.com/Shamik200"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/shamik-munjani",
    href: "https://linkedin.com/in/shamik-munjani"
  }
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Add your form submission logic here
    // This could be an API call to your backend or a service like Formspree
    console.log("Form submitted:", formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
    
    // You can add a success message or notification here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
        <section id="contact" className="py-16 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Get In </span><span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects,
            or just having a conversation about technology and innovation. Let&apos;s connect!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Let&apos;s Start a Conversation</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Whether you&apos;re looking for a software engineer, have a project in mind,
                or just want to connect, I&apos;d love to hear from you. I&apos;m particularly
                interested in opportunities involving AI/ML, full-stack development, and
                innovative mobile applications.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-4 p-4 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-primary/50 hover:bg-gray-800/50 transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-3 bg-primary/20 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                    <contact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{contact.label}</p>
                    <p className="text-gray-400 text-sm">{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-800/30 border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold text-green-600 dark:text-green-400">
                  Available for new opportunities
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                I&apos;m currently open to full-time positions, freelance projects,
                and consulting opportunities in software engineering and AI/ML.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/30 border border-gray-700 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-white placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-white placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-white placeholder-gray-400"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none text-white placeholder-gray-400"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full modern-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              I typically respond within 24 hours. For urgent matters,
              feel free to reach out via email or phone.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}