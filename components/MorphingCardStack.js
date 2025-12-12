import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SWIPE_THRESHOLD = 50

export function MorphingCardStack({ cards = [], theme = 'dark', onCardClick }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse()
  }

  const getLayoutStyles = (stackPosition) => {
    return {
      top: stackPosition * 8,
      left: stackPosition * 8,
      zIndex: cards.length - stackPosition,
      rotate: (stackPosition - 1) * 2,
    }
  }

  const displayCards = getStackOrder()

  return (
    <div className="space-y-6 w-full max-w-lg mx-auto">
      {/* Cards Container */}
      <div className="relative h-56 w-full">
        <AnimatePresence mode="popLayout">
          {displayCards.map((card) => {
            const styles = getLayoutStyles(card.stackPosition)
            const isTopCard = card.stackPosition === 0

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  ...styles,
                }}
                exit={{ opacity: 0, scale: 0.8, x: -200 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                drag={isTopCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                onClick={() => {
                  if (isDragging) return
                  onCardClick?.(card)
                }}
                className={`absolute w-full rounded-2xl backdrop-blur-xl overflow-hidden group transition-all duration-700 shadow-lg ${
                  isTopCard ? "cursor-grab active:cursor-grabbing" : ""
                } ${
                  theme === 'dark' 
                    ? 'bg-[#1a1a1a]/95 border border-white/10 hover:border-[#C8FF5C]/50' 
                    : 'bg-white/95 border border-gray-200 hover:border-[#8ec438]/60 hover:shadow-xl'
                }`}
              >
                {/* Card Background with gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Card Content - Theme Aware */}
                <div className={`relative p-6 h-48 transition-colors duration-700`}>
                  <div className="flex items-center justify-between h-full">
                    {/* Left side - Icon and Label */}
                    <div className="flex flex-col justify-center flex-1">
                      {/* Icon */}
                      {card.icon && (
                        <div className="mb-3">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-gradient-to-br from-[#C8FF5C]/20 to-[#C8FF5C]/5 shadow-[#C8FF5C]/10'
                              : 'bg-gradient-to-br from-[#8ec438]/30 to-[#8ec438]/10 shadow-[#8ec438]/20'
                          }`}>
                            {card.icon}
                          </div>
                        </div>
                      )}
                      
                      {/* Label */}
                      <h3 className={`text-base font-bold mb-1 transition-colors duration-300 ${
                        theme === 'dark'
                          ? 'text-white/90 group-hover:text-[#C8FF5C]'
                          : 'text-gray-900 group-hover:text-[#8ec438]'
                      }`}>
                        {card.label}
                      </h3>
                      
                      {/* Description */}
                      {card.description && (
                        <p className={`text-xs line-clamp-2 pr-4 transition-colors duration-300 ${
                          theme === 'dark'
                            ? 'text-white/50 group-hover:text-white/70'
                            : 'text-gray-600 group-hover:text-gray-800'
                        }`}>
                          {card.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Right side - Value */}
                    <div className="flex-shrink-0 text-right">
                      <div className={`text-5xl font-black group-hover:scale-105 transition-all duration-300 ${
                        theme === 'dark'
                          ? 'text-[#C8FF5C]'
                          : 'text-[#8ec438]'
                      }`}>
                        {card.value}
                      </div>
                    </div>
                  </div>

                  {/* Swipe hint for top card */}
                  {isTopCard && (
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className={`text-[10px] transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white/30' : 'text-gray-400'
                      }`}>← Swipe →</span>
                    </div>
                  )}

                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-bl from-[#C8FF5C]/10 to-transparent'
                      : 'bg-gradient-to-bl from-[#8ec438]/15 to-transparent'
                  }`} />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Dots - Theme Aware */}
      {cards.length > 1 && (
        <div className="flex justify-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? theme === 'dark'
                    ? "w-6 bg-[#C8FF5C]"
                    : "w-6 bg-[#8ec438]"
                  : theme === 'dark'
                  ? "w-1.5 bg-white/20 hover:bg-white/40"
                  : "w-1.5 bg-gray-400 hover:bg-gray-500"
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
