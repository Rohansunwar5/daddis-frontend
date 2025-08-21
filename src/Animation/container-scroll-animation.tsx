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

  const topTextOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0, 1])
  const topTextY = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [100, 50, 0])
  const topTextRotateX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [180, 90, 0])

  const centerTextOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0.3, 1, 1, 1])
  const centerTextScale = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [1.8, 1, 1, 1])
  const centerTextRotateX = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 0, 0, 0])

  const bottomTextOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0, 1])
  const bottomTextY = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [-100, -50, 0])
  const bottomTextRotateX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [-180, -90, 0])

  return (
    <div className="h-[60rem] md:h-[60rem] flex items-center justify-center relative p-2 pb-0" ref={containerRef}>
      <div
        className="py-10 pb-0 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <TextReveal
          topTextOpacity={topTextOpacity}
          topTextY={topTextY}
          topTextRotateX={topTextRotateX}
          centerTextOpacity={centerTextOpacity}
          centerTextScale={centerTextScale}
          centerTextRotateX={centerTextRotateX}
          bottomTextOpacity={bottomTextOpacity}
          bottomTextY={bottomTextY}
          bottomTextRotateX={bottomTextRotateX}
        />
      </div>
    </div>
  )
}

export const TextReveal = ({
  topTextOpacity,
  topTextY,
  topTextRotateX,
  centerTextOpacity,
  centerTextScale,
  centerTextRotateX,
  bottomTextOpacity,
  bottomTextY,
  bottomTextRotateX,
}: {
  topTextOpacity: MotionValue<number>
  topTextY: MotionValue<number>
  topTextRotateX: MotionValue<number>
  centerTextOpacity: MotionValue<number>
  centerTextScale: MotionValue<number>
  centerTextRotateX: MotionValue<number>
  bottomTextOpacity: MotionValue<number>
  bottomTextY: MotionValue<number>
  bottomTextRotateX: MotionValue<number>
}) => {
  return (
    <div className="max-w-5xl mx-auto text-center relative h-[600px] flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center space-y-4">
        {/* Top text: "Our" - positioned above products */}
        <motion.div
          style={{
            opacity: topTextOpacity,
            translateY: topTextY,
            rotateX: topTextRotateX,
            transformOrigin: "center bottom",
          }}
          className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight text-gray-900 dark:text-white uppercase whitespace-nowrap"
        >
          OUR
        </motion.div>

        {/* Center text: "products" - stays in center, only scales and fades */}
        <motion.div
          style={{
            opacity: centerTextOpacity,
            scale: centerTextScale,
            rotateX: centerTextRotateX,
            textShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
          className="text-7xl md:text-9xl lg:text-[10rem] font-bold text-gray-900 dark:text-white uppercase tracking-tight whitespace-nowrap"
        >
          PRODUCTS
        </motion.div>

        {/* Bottom text: "are loved by" - positioned below products */}
        <motion.div
          style={{
            opacity: bottomTextOpacity,
            translateY: bottomTextY,
            rotateX: bottomTextRotateX,
            transformOrigin: "center top",
          }}
          className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight text-gray-900 dark:text-white uppercase whitespace-nowrap"
        >
          ARE LOVED BY
        </motion.div>
      </div>
    </div>
  )
}
