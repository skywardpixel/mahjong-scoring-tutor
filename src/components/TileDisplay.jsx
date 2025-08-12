import React from "react";

// Map Unicode mahjong tiles for styling
const tileMap = {
  // Characters (Man) - red dots
  "🀇": true,
  "🀈": true,
  "🀉": true,
  "🀊": true,
  "🀋": true,
  "🀌": true,
  "🀍": true,
  "🀎": true,
  "🀏": true,

  // Bamboo (Sou) - green with bamboo
  "🀐": true,
  "🀑": true,
  "🀒": true,
  "🀓": true,
  "🀔": true,
  "🀕": true,
  "🀖": true,
  "🀗": true,
  "🀘": true,

  // Dots (Pin) - blue circles
  "🀙": true,
  "🀚": true,
  "🀛": true,
  "🀜": true,
  "🀝": true,
  "🀞": true,
  "🀟": true,
  "🀠": true,
  "🀡": true,

  // Honors
  "🀀": true, // East
  "🀁": true, // South
  "🀂": true, // West
  "🀃": true, // North
  "🀅": true, // Green Dragon (Hatsu)
  "🀆": true, // White Dragon (Haku)
  "🀄": true, // Red Dragon (Chun)
};

function TileCharacter({ tile, className = "" }) {
  return <span className={`tile-unicode ${className}`}>{tile}</span>;
}

function TileDisplay({ children, className = "" }) {
  if (typeof children !== "string") {
    return <div className={className}>{children}</div>;
  }

  // Split text by lines first to handle newlines properly
  const lines = children.split("\n");
  const elements = [];

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      // Add line break between lines
      elements.push(<br key={`br-${lineIndex}`} />);
    }

    // Process each line for tiles and text using proper Unicode handling
    let currentText = "";

    // Use Array.from to properly handle Unicode characters
    const chars = Array.from(line);

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      if (tileMap[char]) {
        // Add any accumulated text
        if (currentText) {
          elements.push(
            <span key={`text-${lineIndex}-${i}`}>{currentText}</span>,
          );
          currentText = "";
        }

        // Add tile character
        elements.push(
          <TileCharacter key={`tile-${lineIndex}-${i}`} tile={char} />,
        );
      } else {
        currentText += char;
      }
    }

    // Add any remaining text from this line
    if (currentText) {
      elements.push(<span key={`final-text-${lineIndex}`}>{currentText}</span>);
    }
  });

  return <div className={className}>{elements}</div>;
}

export default TileDisplay;
