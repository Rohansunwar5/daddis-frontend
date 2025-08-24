"use client"
import type React from "react"
import { useRef } from "react"
import { useScroll, useTransform, motion, type MotionValue } from "motion/react"

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  // PRODUCTS text - starts zoomed in with low opacity, longer animation
  const centerTextScale = useTransform(scrollYProgress, [0, 0.4, 0.7], [4, 1.2, 1])
  const centerTextOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.3, 0.8, 1])

  // OUR text - appears after PRODUCTS is visible, slower reveal
  const topTextOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 0.8, 1])
  const topTextScale = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0.8, 0.95, 1])

  // ARE LOVED BY text - appears after PRODUCTS is visible, slower reveal
  const bottomTextOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 0.8, 1])
  const bottomTextScale = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0.8, 0.95, 1])

  return (
    <div className="h-[80rem] relative" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <TextReveal
          topTextOpacity={topTextOpacity}
          topTextScale={topTextScale}
          centerTextOpacity={centerTextOpacity}
          centerTextScale={centerTextScale}
          bottomTextOpacity={bottomTextOpacity}
          bottomTextScale={bottomTextScale}
        />
      </div>
    </div>
  )
}

export const TextReveal = ({
  topTextOpacity,
  topTextScale,
  centerTextOpacity,
  centerTextScale,
  bottomTextOpacity,
  bottomTextScale,
}: {
  topTextOpacity: MotionValue<number>
  topTextScale: MotionValue<number>
  centerTextOpacity: MotionValue<number>
  centerTextScale: MotionValue<number>
  bottomTextOpacity: MotionValue<number>
  bottomTextScale: MotionValue<number>
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Top text: "OUR" - positioned above PRODUCTS, no movement */}
      <motion.div
        style={{
          opacity: topTextOpacity,
          scale: topTextScale,
          transformOrigin: "center",
        }}
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-gray-900 dark:text-white uppercase whitespace-nowrap"
      >
        OUR
      </motion.div>

      {/* Center text: "PRODUCTS" - always in the exact center */}
      <motion.div
        style={{
          opacity: centerTextOpacity,
          scale: centerTextScale,
          transformOrigin: "center",
          textShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
        className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white uppercase tracking-tight whitespace-nowrap"
      >
        PRODUCTS
      </motion.div>

      {/* Bottom text: "ARE LOVED BY" - positioned below PRODUCTS, no movement */}
      <motion.div
        style={{
          opacity: bottomTextOpacity,
          scale: bottomTextScale,
          transformOrigin: "center",
        }}
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-gray-900 dark:text-white uppercase whitespace-nowrap"
      >
        ARE LOVED BY
      </motion.div>
    </div>
  )
}

// Demo component to show the animation
export default function Demo() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Scroll down to see the animation
        </h1>
      </div>
      
      <ContainerScroll titleComponent="">
        <div></div>
      </ContainerScroll>
      
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Animation complete - continue scrolling
        </h1>
      </div>
    </div>
  )
}