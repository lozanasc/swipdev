'use client'

import { useEffect, useState } from 'react'
import { Code, Database, Layout, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Icons that will juggle
  const icons = [
    { icon: Code, color: 'text-purple-500' },
    { icon: Database, color: 'text-blue-500' },
    { icon: Layout, color: 'text-indigo-500' },
    { icon: Sparkles, color: 'text-violet-500' }
  ]

  // Animation variants
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const iconVariants = {
    initial: { y: 0 },
    animate: {
      y: [-20, 0, -20],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <AnimatePresence>
        {mounted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="absolute inset-0 overflow-hidden -z-10">
              <div id="gradient-1" className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/20 dark:bg-purple-600/30 blur-3xl" />
              <div id="gradient-2" className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/20 dark:bg-blue-600/30 blur-3xl" />
              <div id="gradient-3" className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/20 dark:bg-violet-600/30 blur-3xl" />
            </div>

            <motion.div
              className="flex gap-4 mb-8"
              variants={containerVariants}
              animate="animate"
            >
              {icons.map((Icon, index) => (
                <motion.div
                  key={index}
                  variants={iconVariants}
                  className={`${Icon.color}`}
                >
                  <Icon.icon className="w-8 h-8" />
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{message}</h2>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-purple-600"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-blue-600"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-violet-600"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{message}</h2>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
} 