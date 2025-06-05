export interface Word {
  id: number;
  english: string;
  turkish: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export const words: Word[] = [
  // A1 Level
  { id: 1, english: "Hello", turkish: "Merhaba", level: "A1" },
  { id: 2, english: "Goodbye", turkish: "Hoşça kal", level: "A1" },
  { id: 3, english: "Yes", turkish: "Evet", level: "A1" },
  { id: 4, english: "No", turkish: "Hayır", level: "A1" },
  { id: 5, english: "Thank you", turkish: "Teşekkür ederim", level: "A1" },
  { id: 6, english: "Please", turkish: "Lütfen", level: "A1" },
  { id: 7, english: "Water", turkish: "Su", level: "A1" },
  { id: 8, english: "Food", turkish: "Yemek", level: "A1" },
  { id: 9, english: "House", turkish: "Ev", level: "A1" },
  { id: 10, english: "Cat", turkish: "Kedi", level: "A1" },
  { id: 11, english: "Dog", turkish: "Köpek", level: "A1" },
  { id: 12, english: "Book", turkish: "Kitap", level: "A1" },
  { id: 13, english: "School", turkish: "Okul", level: "A1" },
  { id: 14, english: "Car", turkish: "Araba", level: "A1" },
  { id: 15, english: "Big", turkish: "Büyük", level: "A1" },

  // A2 Level
  { id: 16, english: "Friend", turkish: "Arkadaş", level: "A2" },
  { id: 17, english: "Family", turkish: "Aile", level: "A2" },
  { id: 18, english: "Happy", turkish: "Mutlu", level: "A2" },
  { id: 19, english: "Sad", turkish: "Üzgün", level: "A2" },
  { id: 20, english: "Work", turkish: "Çalışmak / İş", level: "A2" },
  { id: 21, english: "Play", turkish: "Oynamak", level: "A2" },
  { id: 22, english: "Today", turkish: "Bugün", level: "A2" },
  { id: 23, english: "Tomorrow", turkish: "Yarın", level: "A2" },
  { id: 24, english: "Yesterday", turkish: "Dün", level: "A2" },
  { id: 25, english: "Morning", turkish: "Sabah", level: "A2" },
  { id: 26, english: "Night", turkish: "Gece", level: "A2" },
  { id: 27, english: "Always", turkish: "Her zaman", level: "A2" },
  { id: 28, english: "Sometimes", turkish: "Bazen", level: "A2" },
  { id: 29, english: "Never", turkish: "Asla", level: "A2" },
  { id: 30, english: "Weather", turkish: "Hava durumu", level: "A2" },

  // B1 Level
  { id: 31, english: "Understand", turkish: "Anlamak", level: "B1" },
  { id: 32, english: "Believe", turkish: "İnanmak", level: "B1" },
  { id: 33, english: "Important", turkish: "Önemli", level: "B1" },
  { id: 34, english: "Difficult", turkish: "Zor", level: "B1" },
  { id: 35, english: "Easy", turkish: "Kolay", level: "B1" },
  { id: 36, english: "Travel", turkish: "Seyahat etmek", level: "B1" },
  { id: 37, english: "Language", turkish: "Dil", level: "B1" },
  { id: 38, english: "Culture", turkish: "Kültür", level: "B1" },
  { id: 39, english: "Future", turkish: "Gelecek", level: "B1" },
  { id: 40, english: "Past", turkish: "Geçmiş", level: "B1" },
  { id: 41, english: "Present", turkish: "Şimdi / Hediye", level: "B1" },
  { id: 42, english: "Experience", turkish: "Deneyim", level: "B1" },
  { id: 43, english: "Knowledge", turkish: "Bilgi", level: "B1" },
  { id: 44, english: "Opinion", turkish: "Fikir", level: "B1" },
  { id: 45, english: "Problem", turkish: "Sorun", level: "B1" },

  // B2 Level
  { id: 46, english: "Achieve", turkish: "Başarmak", level: "B2" },
  { id: 47, english: "Challenge", turkish: "Meydan okuma / Zorluk", level: "B2" },
  { id: 48, english: "Opportunity", turkish: "Fırsat", level: "B2" },
  { id: 49, english: "Environment", turkish: "Çevre", level: "B2" },
  { id: 50, english: "Society", turkish: "Toplum", level: "B2" },
  { id: 51, english: "Government", turkish: "Hükümet", level: "B2" },
  { id: 52, english: "Responsibility", turkish: "Sorumluluk", level: "B2" },
  { id: 53, english: "Communication", turkish: "İletişim", level: "B2" },
  { id: 54, english: "Development", turkish: "Gelişim", level: "B2" },
  { id: 55, english: "Research", turkish: "Araştırma", level: "B2" },
  { id: 56, english: "Technology", turkish: "Teknoloji", level: "B2" },
  { id: 57, english: "Influence", turkish: "Etki", level: "B2" },
  { id: 58, english: "Benefit", turkish: "Fayda", level: "B2" },
  { id: 59, english: "Disadvantage", turkish: "Dezavantaj", level: "B2" },
  { id: 60, english: "Improve", turkish: "Geliştirmek", level: "B2" },

  // C1 Level
  { id: 61, english: "Sophisticated", turkish: "Sofistike / Gelişmiş", level: "C1" },
  { id: 62, english: "Eloquent", turkish: "Etkili ve güzel konuşan", level: "C1" },
  { id: 63, english: "Ubiquitous", turkish: "Her yerde bulunan", level: "C1" },
  { id: 64, english: "Ephemeral", turkish: "Kısa ömürlü / Geçici", level: "C1" },
  { id: 65, english: "Meticulous", turkish: "Titiz / Kılı kırk yaran", level: "C1" },
  { id: 66, english: "Ambiguous", turkish: "Belirsiz / Muğlak", level: "C1" },
  { id: 67, english: "Conscious", turkish: "Bilinçli", level: "C1" },
  { id: 68, english: "Perspective", turkish: "Bakış açısı", level: "C1" },
  { id: 69, english: "Analyze", turkish: "Analiz etmek", level: "C1" },
  { id: 70, english: "Synthesize", turkish: "Sentezlemek", level: "C1" },
  { id: 71, english: "Critique", turkish: "Eleştiri / Eleştirmek", level: "C1" },
  { id: 72, english: "Nuance", turkish: "Nüans / İnce ayrım", level: "C1" },
  { id: 73, english: "Paradigm", turkish: "Paradigma / Model", level: "C1" },
  { id: 74, english: "Hypothesis", turkish: "Hipotez / Varsayım", level: "C1" },
  { id: 75, english: "Intrinsic", turkish: "İçsel / Asıl", level: "C1" },

  // C2 Level
  { id: 76, english: "Erudite", turkish: "Alim / Çok bilgili", level: "C2" },
  { id: 77, english: "Ineffable", turkish: "Tarifsiz / Kelimelerle anlatılamaz", level: "C2" },
  { id: 78, english: "Perspicacious", turkish: "Anlayışlı / Zeki", level: "C2" },
  { id: 79, english: "Serendipity", turkish: "Beklenmedik hoş tesadüf", level: "C2" },
  { id: 80, english: "Quintessential", turkish: "En mükemmel örnek / Öz", level: "C2" },
  { id: 81, english: "Lackadaisical", turkish: "Gevşek / Kayıtsız", level: "C2" },
  { id: 82, english: "Obfuscate", turkish: "Kafa karıştırmak / Anlaşılmaz hale getirmek", level: "C2" },
  { id: 83, english: "Profound", turkish: "Derin / Engin", level: "C2" },
  { id: 84, english: "Exacerbate", turkish: "Kötüleştirmek / Şiddetlendirmek", level: "C2" },
  { id: 85, english: "Mitigate", turkish: "Hafifletmek / Azaltmak", level: "C2" },
  { id: 86, english: "Juxtaposition", turkish: "Yan yana koyma / Karşılaştırma", level: "C2" },
  { id: 87, english: "Egalitarian", turkish: "Eşitlikçi", level: "C2" },
  { id: 88, english: "Pragmatic", turkish: "Pratik / Faydacı", level: "C2" },
  { id: 89, english: "Sycophant", turkish: "Dalkavuk", level: "C2" },
  { id: 90, english: "Vicarious", turkish: "Başkası adına yaşanan / Dolaylı", level: "C2" }
];

export type LevelGroup = "A1-A2" | "B1-B2" | "C1-C2";

export const levelGroups: { name: LevelGroup; levels: (Word["level"])[] }[] = [
  { name: "A1-A2", levels: ["A1", "A2"] },
  { name: "B1-B2", levels: ["B1", "B2"] },
  { name: "C1-C2", levels: ["C1", "C2"] },
];
