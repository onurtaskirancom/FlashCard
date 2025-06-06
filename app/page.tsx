"use client";

import { useState, useEffect, useCallback } from "react";
import { words, levelGroups, Word, LevelGroup } from "../lib/words";
import Flashcard from "../components/Flashcard";

// SRS Data Structures and Helpers
interface WordUserData {
  id: number;
  repetitions: number;
  interval: number; // in days
  easeFactor: number;
  reviewDate: string; // YYYY-MM-DD
}

const SRS_DATA_KEY = "flashcardSRSData";
const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

// Utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const getAllSrsData = (): Record<number, WordUserData> => {
  if (typeof window === "undefined") return {}; // Guard for SSR
  const data = localStorage.getItem(SRS_DATA_KEY);
  return data ? JSON.parse(data) : {};
};

const getSrsDataForWord = (wordId: number, allSrsData: Record<number, WordUserData>): WordUserData => {
  if (allSrsData[wordId]) {
    return allSrsData[wordId];
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    id: wordId,
    repetitions: 0,
    interval: 0, 
    easeFactor: DEFAULT_EASE_FACTOR,
    reviewDate: today.toISOString().split('T')[0],
  };
};

const saveSrsDataForWord = (wordId: number, srsData: WordUserData) => {
  if (typeof window === "undefined") return; 
  const allData = getAllSrsData();
  allData[wordId] = srsData;
  localStorage.setItem(SRS_DATA_KEY, JSON.stringify(allData));
};


export default function HomePage() {
  const [selectedLevelGroup, setSelectedLevelGroup] = useState<LevelGroup | null>(null);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allSrsWordData, setAllSrsWordData] = useState<Record<number, WordUserData>>({});


  useEffect(() => {
    const storedLevelGroup = localStorage.getItem("flashcardLevelGroup") as LevelGroup | null;
    const srsDataFromStorage = getAllSrsData();
    setAllSrsWordData(srsDataFromStorage);

    if (storedLevelGroup) {
      setSelectedLevelGroup(storedLevelGroup);
      const group = levelGroups.find(lg => lg.name === storedLevelGroup);
      if (group) {
        const filtered = words.filter(word => group.levels.includes(word.level));
        setCurrentWords(filtered);
        
        const updatedSrsData = { ...srsDataFromStorage };
        let changed = false;
        filtered.forEach(word => {
          if (!updatedSrsData[word.id]) {
            updatedSrsData[word.id] = getSrsDataForWord(word.id, updatedSrsData);
            changed = true;
          }
        });
        if (changed) {
          localStorage.setItem(SRS_DATA_KEY, JSON.stringify(updatedSrsData));
          setAllSrsWordData(updatedSrsData); 
        }
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && currentWords.length > 0) {
      showNextWord();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentWords, allSrsWordData]); 

  useEffect(() => {
    if (selectedLevelGroup) {
      localStorage.setItem("flashcardLevelGroup", selectedLevelGroup);
    }
  }, [selectedLevelGroup]);

  const handleLevelSelect = (levelGroup: LevelGroup) => {
    setSelectedLevelGroup(levelGroup);
    const group = levelGroups.find(lg => lg.name === levelGroup);
    if (group) {
      const filtered = words.filter(word => group.levels.includes(word.level));
      setCurrentWords(filtered);

      const srsDataFromStorage = getAllSrsData(); 
      const updatedSrsData = { ...srsDataFromStorage };
      let changed = false;
      filtered.forEach(word => {
        if (!updatedSrsData[word.id]) {
          updatedSrsData[word.id] = getSrsDataForWord(word.id, updatedSrsData);
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem(SRS_DATA_KEY, JSON.stringify(updatedSrsData));
      }
      setAllSrsWordData(updatedSrsData); 
    } else {
      setCurrentWords([]); 
      setCurrentWord(null);
    }
  };

  const showNextWord = useCallback(() => {
    if (currentWords.length === 0) {
      setCurrentWord(null);
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    // Ensure allSrsWordData is fully populated for currentWords before proceeding
    const srsDataForCurrentLevel = currentWords.map(word => 
        allSrsWordData[word.id] || getSrsDataForWord(word.id, allSrsWordData)
    );

    // Filter for words due today or earlier
    const dueWords = srsDataForCurrentLevel.filter(data => data.reviewDate <= todayStr);

    let wordToReview: WordUserData | null = null;

    if (dueWords.length > 0) {
      // Separate new words (interval 0) from other due words
      let newDueWords = dueWords.filter(w => w.interval === 0);
      const existingDueWords = dueWords.filter(w => w.interval > 0);

      // Shuffle new due words to ensure randomness for initial exposure
      if (newDueWords.length > 0) {
        newDueWords = shuffleArray(newDueWords);
      }
      
      // Sort existing due words by interval, then by review date
      existingDueWords.sort((a, b) => {
        if (a.interval !== b.interval) return a.interval - b.interval;
        return new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime();
      });
      
      // Prioritize existing due words, then new due words
      const sortedDueWords = [...existingDueWords, ...newDueWords];
      wordToReview = sortedDueWords[0];

    } else {
      // No words strictly due today. Pick from future words or completely new words not yet in SRS.
      // Sort all words: new (interval 0) first, then by earliest reviewDate.
      let futureWords = srsDataForCurrentLevel.sort((a,b) => {
        // Prioritize words with interval 0 (newly added, not yet seen even if reviewDate is today)
        if (a.interval === 0 && b.interval !== 0) return -1;
        if (b.interval === 0 && a.interval !== 0) return 1;
        // If both are new or both are not new, sort by reviewDate
        return new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime();
      });
      
      // If there are multiple "new" words (interval 0, reviewDate today), shuffle them.
      const firstFutureNewWordIndex = futureWords.findIndex(w => w.interval > 0 || w.reviewDate > todayStr);
      const newWordsPool = firstFutureNewWordIndex === -1 ? [...futureWords] : futureWords.slice(0, firstFutureNewWordIndex);
      const otherFutureWords = firstFutureNewWordIndex === -1 ? [] : futureWords.slice(firstFutureNewWordIndex);

      if (newWordsPool.length > 0) {
        const shuffledNewWords = shuffleArray(newWordsPool);
        futureWords = [...shuffledNewWords, ...otherFutureWords];
      }
      
      if(futureWords.length > 0) {
        wordToReview = futureWords[0];
      }
    }
    
    if (wordToReview) {
      const nextWord = currentWords.find(w => w.id === wordToReview!.id);
      setCurrentWord(nextWord || null);
    } else {
      setCurrentWord(null); 
    }
  }, [currentWords, allSrsWordData]);


  const handleWordReview = (wordId: number, quality: number) => { 
    console.log("handleWordReview called", wordId, quality);
    const srsData = JSON.parse(JSON.stringify(allSrsWordData[wordId] || getSrsDataForWord(wordId, allSrsWordData)));


    if (quality < 2) { 
      srsData.repetitions = 0;
      srsData.interval = 1; 
      if (quality === 0) srsData.interval = 0; 
    } else { 
      srsData.repetitions += 1;
      if (srsData.repetitions === 1) {
        srsData.interval = 1;
      } else if (srsData.repetitions === 2) {
        srsData.interval = 6; 
      } else {
        srsData.interval = Math.ceil(srsData.interval * srsData.easeFactor);
      }
    }

    let sm2_q = 0;
    if (quality === 0) sm2_q = 0; 
    else if (quality === 1) sm2_q = 1; 
    else if (quality === 2) sm2_q = 4; 
    else if (quality === 3) sm2_q = 5; 

    srsData.easeFactor = Math.max(MIN_EASE_FACTOR, srsData.easeFactor + (0.1 - (5 - sm2_q) * (0.08 + (5 - sm2_q) * 0.02)));

    const reviewDate = new Date();
    reviewDate.setHours(0,0,0,0);
    reviewDate.setDate(reviewDate.getDate() + 3); // Set review date 3 days in the future
    srsData.reviewDate = reviewDate.toISOString().split('T')[0];
    srsData.interval = Math.max(3, srsData.interval);

    saveSrsDataForWord(wordId, srsData);
    const updatedAllSrsData = { ...allSrsWordData, [wordId]: srsData };
    setAllSrsWordData(updatedAllSrsData);
    setCurrentWord(prev => prev ? {...prev} : null);
  };


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
                setSelectedLevelGroup(null);
                setCurrentWord(null);
                setCurrentWords([]); 
            }}
            className="absolute top-4 left-4 bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 text-sm"
        >
            Change Level
        </button>
        {currentWord ? (
          <Flashcard word={currentWord} />
        ) : (
          <div className="flex items-center justify-center h-64 bg-slate-800 rounded-xl shadow-2xl">
            <p className="text-xl text-slate-300">
              {currentWords.length > 0 ? "All words learned for now! Check back later." : "No words available for this level."}
            </p>
          </div>
        )}
        
        {currentWord && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button onClick={() => handleWordReview(currentWord.id, 0)} className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-3 rounded-lg">Again</button>
            <button onClick={() => handleWordReview(currentWord.id, 1)} className="bg-orange-500 hover:bg-orange-400 text-white font-medium py-2 px-3 rounded-lg">Hard</button>
            <button onClick={() => handleWordReview(currentWord.id, 2)} className="bg-yellow-500 hover:bg-yellow-400 text-white font-medium py-2 px-3 rounded-lg">Good</button>
            <button onClick={() => handleWordReview(currentWord.id, 3)} className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-3 rounded-lg">Easy</button>
          </div>
        )}
      </div>
    </main>
  );
}
