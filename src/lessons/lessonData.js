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
  {
    id: 17,
    title: "Introduction to Dora",
    type: "concept",
    content: {
      text: "Dora are bonus tiles that add han to your hand. They are determined by indicator tiles revealed on the table.",
      visual:
        "Dora Indicator: 🀈 (2-man)\nDora Tile: 🀉 (3-man)\n\nIf your hand contains 🀉, you get +1 han per tile",
      keyPoint:
        "Dora indicator shows what comes BEFORE the dora. 2-man indicator = 3-man is dora. Dora adds han, not fu.",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["Fu points", "Han points", "Base points"],
        1,
      );
      return {
        question: "What do dora tiles add to your hand?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 18,
    title: "Dora Indicator Rules",
    type: "concept",
    content: {
      text: "The dora indicator tells you which tile is dora. The actual dora is the NEXT tile in sequence.",
      visual:
        "Indicators → Dora:\n🀇→🀈, 🀈→🀉, 🀉→🀊 (Man sequence)\n🀙→🀚, 🀚→🀛, 🀛→🀜 (Pin sequence)\n🀐→🀑, 🀑→🀒, 🀒→🀓 (Sou sequence)\n🀏→🀇, 🀡→🀙, 🀘→🀐 (9 wraps to 1)\n🀀→🀁→🀂→🀃→🀀 (Wind cycle)\n🀅→🀆→🀄→🀅 (Dragon cycle)",
      keyPoint:
        "Sequences wrap around: 9→1, North→East, Red→Green. Each dora tile in your hand = +1 han.",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["🀇 (1-man)", "🀉 (3-man)", "🀏 (9-man)"],
        1,
      );
      return {
        question: "If the dora indicator is 🀈 (2-man), which tile is dora?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 19,
    title: "Counting Dora in Your Hand",
    type: "practice",
    content: {
      text: "Count each dora tile in your hand individually. Multiple copies = multiple han.",
      visual:
        "Hand: 🀉🀉🀉 🀊🀋🀌 🀍🀎🀏 🀚🀛🀜 🀀🀀\nDora indicator: 🀈 (so 🀉 is dora)\nDora count: 3 tiles × 1 han each = +3 han total",
      keyPoint:
        "Each individual dora tile adds 1 han. Triplet of dora = +3 han, pair of dora = +2 han.",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["+2 han", "+4 han", "+1 han"],
        0,
      );
      return {
        question:
          "Your hand has two 5-pin tiles and the dora indicator shows 4-pin. How many han from dora?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 20,
    title: "Advanced Dora Types",
    type: "concept",
    content: {
      text: "There are several types of dora beyond the basic dora indicator:",
      visual:
        "Dora Types:\n• Regular Dora: From dora indicator\n• Ura Dora: Hidden bonus (riichi only)\n• Kan Dora: Extra indicators from kan calls\n• Red Dora: Special red 5-tiles (some rules)\n\nExample: 2 regular + 1 ura + 1 kan = +4 han total",
      keyPoint:
        "Ura dora only applies if you declared riichi. Kan dora adds new indicators. All dora types stack together.",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        [
          "Only if you win by tsumo",
          "Only if you declared riichi",
          "Always available",
        ],
        1,
      );
      return {
        question: "When can you count ura dora han?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 21,
    title: "Ura Dora Mechanics",
    type: "concept",
    content: {
      text: "Ura dora are hidden bonus dora that only apply when you win with riichi. They are revealed from underneath the regular dora indicators.",
      visual:
        "Regular dora: 🀈 (visible) → 🀉 is dora\nUra dora: 🀛 (hidden under 🀈) → 🀜 is ura dora\n\nRiichi + Win = Check ura dora\nNo Riichi = No ura dora (even if you win)",
      keyPoint:
        "Ura dora only applies to riichi winners. Each ura dora tile in your hand = +1 han, just like regular dora.",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        [
          "Yes, always",
          "Only if you declared riichi",
          "Only if you win by tsumo",
        ],
        1,
      );
      return {
        question: "When can you count ura dora han in your winning hand?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 22,
    title: "Kan Dora Rules and Timing",
    type: "concept",
    content: {
      text: "When you call kan (4-of-a-kind), a new dora indicator is immediately revealed. This creates additional dora for the current hand.",
      visual:
        "Game starts: 1 dora indicator\nPlayer calls kan: 2nd indicator revealed\nAnother kan: 3rd indicator revealed\nMax: 5 dora indicators (4 kans + original)\n\nKan dora timing: Revealed immediately when kan is declared",
      keyPoint:
        "Kan dora applies to ALL players still in the hand, not just the person who called kan. New dora is active immediately.",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        [
          "Only the kan caller",
          "All players still in hand",
          "Only the eventual winner",
        ],
        1,
      );
      return {
        question: "Who can benefit from newly revealed kan dora?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 23,
    title: "Multiple Dora Scenarios",
    type: "practice",
    content: {
      text: "Real games often have multiple dora sources. Let's practice counting them all correctly.",
      visual:
        "Hand: 🀉🀉🀉 🀛🀛🀛 🀊🀋🀌 🀍🀎🀏 🀀🀀\nWin: Riichi + Tsumo\n\nDora indicators:\n• Regular: 🀈 → 🀉 is dora (3 tiles = +3 han)\n• Kan: 🀚 → 🀛 is dora (3 tiles = +3 han)\n• Ura: 🀇 → 🀈 is ura dora (0 tiles = +0 han)\n\nTotal dora han: 3 + 3 + 0 = +6 han",
      keyPoint:
        "Count each dora type separately, then add them together. Each individual tile counts as +1 han.",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["+4 han", "+6 han", "+3 han"],
        1,
      );
      return {
        question: "Using the example above, how many total han from dora?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 24,
    title: "Dora with Special Yaku",
    type: "practice",
    content: {
      text: "Dora works alongside regular yaku. Some yaku have special interactions with dora tiles.",
      visual:
        "Hand: 🀙🀚🀛 🀜🀝🀞 🀟🀠🀡 🀂🀂🀂 🀆🀆\nYaku: Tanyao (1 han) + White Dragon (1 han) = 2 han\nDora indicator: 🀅 → 🀆 is dora\nDora count: 2 white dragons = +2 han\nTotal: 2 yaku han + 2 dora han = 4 han",
      keyPoint:
        "Dora han and yaku han are separate but add together. Dora can never substitute for required yaku (you still need at least 1 yaku to win).",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["Cannot win - no yaku", "2 han total", "4 han total"],
        0,
      );
      return {
        question: "A hand has 0 yaku but 2 dora tiles. What happens?",
        options,
        correct,
      };
    })(),
  },
  {
    id: 25,
    title: "Complete Dora Scoring Integration",
    type: "practice",
    content: {
      text: "Let's put it all together: fu, han from yaku, han from dora, and final scoring.",
      visual:
        "Hand: 🀛🀛🀛 🀜🀝🀞 🀟🀠🀡 🀆🀆🀆 🀄🀄\nWin: Riichi + Ron\n\nFu calculation:\n20 base + 10 ron + 4 triplet + 8 dragon triplet + 2 pair = 44 → 50 fu\n\nHan calculation:\nYaku: Riichi (1) + White Dragon (1) = 2 han\nDora: 🀚→🀛 dora (3 tiles) + 🀅→🀆 dora (3 tiles) = 6 han\nTotal: 2 + 6 = 8 han\n\nScoring: 50 fu × 2⁸ han = 50 × 256 = 12,800 base points",
      keyPoint:
        "Always calculate fu first, then count all han sources (yaku + dora), then apply the formula. High dora counts can create massive scores!",
    },
    quiz: (() => {
      const { options, correct } = shuffleOptions(
        ["12,800 points", "6,400 points", "25,600 points"],
        0,
      );
      return {
        question:
          "In the example above, what are the base points before payment multipliers?",
        options,
        correct,
      };
    })(),
  },
];

export const TOTAL_LESSONS = lessons.length;

export const getLessonById = (id) => {
  return lessons.find((lesson) => lesson.id === id);
};

export const getNextLesson = (currentId) => {
  const nextId = currentId + 1;
  return currentId < 1 || nextId > TOTAL_LESSONS
    ? undefined
    : lessons.find((lesson) => lesson.id === nextId);
};

export const getPreviousLesson = (currentId) => {
  const prevId = currentId - 1;
  return currentId > TOTAL_LESSONS || prevId < 1
    ? undefined
    : lessons.find((lesson) => lesson.id === prevId);
};
