'use client';

import { useState, useEffect, useCallback } from 'react';
import Flashcard from '@/components/Flashcard';
import { words, Word } from '@/lib/words';

export default function HomePage() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [seenWordIds, setSeenWordIds] = useState<number[]>([]);
  const [allWordsSeen, setAllWordsSeen] = useState(false);
  const [isInitialLoadPending, setIsInitialLoadPending] = useState(true); // Added for initial load management

  const getNextWord = useCallback(() => {
    const unseenWords = words.filter((word) => !seenWordIds.includes(word.id));

    if (unseenWords.length === 0) {
      setAllWordsSeen(true);
      setCurrentWord(null); // Ensure currentWord is null when all words are seen
      return;
    }

    setAllWordsSeen(false); // Ensure this is set before picking a new word
    const randomIndex = Math.floor(Math.random() * unseenWords.length);
    const nextWord = unseenWords[randomIndex];
    setCurrentWord(nextWord);
    
    const newSeenWordIds = [...seenWordIds, nextWord.id];
    setSeenWordIds(newSeenWordIds);
    localStorage.setItem('seenFlashcardIds', JSON.stringify(newSeenWordIds));
  }, [seenWordIds]);

  // Load seen IDs from localStorage on mount
  useEffect(() => {
    const storedSeenIds = localStorage.getItem('seenFlashcardIds');
    if (storedSeenIds) {
      setSeenWordIds(JSON.parse(storedSeenIds));
    }
    setIsInitialLoadPending(false); // Mark initial load as complete
  }, []); // Runs once on mount

  // Effect to get the next word
  useEffect(() => {
    if (isInitialLoadPending) {
      return; // Wait for initial load of seenWordIds
    }

    // Define the core logic for getting the next word here to avoid useCallback complexities
    // leading to infinite loops when getNextWord is a dependency and also modifies its own deps.
    const fetchAndSetNextWord = () => {
      const unseenWords = words.filter((word) => !seenWordIds.includes(word.id));

      if (unseenWords.length === 0) {
        setAllWordsSeen(true);
        setCurrentWord(null);
        return;
      }

      setAllWordsSeen(false);
      const randomIndex = Math.floor(Math.random() * unseenWords.length);
      const nextWord = unseenWords[randomIndex];
      setCurrentWord(nextWord);
      
      const newSeenWordIds = [...seenWordIds, nextWord.id];
      setSeenWordIds(newSeenWordIds);
      localStorage.setItem('seenFlashcardIds', JSON.stringify(newSeenWordIds));
    };

    if (!currentWord && !allWordsSeen) {
      fetchAndSetNextWord();
    }
  }, [isInitialLoadPending, currentWord, allWordsSeen, seenWordIds]); // Depend on seenWordIds directly for this effect's logic


  const handleNextWord = () => {
    // getNextWord (the useCallback version) can still be used for explicit actions
    getNextWord();
  };
  
  const handleReset = () => {
    localStorage.setItem('seenFlashcardIds', JSON.stringify([]));
    setSeenWordIds([]);
    setAllWordsSeen(false);
    setCurrentWord(null); // Crucial: set currentWord to null to trigger the useEffect for fetching a new word
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-2 py-4 bg-white dark:bg-gray-800 text-black dark:text-gray-100 transition-colors duration-300">
      <div className="flex flex-col items-center w-full"> {/* Removed px-4 */}
        {allWordsSeen ? (
          <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-xl w-full"> {/* Ensured w-full */}
            <p className="text-2xl sm:text-3xl font-semibold mb-6">Tüm kelimeleri gördünüz!</p>
            <button
              onClick={handleReset}
              className="w-full px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-lg font-medium" // w-full for mobile
            >
              Baştan Başla
            </button>
          </div>
        ) : currentWord ? (
          <div className="flex flex-col items-center w-full"> {/* Wrapper for flashcard and button to ensure centering and full width */}
            <div className="w-full perspective"> {/* Added perspective class for 3D */}
              <Flashcard word={currentWord} />
            </div>
            <button
              onClick={handleNextWord}
              className="w-full mt-8 px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-lg font-medium" // w-full for mobile
            >
              Sonraki
            </button>
          </div>
        ) : (
          <p className="text-xl sm:text-2xl text-gray-400 dark:text-gray-500">Kelimeler yükleniyor...</p>
        )}
      </div>
    </main>
  );
}
