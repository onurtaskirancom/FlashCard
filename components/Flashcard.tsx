"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Word } from "../lib/words";

interface FlashcardProps {
  word: Word;
}

const Flashcard: React.FC<FlashcardProps> = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-64 sm:h-72 md:h-80 perspective cursor-pointer group"
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of the card (English) */}
        <div className="absolute w-full h-full backface-hidden bg-sky-700 rounded-xl shadow-2xl flex flex-col items-center justify-center p-6 text-center">
          <p className="text-xs text-sky-200 mb-2">English ({word.level})</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {word.english}
          </h2>
        </div>

        {/* Back of the card (Turkish) */}
        <div className="absolute w-full h-full backface-hidden bg-teal-600 rounded-xl shadow-2xl flex flex-col items-center justify-center p-6 text-center rotate-y-180">
          <p className="text-xs text-teal-200 mb-2">Turkish</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {word.turkish}
          </h2>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
