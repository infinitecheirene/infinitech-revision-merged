"use client"
import React from "react"
import Cards from "./cards"
import Reviews from "./reviews"
import { Divider } from "@heroui/react"
import TestimonialForm from "./testimonialsForm"
import { poetsen_one } from "@/config/fonts"

const Testimonials = () => {
  return (
    <section>
      <div className="max-w-2xl mt-24 mx-auto text-center">
        <h1 className={`text-5xl text-accent ${poetsen_one.className}`}>TESTIMONIALS</h1>
        <h1 className={`text-4xl text-primary ${poetsen_one.className}`}>We help to achieve customers business goals</h1>
      </div>
      <div className="container mx-auto px-4 py-12">
        <Cards />
        <TestimonialForm />
        <Divider className="my-12" />
        <Reviews />
      </div>
    </section>
  )
}

export default Testimonials
