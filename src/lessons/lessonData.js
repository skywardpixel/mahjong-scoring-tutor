// Function to shuffle array and return new correct index
const shuffleOptions = (options, correctIndex) => {
  const correctAnswer = options[correctIndex];
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  const newCorrectIndex = shuffled.indexOf(correctAnswer);
  return { options: shuffled, correct: newCorrectIndex };
};

export const lessons = [
  {
    id: 1,
    title: "Introduction to Fu (符)",
    type: "concept",
    content: {
      text: "Fu are base points that measure how 'difficult' your winning hand is to form. Every hand starts with a base fu value.",
      visual: "Fu = Base Points",
      keyPoint:
        "Basic ron hand = 20 base + 10 ron = 30 fu. Basic tsumo hand = 20 base + 2 tsumo = 22→30 fu",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["20 fu", "30 fu", "40 fu"],
        1,
      );
      return {
        question: "What is the minimum fu for any winning hand?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 2,
    title: "Fu Rounding Rules",
    type: "concept",
    content: {
      text: "Fu is always rounded UP to the nearest 10. This is a fundamental rule in mahjong scoring.",
      visual: "24 fu → 30 fu\n32 fu → 40 fu\n38 fu → 40 fu",
      keyPoint: "Fu ALWAYS rounds up: 21-30→30, 31-40→40, 41-50→50",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["26 fu", "30 fu", "20 fu"],
        1,
      );
      return {
        question: "If you calculate 26 fu total, what is your final fu score?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 3,
    title: "Basic Fu Calculation",
    type: "concept",
    content: {
      text: "All hands start with 20 fu base, then add fu for win condition and special elements:",
      visual:
        "🀇🀈🀉 🀊🀋🀌 🀍🀎🀏 🀐🀑🀒 🀀🀀\nExample hand: 4 sequences + wind pair\nWin by tsumo",
      keyPoint: "Ron = +10 fu, Tsumo = +2 fu, Honor pairs = +2 fu",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["24 fu", "22 fu", "30 fu"],
        2,
      );
      return {
        question: "With the hand shown above, winning by tsumo, how much fu?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 4,
    title: "Introduction to Han (翻)",
    type: "concept",
    content: {
      text: "Han come from yaku - special patterns in your hand. Each yaku is worth a certain number of han.",
      visual: "Yaku = Han",
      keyPoint: "You need at least 1 han to win (no yaku = no win)",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["Yes", "No", "Only with tsumo"],
        1,
      );
      return {
        question: "Can you win a hand with 0 han?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 5,
    title: "Common 1-Han Yaku",
    type: "concept",
    content: {
      text: "Let's learn the most common 1-han yaku:",
      visual: "Riichi = 1 han\nTsumo = 1 han",
      keyPoint: "Riichi + Tsumo = 2 han total!",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["1 han", "3 han", "2 han"],
        2,
      );
      return {
        question: "You declare riichi and win by tsumo. How many han?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 6,
    title: "The Scoring Formula",
    type: "concept",
    content: {
      text: "Your base score is calculated with this formula:",
      visual: "Fu × 2^Han = Base Score",
      keyPoint: "30 fu × 2¹ han = 60 base points",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["60 points", "240 points", "120 points"],
        2,
      );
      return {
        question: "What's the base score for 30 fu, 2 han?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 7,
    title: "Point Transfer (Ron)",
    type: "practice",
    content: {
      text: "When you win by ron (someone else's discard), the player who discarded pays you:",
      visual: "Non-dealer: Base × 4\nDealer: Base × 6",
      keyPoint: "60 base × 4 = 240 points from the discarder",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["360 points", "240 points", "480 points"],
        1,
      );
      return {
        question:
          "You're non-dealer with 60 base points. A non-dealer discards your winning tile. How much do you get?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 8,
    title: "Point Transfer (Tsumo)",
    type: "practice",
    content: {
      text: "When you win by tsumo (self-draw), all other players pay you:",
      visual:
        "Non-dealer tsumo:\nDealer pays: Base × 2\nNon-dealers pay: Base × 1",
      keyPoint:
        "60 base = 120 from dealer + 60 + 60 from non-dealers = 240 total",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["60 points", "240 points", "120 points"],
        2,
      );
      return {
        question:
          "You're non-dealer, 60 base points, tsumo win. What does the dealer pay you?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 9,
    title: "Fu Practice: Triplets",
    type: "practice",
    content: {
      text: "Triplet fu depends on how you form them and what tiles they contain:",
      visual:
        "🀇🀇 → Draw 🀇 by tsumo\nConcealed terminal triplet\n\nFu Values:\nConcealed simple triplet: +4 fu\nOpen simple triplet: +2 fu\nConcealed terminal/honor: +8 fu\nOpen terminal/honor: +4 fu",
      keyPoint:
        "Terminal/honor triplets give double fu. Concealed gives double fu vs open.",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["+4 fu", "+2 fu", "+8 fu"],
        2,
      );
      return {
        question:
          "With the example shown above (terminal triplet completed by tsumo), how much fu?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 10,
    title: "Fu Practice: Waiting Patterns",
    type: "practice",
    content: {
      text: "How you wait for your winning tile affects fu:",
      visual:
        "🀐🀑 + 🀒 = Edge wait (+2 fu)\nWaiting for 3-sou to complete sequence\n\nWait Types:\nEdge wait (12→3 or 89→7): +2 fu\nClosed wait (13→2): +2 fu\nPair wait: +2 fu\nOpen wait (23→1 or 4): +0 fu",
      keyPoint: "Open wait (23 waiting for 1 or 4) = +0 fu",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["+0 fu", "+4 fu", "+2 fu"],
        2,
      );
      return {
        question: "For the edge wait example shown above, how much fu?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 11,
    title: "Practice: Complete Calculation",
    type: "practice",
    content: {
      text: "Let's calculate a complete hand step by step:",
      visual: "🀇🀈🀉 🀊🀋🀌 🀍🀎🀏 🀐🀑🀒 🀀🀀\nRiichi + Tsumo + Wind pair",
      keyPoint:
        "20 base + 2 tsumo + 2 wind pair = 24 fu → rounds to 30 fu, 2 han",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["120 points", "128 points", "64 points"],
        0,
      );
      return {
        question: "24 fu rounds to 30 fu. 30 fu × 2² han = ? base points",
        options,
        correct,
      };
    })(),
  },
  {
    id: 12,
    title: "Practice: Point Transfer Calculation",
    type: "practice",
    content: {
      text: "From the previous hand (120 base points, non-dealer tsumo):",
      visual:
        "Dealer pays: 120 × 2 = 240\nEach non-dealer: 120 × 1 = 120\nTotal received: 240 + 120 + 120 = 480",
      keyPoint:
        "In theory: calculate exact amounts using the formula (real games use payment tables)",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["480 points", "600 points", "700 points"],
        0,
      );
      return {
        question:
          "Using the theoretical formula, how much do you receive total?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 13,
    title: "The Riichi Declaration",
    type: "concept",
    content: {
      text: "Riichi is a special declaration that costs 1000 points from your stick total:",
      visual: "Declare Riichi → Pay 1000 points → Get +1 han if you win",
      keyPoint:
        "Riichi fee goes to the center, winner takes all riichi sticks on table",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["1000 points", "500 points", "1500 points"],
        0,
      );
      return {
        question: "How much does it cost to declare riichi?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 14,
    title: "Riichi Stick Collection",
    type: "concept",
    content: {
      text: "When someone wins, they collect ALL riichi sticks on the table:",
      visual:
        "3 players declared riichi → Winner gets 3000 points in riichi sticks",
      keyPoint:
        "Riichi sticks are separate from hand scoring - they're bonus points",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["2000 points", "1000 points", "3000 points"],
        0,
      );
      return {
        question:
          "If 2 players declared riichi and you win, how many bonus points do you get?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 15,
    title: "Theory vs Reality: Payment Tables",
    type: "concept",
    content: {
      text: "Real mahjong games use standardized payment tables instead of pure mathematical calculations. The formula teaches you the principles, but games like Majsoul use predetermined values:",
      visual:
        "Formula Result vs Standard Table:\n30fu/1han: 240→300 vs 1000 points\n30fu/2han: 480→500 vs 2000 points\n30fu/3han: 960→1000 vs 3900 points",
      keyPoint:
        "Search 'Japanese Mahjong Scoring Table' online to find the complete payment charts used in tournaments and digital games!",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["1000 points", "300 points", "240 points"],
        0,
      );
      return {
        question:
          "In Majsoul, what does a 30 fu, 1 han non-dealer ron actually pay?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 16,
    title: "Complete Scoring with Riichi",
    type: "practice",
    content: {
      text: "Let's calculate a complete riichi win step by step:",
      visual:
        "🀈🀈🀈 🀉🀉🀉 🀋🀋🀋 🀆🀆🀆 🀄🀄\nWin tile: 🀄 (ron from discard)\nFu: 20 base + 10 ron + 4+4+4 triplets + 8 white + 2 pair = 52 → 60\nHan: 4 (riichi + white dragon + all triplets)\nBase: 60 × 2⁴ = 60 × 16 = 960\nRon payment: 960 × 4 = 3840\nRiichi sticks: 2 × 1000 = 2000\nTotal: 3840 + 2000 = 5840",
      keyPoint:
        "Always calculate: fu × 2^han = base, then apply payment multiplier, then add riichi bonuses",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["5840 points", "3840 points", "4840 points"],
        0,
      );
      return {
        question:
          "60 fu, 4 han, non-dealer ron, 2 riichi sticks. Total points received?",
        options,
        correct,
      };
    })(),
  },
];

export const getLessonById = (id) => {
  return lessons.find((lesson) => lesson.id === id);
};

export const getNextLesson = (currentId) => {
  const nextId = currentId + 1;
  return currentId < 1 || nextId > 16
    ? undefined
    : lessons.find((lesson) => lesson.id === nextId);
};

export const getPreviousLesson = (currentId) => {
  const prevId = currentId - 1;
  return currentId > 16 || prevId < 1
    ? undefined
    : lessons.find((lesson) => lesson.id === prevId);
};
