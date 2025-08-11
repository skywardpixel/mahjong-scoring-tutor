import { useState } from 'react'
import Quiz from './Quiz'
import TileDisplay from './TileDisplay'

function Lesson({ lesson, onComplete, onNext, onPrevious, hasNext, hasPrevious, isCompleted }) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleContinue = () => {
    if (lesson.quiz && !showQuiz) {
      setShowQuiz(true)
    } else if (hasNext) {
      // If no quiz or quiz completed, go to next lesson
      if (!lesson.quiz || quizCompleted) {
        onNext()
      }
    }
  }

  const handleQuizComplete = (correct) => {
    setQuizCompleted(true)
    setShowQuiz(false)
    if (correct) {
      onComplete()
    }
  }

  if (showQuiz && lesson.quiz) {
    return (
      <Quiz
        quiz={lesson.quiz}
        onComplete={handleQuizComplete}
        onBack={() => setShowQuiz(false)}
      />
    )
  }

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h2 className="lesson-title">{lesson.title}</h2>
        <p className="lesson-number">Lesson {lesson.id}</p>
      </div>

      <div className="lesson-content">
        <TileDisplay className="lesson-visual">
          {lesson.content.visual}
        </TileDisplay>
        
        <p className="lesson-text">
          {lesson.content.text}
        </p>

        {lesson.content.keyPoint && (
          <div className="key-point">
            <strong>💡 {lesson.content.keyPoint}</strong>
          </div>
        )}
      </div>

      <div className="lesson-navigation">
        {hasPrevious && (
          <button 
            className="button secondary" 
            onClick={onPrevious}
          >
            ← Previous
          </button>
        )}
        
        <button 
          className="button" 
          onClick={handleContinue}
        >
          {lesson.quiz && !showQuiz ? 'Take Quiz' : (hasNext ? 'Continue' : 'Complete')}
        </button>
      </div>
    </div>
  )
}

export default Lesson