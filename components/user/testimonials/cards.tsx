"use client"

import "keen-slider/keen-slider.min.css"
import React from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { poetsen_one } from "@/config/fonts"
import { Card, CardBody, CardFooter, Divider, Button } from "@heroui/react"
import { useKeenSlider, KeenSliderInstance, KeenSliderPlugin } from "keen-slider/react"
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
      slides: {
        perView: 1,
        spacing: 15,
      },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 2, spacing: 16 } },
        "(max-width: 768px)": {
          slides: {
            perView: 1,
            spacing: 10,
          },
        },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
      },
    },
    [AutoSlider],
  )

  return (
    <div className="flex flex-col justify-between w-full">
      {/* Slider */}
      <div className="flex flex-col justify-between gap-4">
        <div ref={sliderRef} className="keen-slider mt-8 sm:mt-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="keen-slider__slide flex justify-center px-2 sm:px-4 cursor-pointer">
              <Card className="bg-gray-100 shadow-none flex flex-col justify-between py-6 sm:py-10 w-full max-w-md sm:max-w-lg">
                <CardBody className="flex-1 px-4 sm:px-6 py-4">
                  <p className="text-base sm:text-lg leading-relaxed">"{testimonial.message}"</p>
                </CardBody>

                <CardFooter className="px-4 sm:px-6 pb-4">
                  <div className="w-full text-center sm:text-left">
                    <Divider className="my-4" />
                    <h4 className="font-semibold text-gray-900 uppercase text-xl sm:text-2xl">{testimonial.name}</h4>
                    <span className="text-xs sm:text-sm text-gray-500">{testimonial.position}</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-2 my-6 sm:my-8 mx-auto">
        <Button size="md" variant="bordered" className="rounded-full border-2 border-gray-400" isIconOnly onPress={() => instanceRef.current?.prev()}>
          <LuChevronLeft size={18} />
        </Button>
        <Button size="md" variant="bordered" className="rounded-full border-2 border-gray-400" isIconOnly onPress={() => instanceRef.current?.next()}>
          <LuChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

export default Cards
