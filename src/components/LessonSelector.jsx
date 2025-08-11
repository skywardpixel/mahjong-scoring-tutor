import { useState } from 'react'
import { lessons } from '../lessons/lessonData'

function LessonSelector({ currentLessonId, completedLessons, onSelectLesson, onClose }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLessonClick = (lessonId) => {
    onSelectLesson(lessonId)
    setIsOpen(false)
    if (onClose) onClose()
  }

  const getLessonStatus = (lessonId) => {
    if (completedLessons.has(lessonId)) return 'completed'
    if (lessonId === currentLessonId) return 'current'
    if (lessonId === 1 || completedLessons.has(lessonId - 1)) return 'available'
    return 'locked'
  }

  const getLessonStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅'
      case 'current': return '▶️'
      case 'available': return '⭕'
      case 'locked': return '🔒'
      default: return ''
    }
  }

  return (
    <div className="lesson-selector">
      <button 
        className="lesson-selector-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        📚 Lessons ({completedLessons.size}/{lessons.length})
      </button>

      {isOpen && (
        <div className="lesson-selector-dropdown">
          <div className="lesson-selector-header">
            <h3>Select a Lesson</h3>
            <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="lesson-list">
            {lessons.map((lesson) => {
              const status = getLessonStatus(lesson.id)
              const isClickable = status === 'completed' || status === 'current' || status === 'available'
              
              return (
                <div
                  key={lesson.id}
                  className={`lesson-item ${status} ${isClickable ? 'clickable' : ''}`}
                  onClick={isClickable ? () => handleLessonClick(lesson.id) : undefined}
                >
                  <div className="lesson-item-icon">
                    {getLessonStatusIcon(status)}
                  </div>
                  <div className="lesson-item-content">
                    <div className="lesson-item-title">
                      Lesson {lesson.id}: {lesson.title}
                    </div>
                    <div className="lesson-item-type">
                      {lesson.type}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="lesson-selector-footer">
            <p>Complete lessons in order to unlock new ones!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LessonSelector