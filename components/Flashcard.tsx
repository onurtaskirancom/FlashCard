'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Word } from '@/lib/words';

interface FlashcardProps {
  word: Word;
}

export default function Flashcard({ word }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="block w-full h-72 rounded-lg shadow-xl cursor-pointer"
      onClick={handleClick}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }} // Added transformStyle to main rotating div
    >
      {/* Front of the card */}
      <div
        className="absolute w-full h-full flex items-center justify-center bg-blue-700 text-white rounded-lg backface-hidden transition-colors duration-300 p-3 sm:p-4"
        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} // Added inline backface-visibility
      >
        <p className="text-base sm:text-2xl font-bold text-center break-words">{word.english}</p>
      </div>
      {/* Back of the card */}
      <motion.div
        className="absolute w-full h-full flex items-center justify-center bg-green-700 text-white rounded-lg backface-hidden transition-colors duration-300 p-3 sm:p-4"
        style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }} // Added inline backface-visibility
      >
        <p className="text-base sm:text-2xl font-bold text-center break-words">{word.turkish}</p>
      </motion.div>
    </motion.div>
  );
}
