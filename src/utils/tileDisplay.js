// Convert Unicode mahjong tiles to text representations for better display
export const convertTilesToText = (tileString) => {
  const tileMap = {
    // Dots (Pins)
    '🀙': '1p', '🀚': '2p', '🀛': '3p', '🀜': '4p', '🀝': '5p', 
    '🀞': '6p', '🀟': '7p', '🀠': '8p', '🀡': '9p',
    
    // Bamboo (Sou)
    '🀐': '1s', '🀑': '2s', '🀒': '3s', '🀓': '4s', '🀔': '5s',
    '🀕': '6s', '🀖': '7s', '🀗': '8s', '🀘': '9s',
    
    // Characters (Man)
    '🀇': '1m', '🀈': '2m', '🀉': '3m', '🀊': '4m', '🀋': '5m',
    '🀌': '6m', '🀍': '7m', '🀎': '8m', '🀏': '9m',
    
    // Honors
    '🀀': 'E',  // East
    '🀁': 'S',  // South  
    '🀂': 'W',  // West
    '🀃': 'N',  // North
    '🀅': 'G',  // Green Dragon (Hatsu)
    '🀆': 'W',  // White Dragon (Haku)
    '🀄': 'R'   // Red Dragon (Chun)
  };
  
  let result = tileString;
  for (const [unicode, text] of Object.entries(tileMap)) {
    result = result.replaceAll(unicode, `[${text}]`);
  }
  
  return result;
};

// Alternative: Keep Unicode but force consistent display
export const normalizeTileDisplay = (tileString) => {
  // This helps ensure consistent rendering across browsers
  return tileString.replace(/🀄/g, '🀄︎'); // Force text variant of red dragon
};