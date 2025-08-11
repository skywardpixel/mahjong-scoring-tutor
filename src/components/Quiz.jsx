import { useState } from 'react'
import TileDisplay from './TileDisplay'

function Quiz({ quiz, onComplete, onBack }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleOptionClick = (optionIndex) => {
    if (showResult) return
    setSelectedOption(optionIndex)
  }

  const handleSubmit = () => {
    if (selectedOption === null) return
    
    const correct = selectedOption === quiz.correct
    setIsCorrect(correct)
    setShowResult(true)
  }

  const handleContinue = () => {
    onComplete(isCorrect)
  }

  const getOptionClass = (optionIndex) => {
    if (!showResult) {
      return selectedOption === optionIndex ? 'quiz-option selected' : 'quiz-option'
    }
    
    if (optionIndex === quiz.correct) {
      return 'quiz-option correct'
    } else if (optionIndex === selectedOption && selectedOption !== quiz.correct) {
      return 'quiz-option incorrect'
    }
    return 'quiz-option disabled'
  }

  return (
    <div className="lesson-container">
      <div className="quiz-container">
        <TileDisplay className="quiz-question">
          {quiz.question}
        </TileDisplay>
        
        <div className="quiz-options">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => handleOptionClick(index)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="result-icon">✅</span>
                <p>Correct! Great job!</p>
              </>
            ) : (
              <>
                <span className="result-icon">❌</span>
                <p>Not quite. The correct answer is: {quiz.options[quiz.correct]}</p>
              </>
            )}
          </div>
        )}

        <div className="quiz-navigation">
          {!showResult ? (
            <>
              <button className="button secondary" onClick={onBack}>
                ← Back to Lesson
              </button>
              
              <button 
                className="button" 
                onClick={handleSubmit}
                disabled={selectedOption === null}
              >
                Submit Answer
              </button>
            </>
          ) : (
            <button className="button" onClick={handleContinue}>
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz