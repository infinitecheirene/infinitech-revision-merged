"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SupportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupportModal({ open, onOpenChange }: SupportModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "bug_report",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })

  const validateForm = () => {
    const newErrors: typeof errors = { name: "", email: "", category: "", subject: "", message: "" }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((err) => err === "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const websiteKeywords = [
      "website",
      "page",
      "button",
      "link",
      "feature",
      "menu",
      "error",
      "bug",
      "broken",
      "not working",
      "issue",
      "feedback",
      "improve",
      "suggestion",
    ]
    const messageHasWebsiteContext = websiteKeywords.some((keyword) => formData.message.toLowerCase().includes(keyword))

    if (!messageHasWebsiteContext) {
      toast.error("Invalid Request", {
        description: "Please describe an issue or feedback related to this website.",
        richColors: true,
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/support-tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          domain: typeof window !== "undefined" ? window.location.origin : "",
          currentPage: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create support ticket")
      }

      toast.success("Success", {
        description: `Support ticket created: ${data.ticket_id}`,
        richColors: true,
      })

      setFormData({ name: "", email: "", category: "bug_report", subject: "", message: "" })
      setErrors({ name: "", email: "", category: "", subject: "", message: "" })
      onOpenChange(false)
    } catch (error) {
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to create support ticket",
        richColors: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Website Support & Feedback</DialogTitle>
          <DialogDescription>Report website issues or share feedback to help us improve.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            {errors.name && <small className="text-red-500">{errors.name}</small>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            {errors.email && <small className="text-red-500">{errors.email}</small>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
              <SelectTrigger className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-2 text-sm">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className="max-w-full bg-white border border-gray-200">
                <SelectItem className="bg-transparent hover:bg-accent text-sm focus:bg-accent focus:text-white" value="bug_report">
                  Bug Report
                </SelectItem>
                <SelectItem className="bg-transparent hover:bg-accent text-sm focus:bg-accent focus:text-white" value="feature_request">
                  Feature Request
                </SelectItem>
                <SelectItem className="bg-transparent hover:bg-accent text-sm focus:bg-accent focus:text-white" value="general_feedback">
                  General Feedback
                </SelectItem>
                <SelectItem className="bg-transparent hover:bg-accent text-sm focus:bg-accent focus:text-white" value="menu_question">
                  Menu Question
                </SelectItem>
                <SelectItem className="bg-transparent hover:bg-accent text-sm focus:bg-accent focus:text-white" value="other">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <small className="text-red-500">{errors.category}</small>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input
              placeholder="e.g., Menu page not loading, Booking button broken"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
            {errors.subject && <small className="text-red-500">{errors.subject}</small>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Describe the website issue or feedback. Example: The menu button on the homepage doesn't open the menu page..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              required
              className="resize-none"
            />
            {errors.message && <small className="text-red-500">{errors.message}</small>}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/80 text-white">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Submitting..." : "Submit Website Feedback"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
