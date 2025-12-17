"use client"

import "keen-slider/keen-slider.min.css"
import React from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { Card, CardBody, CardFooter, Divider, Button } from "@heroui/react"
import { KeenSliderInstance, KeenSliderPlugin, useKeenSlider } from "keen-slider/react"
import { testimonials } from "@/data/testimonials"

const AutoSlider: KeenSliderPlugin = (slider: KeenSliderInstance) => {
  let timeout: ReturnType<typeof setTimeout>
  let mouseOver = false

  const clearNextTimeout = () => clearTimeout(timeout)

  const nextTimeout = () => {
    clearTimeout(timeout)
    if (mouseOver) return
    timeout = setTimeout(() => {
      slider.next()
    }, 2500)
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true
      clearNextTimeout()
    })
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false
      nextTimeout()
    })
    nextTimeout()
  })

  slider.on("dragStarted", clearNextTimeout)
  slider.on("animationEnded", nextTimeout)
  slider.on("updated", nextTimeout)
}

const Cards = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
    },
    [AutoSlider],
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="max-w-lg">
          <h1 className="text-4xl text-primary font-bold mb-6">What Clients Say About Our Exceptional Service</h1>
        </div>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="keen-slider__slide">
            <Card className="bg-gray-100 px-4 shadow-none flex flex-col justify-between py-4">
              <CardBody className="flex-1 py-4">
                <p className="text-lg leading-relaxed font-medium">"{testimonial.message}"</p>
              </CardBody>

              <CardFooter className="">
                <div className="w-full">
                  <Divider className="my-4" />
                  <h4 className="font-semibold text-gray-900 uppercase text-2xl">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500">{testimonial.position}</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex mt-6 gap-2">
        <Button size="lg" variant="bordered" className="rounded-full border-2 border-gray-400" isIconOnly onPress={() => instanceRef.current?.prev()}>
          <LuChevronLeft size={18} />
        </Button>
        <Button size="lg" variant="bordered" className="rounded-full border-2 border-gray-400" isIconOnly onPress={() => instanceRef.current?.next()}>
          <LuChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

export default Cards
