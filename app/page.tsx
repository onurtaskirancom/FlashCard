"use client";

import { useState, useEffect, useCallback } from "react";
import { words, levelGroups, Word, LevelGroup } from "../lib/words";
import Flashcard from "../components/Flashcard";

export default function HomePage() {
  const [selectedLevelGroup, setSelectedLevelGroup] = useState<LevelGroup | null>(null);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [lastSeenWordId, setLastSeenWordId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from localStorage
  useEffect(() => {
    const storedLevelGroup = localStorage.getItem("flashcardLevelGroup") as LevelGroup | null;
    const storedLastSeenWordId = localStorage.getItem("flashcardLastSeenWordId");

    if (storedLevelGroup) {
      setSelectedLevelGroup(storedLevelGroup);
      const group = levelGroups.find(lg => lg.name === storedLevelGroup);
      if (group) {
        const filtered = words.filter(word => group.levels.includes(word.level));
        setCurrentWords(filtered);
        if (storedLastSeenWordId) {
          const lastWord = filtered.find(w => w.id === parseInt(storedLastSeenWordId));
          setCurrentWord(lastWord || filtered[0] || null);
          setLastSeenWordId(lastWord ? lastWord.id : null);
        } else if (filtered.length > 0) {
          setCurrentWord(filtered[0]);
          setLastSeenWordId(filtered[0].id);
          localStorage.setItem("flashcardLastSeenWordId", filtered[0].id.toString());
        }
      }
    }
    setIsLoading(false);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (selectedLevelGroup) {
      localStorage.setItem("flashcardLevelGroup", selectedLevelGroup);
    }
  }, [selectedLevelGroup]);

  useEffect(() => {
    if (currentWord) {
      localStorage.setItem("flashcardLastSeenWordId", currentWord.id.toString());
      setLastSeenWordId(currentWord.id);
    }
  }, [currentWord]);

  const handleLevelSelect = (levelGroup: LevelGroup) => {
    setSelectedLevelGroup(levelGroup);
    const group = levelGroups.find(lg => lg.name === levelGroup);
    if (group) {
      const filtered = words.filter(word => group.levels.includes(word.level));
      setCurrentWords(filtered);
      if (filtered.length > 0) {
        setCurrentWord(filtered[0]);
      } else {
        setCurrentWord(null);
      }
    }
  };

  const showNextWord = useCallback(() => {
    if (currentWords.length === 0) return;

    let availableWords = currentWords;
    if (lastSeenWordId !== null) {
      availableWords = currentWords.filter(word => word.id !== lastSeenWordId);
    }
    
    if (availableWords.length === 0) { // All words in current level seen, or only one word
        if (currentWords.length > 0) { // If there are words, pick one (even if it's the last seen)
            const randomIndex = Math.floor(Math.random() * currentWords.length);
            setCurrentWord(currentWords[randomIndex]);
        } else {
            setCurrentWord(null); // No words available
        }
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    setCurrentWord(availableWords[randomIndex]);
  }, [currentWords, lastSeenWordId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <p className="text-xl text-slate-50">Loading...</p>
      </div>
    );
  }

  if (!selectedLevelGroup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
        <h1 className="text-4xl font-bold text-slate-50 mb-8 text-center">Choose Your English Level</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
          {levelGroups.map((group) => (
            <button
              key={group.name}
              onClick={() => handleLevelSelect(group.name)}
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-colors duration-150 text-xl"
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-slate-900">
      <div className="w-full max-w-md">
        <button
            onClick={() => {
                localStorage.removeItem("flashcardLevelGroup");
                localStorage.removeItem("flashcardLastSeenWordId");
                setSelectedLevelGroup(null);
                setCurrentWord(null);
                setLastSeenWordId(null);
            }}
            className="absolute top-4 left-4 bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 text-sm"
        >
            Change Level
        </button>
        {currentWord ? (
          <Flashcard word={currentWord} />
        ) : (
          <div className="flex items-center justify-center h-64 bg-slate-800 rounded-xl shadow-2xl">
            <p className="text-xl text-slate-300">No words available for this level.</p>
          </div>
        )}
        {currentWords.length > 1 && currentWord && ( // Show next button only if there are multiple words
          <button
            onClick={showNextWord}
            className="mt-8 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-150 text-lg"
          >
            Next Word
          </button>
        )}
         {currentWords.length <= 1 && currentWord && (
             <p className="text-center mt-8 text-slate-400">This is the only word in this level group.</p>
         )}
      </div>
    </main>
  );
}
