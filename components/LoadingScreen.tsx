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

  const icons = [
    { icon: Code, color: 'text-purple-500' },
    { icon: Database, color: 'text-blue-500' },
    { icon: Layout, color: 'text-indigo-500' },
    { icon: Sparkles, color: 'text-violet-500' }
  ]

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  }

  const iconVariants = {
    initial: { y: 0, opacity: 0 },
    animate: {
      y: [-8, 0, -8],
      opacity: 1,
      transition: {
        y: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.2
        }
      }
    }
  }

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative flex flex-col items-center"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/20 dark:bg-purple-600/30 blur-3xl" />
              <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/20 dark:bg-blue-600/30 blur-3xl" />
              <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-600/20 dark:bg-violet-600/30 blur-3xl" />
            </div>

            <div className="flex gap-6 mb-8">
              {icons.map((Icon, index) => (
                <motion.div
                  key={index}
                  variants={iconVariants}
                  className={`${Icon.color}`}
                >
                  <Icon.icon size={32} />
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center"
              variants={{
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 }
              }}
            >
              <h2 className="text-2xl font-bold mb-4">{message}</h2>
              <div className="flex items-center justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-purple-600"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 