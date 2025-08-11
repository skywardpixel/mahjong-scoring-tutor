import React from 'react'

// Map Unicode mahjong tiles to image file names
const tileMap = {
  // Characters (Man) - red dots
  '🀇': '1m',
  '🀈': '2m', 
  '🀉': '3m',
  '🀊': '4m',
  '🀋': '5m',
  '🀌': '6m',
  '🀍': '7m',
  '🀎': '8m',
  '🀏': '9m',
  
  // Bamboo (Sou) - green with bamboo
  '🀐': '1s',
  '🀑': '2s',
  '🀒': '3s',
  '🀓': '4s',
  '🀔': '5s',
  '🀕': '6s',
  '🀖': '7s',
  '🀗': '8s',
  '🀘': '9s',
  
  // Dots (Pin) - blue circles
  '🀙': '1p',
  '🀚': '2p',
  '🀛': '3p', 
  '🀜': '4p',
  '🀝': '5p',
  '🀞': '6p',
  '🀟': '7p',
  '🀠': '8p',
  '🀡': '9p',
  
  // Honors
  '🀀': 'E',  // East
  '🀁': 'S',  // South
  '🀂': 'W',  // West  
  '🀃': 'N',  // North
  '🀅': 'G',  // Green Dragon (Hatsu)
  '🀆': 'W',  // White Dragon (Haku)
  '🀄': 'R'   // Red Dragon (Chun)
}

function TileImage({ tile, className = '' }) {
  const tileCode = tileMap[tile]
  
  if (!tileCode) {
    return <span className={className}>{tile}</span>
  }
  
  return (
    <img
      src={`/tiles/${tileCode}.svg`}
      alt={tile}
      className={`tile-image ${className}`}
      onError={(e) => {
        // Fallback to Unicode character if image fails to load
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'inline'
      }}
    />
  )
}

function TileDisplay({ children, className = '' }) {
  if (typeof children !== 'string') {
    return <div className={className}>{children}</div>
  }
  
  // Split text by lines first to handle newlines properly
  const lines = children.split('\n')
  const elements = []
  
  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      // Add line break between lines
      elements.push(<br key={`br-${lineIndex}`} />)
    }
    
    // Process each line for tiles and text
    let currentText = ''
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (tileMap[char]) {
        // Add any accumulated text
        if (currentText) {
          elements.push(<span key={`text-${lineIndex}-${i}`}>{currentText}</span>)
          currentText = ''
        }
        
        // Add tile image
        elements.push(
          <React.Fragment key={`tile-${lineIndex}-${i}`}>
            <TileImage tile={char} />
            <span style={{ display: 'none' }}>{char}</span>
          </React.Fragment>
        )
      } else {
        currentText += char
      }
    }
    
    // Add any remaining text from this line
    if (currentText) {
      elements.push(<span key={`final-text-${lineIndex}`}>{currentText}</span>)
    }
  })
  
  return <div className={className}>{elements}</div>
}

export default TileDisplay