function CompletionScreen({ onRestart, onPractice }) {
  return (
    <div className="lesson-container completion-screen">
      <div className="completion-header">
        <div className="completion-icon">🎉</div>
        <h2 className="completion-title">Congratulations!</h2>
        <p className="completion-subtitle">You've completed all 16 lessons!</p>
      </div>

      <div className="completion-content">
        <div className="completion-stats">
          <h3>🧠 What You've Learned</h3>
          <ul className="completion-skills">
            <li>✅ Fu calculation and rounding rules</li>
            <li>✅ Han system and yaku recognition</li>
            <li>✅ Base point formula (fu × 2^han)</li>
            <li>✅ Ron vs Tsumo payment structures</li>
            <li>✅ Riichi mechanics and bonus collection</li>
            <li>✅ Theory vs real-world payment tables</li>
          </ul>
        </div>

        <div className="completion-next-steps">
          <h3>🚀 What's Next?</h3>
          <p>
            You now understand the fundamental principles of Japanese Mahjong scoring! 
            Keep practicing with random hands to master these concepts.
          </p>
          <p>
            For real games, remember that platforms like Majsoul use standardized 
            payment tables rather than exact formula calculations.
          </p>
        </div>
      </div>

      <div className="completion-actions">
        <button 
          className="button" 
          onClick={onPractice}
        >
          🎯 Continue Practicing
        </button>
        
        <button 
          className="button secondary" 
          onClick={onRestart}
        >
          📚 Review Lessons
        </button>
      </div>
    </div>
  )
}

export default CompletionScreen