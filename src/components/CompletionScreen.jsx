import { TOTAL_LESSONS } from "../lessons/lessonData";

function CompletionScreen({ onRestart, onPractice }) {
  return (
    <div className="lesson-container completion-screen">
      <div className="completion-header">
        <div className="completion-icon">🎉</div>
        <h2 className="completion-title">Congratulations!</h2>
        <p className="completion-subtitle">
          You've completed all {TOTAL_LESSONS} lessons!
        </p>
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
            <li>✅ Complete dora system and mechanics</li>
            <li>✅ Ura dora rules and riichi integration</li>
            <li>✅ Kan dora timing and interactions</li>
            <li>✅ Multiple dora scenarios and counting</li>
          </ul>
        </div>

        <div className="completion-next-steps">
          <h3>🚀 What's Next?</h3>
          <p>
            You now understand the complete Japanese Mahjong scoring system,
            including all dora mechanics! Keep practicing with random hands to
            master these concepts.
          </p>
          <p>
            For real games, remember that platforms like Majsoul use
            standardized payment tables rather than exact formula calculations.
            Your understanding of dora will help you recognize high-value hands
            and make better strategic decisions.
          </p>
        </div>
      </div>

      <div className="completion-actions">
        <button className="button" onClick={onPractice}>
          🎯 Continue Practicing
        </button>

        <button className="button secondary" onClick={onRestart}>
          📚 Review Lessons
        </button>
      </div>
    </div>
  );
}

export default CompletionScreen;
