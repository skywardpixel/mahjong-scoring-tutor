// Tile definitions
const TILES = {
  man: ['🀇', '🀈', '🀉', '🀊', '🀋', '🀌', '🀍', '🀎', '🀏'], // 1-9 man
  pin: ['🀙', '🀚', '🀛', '🀜', '🀝', '🀞', '🀟', '🀠', '🀡'], // 1-9 pin  
  sou: ['🀐', '🀑', '🀒', '🀓', '🀔', '🀕', '🀖', '🀗', '🀘'], // 1-9 sou
  honors: ['🀀', '🀁', '🀂', '🀃', '🀅', '🀆', '🀄'] // E,S,W,N,G,W,R
};

const ALL_TILES = [...TILES.man, ...TILES.pin, ...TILES.sou, ...TILES.honors];

// Helper functions
const random = (max) => Math.floor(Math.random() * max);
const randomChoice = (arr) => arr[random(arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Check if tile is terminal (1 or 9) or honor
const isTerminalOrHonor = (tile) => {
  const terminals = ['🀇', '🀏', '🀙', '🀡', '🀐', '🀘'];
  return terminals.includes(tile) || TILES.honors.includes(tile);
};

// Helper functions for sorting
const getSuitOrder = (tile) => {
  if (TILES.man.includes(tile)) return 0;
  if (TILES.pin.includes(tile)) return 1; 
  if (TILES.sou.includes(tile)) return 2;
  if (TILES.honors.includes(tile)) return 3;
  return 4;
};

const getTileNumber = (tile) => {
  if (TILES.man.includes(tile)) return TILES.man.indexOf(tile);
  if (TILES.pin.includes(tile)) return TILES.pin.indexOf(tile);
  if (TILES.sou.includes(tile)) return TILES.sou.indexOf(tile);
  if (TILES.honors.includes(tile)) return TILES.honors.indexOf(tile);
  return 0;
};

// Check if tiles can form a sequence
const canFormSequence = (tiles) => {
  if (tiles.length !== 3) return false;
  
  // Must be same suit and consecutive
  let suit = null;
  let numbers = [];
  
  for (let tile of tiles) {
    if (TILES.man.includes(tile)) {
      if (suit && suit !== 'man') return false;
      suit = 'man';
      numbers.push(TILES.man.indexOf(tile) + 1);
    } else if (TILES.pin.includes(tile)) {
      if (suit && suit !== 'pin') return false;
      suit = 'pin';
      numbers.push(TILES.pin.indexOf(tile) + 1);
    } else if (TILES.sou.includes(tile)) {
      if (suit && suit !== 'sou') return false;
      suit = 'sou';
      numbers.push(TILES.sou.indexOf(tile) + 1);
    } else {
      return false; // Honors can't form sequences
    }
  }
  
  numbers.sort((a, b) => a - b);
  return numbers[0] + 1 === numbers[1] && numbers[1] + 1 === numbers[2];
};

// Generate a random meld (triplet or sequence)
const generateRandomMeld = () => {
  const meldType = randomChoice(['triplet', 'sequence']);
  
  if (meldType === 'triplet') {
    const tile = randomChoice(ALL_TILES);
    return {
      type: 'triplet',
      tiles: [tile, tile, tile],
      concealed: Math.random() < 0.7 // 70% chance concealed
    };
  } else {
    // Generate sequence (only from suited tiles)
    const suit = randomChoice(['man', 'pin', 'sou']);
    const startNum = random(7); // 0-6 so we can have 1-2-3 to 7-8-9
    const tiles = [
      TILES[suit][startNum],
      TILES[suit][startNum + 1], 
      TILES[suit][startNum + 2]
    ];
    
    return {
      type: 'sequence',
      tiles: tiles,
      concealed: Math.random() < 0.8 // 80% chance concealed
    };
  }
};

// Generate a random pair
const generateRandomPair = () => {
  const tile = randomChoice(ALL_TILES);
  return {
    type: 'pair',
    tiles: [tile, tile]
  };
};

// Calculate fu for a hand
const calculateFu = (melds, pair, winConditions) => {
  let fu = 20; // Base fu
  
  // Add fu for win condition (ron = 10 fu, tsumo = 2 fu)
  if (winConditions.winType === 'tsumo') {
    fu += 2;
  } else {
    fu += 10; // Ron winning
  }
  
  // Add fu for melds
  for (let meld of melds) {
    if (meld.type === 'triplet') {
      const tile = meld.tiles[0];
      let meldFu = meld.concealed ? 4 : 2;
      
      // Double for terminals and honors
      if (isTerminalOrHonor(tile)) {
        meldFu *= 2;
      }
      
      fu += meldFu;
    }
    // Sequences add 0 fu
  }
  
  // Add fu for pair
  const pairTile = pair.tiles[0];
  if (TILES.honors.includes(pairTile)) {
    // Dragon pairs and wind pairs (simplified - assume all honor pairs give 2 fu)
    fu += 2;
  }
  
  // Add fu for wait type (simplified - assume some difficult waits)
  // For now, randomly assign wait fu to simulate different wait patterns
  const waitTypes = [0, 0, 0, 2, 2]; // 60% open wait (0 fu), 40% difficult wait (2 fu)
  const waitFu = randomChoice(waitTypes);
  fu += waitFu;
  
  // Round up to nearest 10
  return Math.ceil(fu / 10) * 10;
};

// Determine yaku for a hand
const determineYaku = (melds, pair, winConditions) => {
  const yaku = [];
  let han = 0;
  
  // Win-based yaku
  if (winConditions.winType === 'tsumo') {
    yaku.push('Tsumo');
    han += 1;
  }
  
  if (winConditions.hasRiichi) {
    yaku.push('Riichi');
    han += 1;
  }
  
  // Check for all triplets
  const allTriplets = melds.every(meld => meld.type === 'triplet');
  if (allTriplets) {
    yaku.push('All Triplets');
    han += 2;
  }
  
  // Check for tanyao (all simples)
  const allTiles = [...melds.flatMap(m => m.tiles), ...pair.tiles];
  const allSimples = allTiles.every(tile => !isTerminalOrHonor(tile));
  if (allSimples) {
    yaku.push('Tanyao');
    han += 1;
  }
  
  // Check for dragon triplets
  const dragons = ['🀅', '🀆', '🀄']; // Green, White, Red
  for (let meld of melds) {
    if (meld.type === 'triplet' && dragons.includes(meld.tiles[0])) {
      const dragonNames = { '🀅': 'Green Dragon', '🀆': 'White Dragon', '🀄': 'Red Dragon' };
      yaku.push(dragonNames[meld.tiles[0]]);
      han += 1;
    }
  }
  
  // Check for wind triplets (simplified - just call them "Wind Triplet")
  const winds = ['🀀', '🀁', '🀂', '🀃'];
  for (let meld of melds) {
    if (meld.type === 'triplet' && winds.includes(meld.tiles[0])) {
      yaku.push('Wind Triplet');
      han += 1;
    }
  }
  
  // Check for flush (all same suit)
  const suitedTiles = allTiles.filter(tile => !TILES.honors.includes(tile));
  if (suitedTiles.length > 0) {
    const firstSuit = TILES.man.includes(suitedTiles[0]) ? 'man' : 
                     TILES.pin.includes(suitedTiles[0]) ? 'pin' : 'sou';
    const sameSuit = suitedTiles.every(tile => TILES[firstSuit].includes(tile));
    
    if (sameSuit) {
      if (allTiles.length === suitedTiles.length) {
        // Pure flush
        yaku.push('Pure Flush');
        han += 6;
      } else {
        // Mixed flush  
        yaku.push('Mixed Flush');
        han += 3;
      }
    }
  }
  
  // Ensure at least 1 han
  if (han === 0) {
    yaku.push('Riichi');
    han = 1;
  }
  
  return { yaku, han };
};

// Check if tiles overlap with existing melds
const hasOverlap = (newMeld, existingMelds) => {
  const newTiles = newMeld.tiles;
  const existingTiles = existingMelds.flatMap(meld => meld.tiles);
  return newTiles.some(tile => existingTiles.includes(tile));
};

// Get all tiles used in existing melds
const getUsedTiles = (existingMelds) => {
  return new Set(existingMelds.flatMap(meld => meld.tiles));
};

// Generate a guaranteed unique sequence in an unused range
const generateFallbackSequence = (usedTiles, suitIndex = 0) => {
  const suits = ['man', 'pin', 'sou'];
  const suit = suits[suitIndex % 3];
  
  // Try to find a sequence that doesn't use any used tiles
  for (let start = 0; start <= 6; start++) {
    const tiles = [TILES[suit][start], TILES[suit][start + 1], TILES[suit][start + 2]];
    if (!tiles.some(tile => usedTiles.has(tile))) {
      return {
        type: 'sequence',
        tiles,
        concealed: true
      };
    }
  }
  
  // If no sequence available in this suit, try next suit
  if (suitIndex < 2) {
    return generateFallbackSequence(usedTiles, suitIndex + 1);
  }
  
  // Final fallback: honor triplet
  const availableHonors = TILES.honors.filter(honor => !usedTiles.has(honor));
  const honor = availableHonors[0] || TILES.honors[0];
  return {
    type: 'triplet',
    tiles: [honor, honor, honor],
    concealed: true
  };
};

// Generate a unique meld that doesn't conflict with existing ones
const generateUniqueMeld = (existingMelds, maxAttempts = 20) => {
  const usedTiles = getUsedTiles(existingMelds);
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const meld = generateRandomMeld();
    if (!meld.tiles.some(tile => usedTiles.has(tile))) {
      return meld;
    }
  }
  
  // Use guaranteed fallback
  return generateFallbackSequence(usedTiles);
};

// Generate a unique pair that doesn't conflict with existing melds
const generateUniquePair = (existingMelds, maxAttempts = 20) => {
  const usedTiles = getUsedTiles(existingMelds);
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const pair = generateRandomPair();
    if (!pair.tiles.some(tile => usedTiles.has(tile))) {
      return pair;
    }
  }
  
  // Fallback: find first available tile for pair
  const availableTiles = ALL_TILES.filter(tile => !usedTiles.has(tile));
  const pairTile = availableTiles[0] || TILES.honors[0];
  return {
    type: 'pair',
    tiles: [pairTile, pairTile]
  };
};

// Main hand generation function
export const generateRandomHand = () => {
  try {
    // Generate 4 unique melds + 1 unique pair
    const melds = [];
    
    // Generate first meld
    melds.push(generateRandomMeld());
    
    // Generate remaining melds ensuring no overlap
    for (let i = 1; i < 4; i++) {
      melds.push(generateUniqueMeld(melds));
    }
    
    // Generate unique pair
    const pair = generateUniquePair(melds);
    
    // Validate hand (no recursive calls - just log warnings)
    const allTiles = [...melds.flatMap(m => m.tiles), ...pair.tiles];
    if (allTiles.length !== 14) {
      console.warn('Generated hand has', allTiles.length, 'tiles instead of 14');
    }
    
    const tileSet = new Set(allTiles);
    if (tileSet.size !== allTiles.length) {
      console.warn('Duplicate tiles found in hand:', allTiles.length - tileSet.size, 'duplicates');
    }
  
    // Generate random win conditions
    const winConditions = {
      winType: randomChoice(['ron', 'tsumo']),
      isDealer: Math.random() < 0.25, // 25% chance dealer
      hasRiichi: Math.random() < 0.6, // 60% chance riichi
      riichiSticks: random(4) * 1000 // 0-3 riichi sticks on table
    };
    
    // Calculate fu and determine yaku (with detailed breakdown for explanation)
    let fuBreakdown = { base: 20, win: 0, melds: [], pair: 0, wait: 0 };
    
    // Win condition fu
    if (winConditions.winType === 'tsumo') {
      fuBreakdown.win = 2;
    } else {
      fuBreakdown.win = 10;
    }
    
    // Meld fu
    for (let meld of melds) {
      if (meld.type === 'triplet') {
        const tile = meld.tiles[0];
        let meldFu = meld.concealed ? 4 : 2;
        if (isTerminalOrHonor(tile)) meldFu *= 2;
        
        if (meldFu > 0) {
          const desc = isTerminalOrHonor(tile) ? 
            (meld.concealed ? 'concealed terminal/honor triplet' : 'open terminal/honor triplet') :
            (meld.concealed ? 'concealed triplet' : 'open triplet');
          fuBreakdown.melds.push({ fu: meldFu, desc });
        }
      }
    }
    
    // Pair fu
    const pairTile = pair.tiles[0];
    if (TILES.honors.includes(pairTile)) {
      fuBreakdown.pair = 2;
    }
    
    // Wait fu
    const waitTypes = [0, 0, 0, 2, 2];
    fuBreakdown.wait = randomChoice(waitTypes);
    
    // Calculate total fu
    let totalFu = fuBreakdown.base + fuBreakdown.win + fuBreakdown.pair + fuBreakdown.wait;
    fuBreakdown.melds.forEach(meld => totalFu += meld.fu);
    const fu = Math.ceil(totalFu / 10) * 10;
    
    const { yaku, han } = determineYaku(melds, pair, winConditions);
    
    // Calculate base points
    const basePoints = fu * Math.pow(2, han);
    
    // Format tiles for display - properly sorted as 4 melds + 1 pair
    const sortedMelds = melds.map(meld => {
      // Sort tiles within each meld
      return {
        ...meld,
        tiles: [...meld.tiles].sort((a, b) => {
          // Sort by suit first, then by number
          const aSuit = getSuitOrder(a);
          const bSuit = getSuitOrder(b);
          if (aSuit !== bSuit) return aSuit - bSuit;
          return getTileNumber(a) - getTileNumber(b);
        })
      };
    });
    
    // Create display with proper spacing between melds
    const tilesDisplay = [
      ...sortedMelds.map(meld => meld.tiles.join('')),
      pair.tiles.join('')
    ].join('  '); // Double space between groups
    
    // Create explanation using fuBreakdown
    let explanation = `${fu} fu (${fuBreakdown.base} base`;
    
    // Add win condition fu
    if (fuBreakdown.win === 2) {
      explanation += ' +2 tsumo';
    } else {
      explanation += ' +10 ron';
    }
    
    // Add meld fu
    fuBreakdown.melds.forEach(meld => {
      explanation += ` +${meld.fu} ${meld.desc}`;
    });
    
    // Add pair fu
    if (fuBreakdown.pair > 0) {
      explanation += ' +2 honor pair';
    }
    
    // Add wait fu
    if (fuBreakdown.wait > 0) {
      explanation += ` +${fuBreakdown.wait} wait`;
    }
    
    explanation += `) × 2^${han} han = ${basePoints} base points`;
    
    return {
      hand: {
        tiles: tilesDisplay,
        description: `${melds.filter(m => m.type === 'sequence').length} sequences, ${melds.filter(m => m.type === 'triplet').length} triplets`,
        baseFu: fu,
        yaku,
        han,
        explanation
      },
      condition: {
        win: winConditions.winType,
        dealer: winConditions.isDealer,
        riichi: winConditions.riichiSticks
      },
      yaku,
      han,
      fu,
      basePoints,
      answer: {
        fu,
        han,
        basePoints
      }
    };
  } catch (error) {
    console.error('Error generating hand:', error);
    // Return a simple fallback hand
    return {
      hand: {
        tiles: "🀇🀈🀉  🀚🀛🀜  🀐🀑🀒  🀀🀀🀀  🀄🀄",
        description: "3 sequences, 1 triplet",
        baseFu: 30,
        yaku: ['Riichi'],
        han: 1,
        explanation: "30 fu (20 base + 10 win) × 2^1 han = 60 base points"
      },
      condition: {
        win: 'ron',
        dealer: false,
        riichi: 0
      },
      yaku: ['Riichi'],
      han: 1,
      fu: 30,
      basePoints: 60,
      answer: {
        fu: 30,
        han: 1,
        basePoints: 60
      }
    };
  }
};

export const calculateScore = (fu, han, isDealer, isRon) => {
  const basePoints = fu * Math.pow(2, han);
  
  if (isRon) {
    return isDealer ? basePoints * 6 : basePoints * 4;
  } else {
    // Tsumo
    if (isDealer) {
      return basePoints * 2; // Each non-dealer pays this
    } else {
      return {
        fromDealer: basePoints * 2,
        fromNonDealer: basePoints * 1,
        total: (basePoints * 2) + (basePoints * 1 * 2)
      };
    }
  }
};