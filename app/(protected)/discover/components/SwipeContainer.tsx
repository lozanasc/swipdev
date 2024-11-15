'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMatchStore } from '@/store/matchStore'
import DeveloperCard from './DeveloperCard'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

const SwipeContainer = () => {
  const { 
    potentialDevelopers, 
    currentDeveloper,
    swipeLeft, 
    swipeRight,
    setCurrentDeveloper 
  } = useMatchStore()
  
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentDeveloper) return

    setDirection(direction)
    
    if (direction === 'left') {
      swipeLeft(currentDeveloper.id)
    } else {
      swipeRight(currentDeveloper.id)
    }

    // Set next developer after animation
    setTimeout(() => {
      setCurrentDeveloper(potentialDevelopers[0] || null)
      setDirection(null)
    }, 300)
  }

  if (!currentDeveloper) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px]">
        <h2 className="text-2xl font-bold mb-4">No more developers</h2>
        <p className="text-gray-500">Check back later for more matches</p>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px]">
      <AnimatePresence>
        <motion.div
          key={currentDeveloper.id}
          initial={{ scale: 1 }}
          animate={{
            scale: 1,
            x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
            opacity: direction ? 0 : 1,
            rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-full"
        >
          <DeveloperCard developer={currentDeveloper} />
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={() => handleSwipe('left')}
          className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full 
                   text-red-600 hover:bg-red-200 dark:hover:bg-red-900/30"
        >
          <ThumbsDown className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full 
                   text-green-600 hover:bg-green-200 dark:hover:bg-green-900/30"
        >
          <ThumbsUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default SwipeContainer 