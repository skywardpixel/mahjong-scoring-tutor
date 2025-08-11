import { useState } from 'react'
import { generateRandomHand } from '../utils/handGenerator'
import TileDisplay from './TileDisplay'

function PracticeMode() {
  const [currentProblem, setCurrentProblem] = useState(() => generateRandomHand())
  const [userAnswer, setUserAnswer] = useState({ fu: '', han: '', basePoints: '' })
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const generateNewProblem = () => {
    setCurrentProblem(generateRandomHand())
    setUserAnswer({ fu: '', han: '', basePoints: '' })
    setShowResult(false)
  }

  const checkAnswer = () => {
    const correct = {
      fu: parseInt(userAnswer.fu) === currentProblem.answer.fu,
      han: parseInt(userAnswer.han) === currentProblem.answer.han,
      basePoints: parseInt(userAnswer.basePoints) === currentProblem.answer.basePoints
    }

    const allCorrect = correct.fu && correct.han && correct.basePoints
    
    setScore(prev => ({
      correct: prev.correct + (allCorrect ? 1 : 0),
      total: prev.total + 1
    }))

    setShowResult({ correct, allCorrect })
  }

  const handleInputChange = (field, value) => {
    setUserAnswer(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const canSubmit = userAnswer.fu && userAnswer.han && userAnswer.basePoints

  return (
    <div className="practice-mode">
      <div className="practice-header">
        <h2>🎯 Scoring Practice</h2>
        <div className="practice-score">
          Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round(score.correct/score.total * 100) : 0}%)
        </div>
      </div>

      <div className="practice-problem">
        <div className="problem-hand">
          <h3>Calculate the base points for this hand:</h3>
          
          <TileDisplay className="practice-tiles">
            {currentProblem.hand.tiles}
          </TileDisplay>
          
          <div className="problem-conditions">
            <div className="condition-item">
              <strong>Win Type:</strong> {currentProblem.condition.win === 'ron' ? 'Ron (discard)' : 'Tsumo (self-draw)'}
            </div>
            <div className="condition-item">
              <strong>Position:</strong> {currentProblem.condition.dealer ? 'Dealer' : 'Non-dealer'}
            </div>
            {currentProblem.condition.riichi > 0 && (
              <div className="condition-item">
                <strong>Riichi sticks:</strong> {currentProblem.condition.riichi} points on table
              </div>
            )}
            <div className="condition-item">
              <strong>Yaku:</strong> {currentProblem.yaku.join(', ')}
            </div>
          </div>
        </div>

        <div className="answer-inputs">
          <div className="input-group">
            <label htmlFor="fu-input">Fu:</label>
            <input
              id="fu-input"
              type="number"
              value={userAnswer.fu}
              onChange={(e) => handleInputChange('fu', e.target.value)}
              placeholder="30"
              min="20"
              max="110"
            />
          </div>

          <div className="input-group">
            <label htmlFor="han-input">Han:</label>
            <input
              id="han-input"
              type="number"
              value={userAnswer.han}
              onChange={(e) => handleInputChange('han', e.target.value)}
              placeholder="1"
              min="1"
              max="13"
            />
          </div>

          <div className="input-group">
            <label htmlFor="base-input">Base Points:</label>
            <input
              id="base-input"
              type="number"
              value={userAnswer.basePoints}
              onChange={(e) => handleInputChange('basePoints', e.target.value)}
              placeholder="60"
              min="30"
            />
          </div>
        </div>

        <div className="practice-actions">
          <button 
            className="button"
            onClick={checkAnswer}
            disabled={!canSubmit || showResult}
          >
            Check Answer
          </button>
          
          <button 
            className="button secondary"
            onClick={generateNewProblem}
          >
            New Problem
          </button>
        </div>

        {showResult && (
          <div className={`practice-result ${showResult.allCorrect ? 'correct' : 'incorrect'}`}>
            <div className="result-header">
              <span className="result-icon">
                {showResult.allCorrect ? '✨' : '💡'}
              </span>
              <h4>{showResult.allCorrect ? 'Perfect Score!' : 'Great Attempt!'}</h4>
              <div className="result-score-badge">
                {Object.values(showResult.correct).filter(Boolean).length}/3
              </div>
            </div>

            <div className="result-details">
              <div className={`result-item ${showResult.correct.fu ? 'correct' : 'incorrect'}`}>
                <div className="result-item-label">Fu</div>
                <div className="result-item-values">
                  <span className="user-answer">{userAnswer.fu}</span>
                  <span className="divider">→</span>
                  <span className="correct-answer">{currentProblem.answer.fu}</span>
                </div>
                <div className="result-item-status">
                  {showResult.correct.fu ? '✓' : '✗'}
                </div>
              </div>
              <div className={`result-item ${showResult.correct.han ? 'correct' : 'incorrect'}`}>
                <div className="result-item-label">Han</div>
                <div className="result-item-values">
                  <span className="user-answer">{userAnswer.han}</span>
                  <span className="divider">→</span>
                  <span className="correct-answer">{currentProblem.answer.han}</span>
                </div>
                <div className="result-item-status">
                  {showResult.correct.han ? '✓' : '✗'}
                </div>
              </div>
              <div className={`result-item ${showResult.correct.basePoints ? 'correct' : 'incorrect'}`}>
                <div className="result-item-label">Base Points</div>
                <div className="result-item-values">
                  <span className="user-answer">{userAnswer.basePoints}</span>
                  <span className="divider">→</span>
                  <span className="correct-answer">{currentProblem.answer.basePoints}</span>
                </div>
                <div className="result-item-status">
                  {showResult.correct.basePoints ? '✓' : '✗'}
                </div>
              </div>
            </div>

            <div className="result-explanation">
              <h5>📋 Calculation Breakdown</h5>
              <p>{currentProblem.hand.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PracticeMode