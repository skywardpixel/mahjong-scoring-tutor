import { useState } from 'react'
import { lessons, getLessonById, getNextLesson, getPreviousLesson } from './lessons/lessonData'
import Lesson from './components/Lesson'
import ProgressBar from './components/ProgressBar'
import LessonSelector from './components/LessonSelector'
import PracticeMode from './components/PracticeMode'
import CompletionScreen from './components/CompletionScreen'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [currentMode, setCurrentMode] = useState('lessons') // 'lessons' or 'practice'
  const [currentLessonId, setCurrentLessonId] = useLocalStorage('mahjong-current-lesson', 1)
  const [completedLessonsArray, setCompletedLessonsArray] = useLocalStorage('mahjong-completed-lessons', [])
  const [showCompletionScreen, setShowCompletionScreen] = useState(true)
  
  // Convert array to Set for easier operations (localStorage can't store Sets directly)
  const completedLessons = new Set(completedLessonsArray)
  
  const setCompletedLessons = (newCompletedLessons) => {
    const newArray = Array.from(newCompletedLessons)
    setCompletedLessonsArray(newArray)
  }

  const currentLesson = getLessonById(currentLessonId)
  const nextLesson = getNextLesson(currentLessonId)
  const previousLesson = getPreviousLesson(currentLessonId)

  const handleLessonComplete = () => {
    const updatedCompleted = new Set([...completedLessons, currentLessonId])
    setCompletedLessons(updatedCompleted)
    if (nextLesson) {
      setCurrentLessonId(nextLesson.id)
    }
  }

  const handleNext = () => {
    if (nextLesson) {
      setCurrentLessonId(nextLesson.id)
    }
  }

  const handlePrevious = () => {
    if (previousLesson) {
      setCurrentLessonId(previousLesson.id)
    }
  }

  const handleSelectLesson = (lessonId) => {
    setCurrentLessonId(lessonId)
  }

  const progress = (completedLessons.size / lessons.length) * 100
  const allLessonsCompleted = completedLessons.size === lessons.length

  const handleRestartLessons = () => {
    setCurrentLessonId(1)
    setCurrentMode('lessons')
    setShowCompletionScreen(false)
  }

  const handleGoToPractice = () => {
    setCurrentMode('practice')
  }

  return (
    <div className="app">
      <header>
        <h1>🀄 Mahjong Scoring Tutor</h1>
      </header>
      
      <div className="app-controls">
        <div className="mode-selector">
          <button 
            className={`mode-button ${currentMode === 'lessons' ? 'active' : ''}`}
            onClick={() => {
              setCurrentMode('lessons')
              if (allLessonsCompleted) {
                setShowCompletionScreen(true)
              }
            }}
          >
            📚 Lessons
          </button>
          <button 
            className={`mode-button ${currentMode === 'practice' ? 'active' : ''}`}
            onClick={() => setCurrentMode('practice')}
          >
            🎯 Practice
          </button>
        </div>
        
        {currentMode === 'lessons' && (
          <LessonSelector 
            currentLessonId={currentLessonId}
            completedLessons={completedLessons}
            onSelectLesson={handleSelectLesson}
          />
        )}
      </div>
      
      <main>
        {currentMode === 'lessons' ? (
          allLessonsCompleted && showCompletionScreen ? (
            <CompletionScreen 
              onRestart={handleRestartLessons}
              onPractice={handleGoToPractice}
            />
          ) : (
            currentLesson && (
              <Lesson
                key={currentLessonId}
                lesson={currentLesson}
                onComplete={handleLessonComplete}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={!!nextLesson}
                hasPrevious={!!previousLesson}
                isCompleted={completedLessons.has(currentLessonId)}
              />
            )
          )
        ) : (
          <PracticeMode />
        )}
      </main>
    </div>
  )
}

export default App