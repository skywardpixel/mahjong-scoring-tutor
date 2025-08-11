import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Lesson from '../Lesson'

const mockLesson = {
  id: 1,
  title: 'Test Lesson',
  content: {
    text: 'This is a test lesson',
    visual: 'Visual content',
    keyPoint: 'Important point'
  },
  quiz: {
    question: 'Test question?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correct: 0
  }
}

describe('Lesson', () => {
  const defaultProps = {
    lesson: mockLesson,
    onComplete: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    hasNext: true,
    hasPrevious: true,
    isCompleted: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render lesson title and content', () => {
    render(<Lesson {...defaultProps} />)
    
    expect(screen.getByText('Test Lesson')).toBeInTheDocument()
    expect(screen.getByText('Lesson 1')).toBeInTheDocument()
    expect(screen.getByText('This is a test lesson')).toBeInTheDocument()
    expect(screen.getByText('Visual content')).toBeInTheDocument()
    expect(screen.getByText(/Important point/)).toBeInTheDocument()
  })

  it('should show Take Quiz button when quiz exists', () => {
    render(<Lesson {...defaultProps} />)
    
    expect(screen.getByText('Take Quiz')).toBeInTheDocument()
  })

  it('should show Previous button when hasPrevious is true', () => {
    render(<Lesson {...defaultProps} />)
    
    expect(screen.getByText('← Previous')).toBeInTheDocument()
  })

  it('should not show Previous button when hasPrevious is false', () => {
    render(<Lesson {...defaultProps} hasPrevious={false} />)
    
    expect(screen.queryByText('← Previous')).not.toBeInTheDocument()
  })

  it('should call onPrevious when Previous button is clicked', () => {
    render(<Lesson {...defaultProps} />)
    
    const previousButton = screen.getByText('← Previous')
    fireEvent.click(previousButton)
    
    expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1)
  })

  it('should show Continue button when hasNext is true and no quiz', () => {
    const lessonWithoutQuiz = { ...mockLesson, quiz: null }
    render(<Lesson {...defaultProps} lesson={lessonWithoutQuiz} />)
    
    expect(screen.getByText('Continue')).toBeInTheDocument()
  })

  it('should show Complete button when hasNext is false and no quiz', () => {
    const lessonWithoutQuiz = { ...mockLesson, quiz: null }
    render(<Lesson {...defaultProps} lesson={lessonWithoutQuiz} hasNext={false} />)
    
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('should display quiz when Take Quiz is clicked', () => {
    render(<Lesson {...defaultProps} />)
    
    const takeQuizButton = screen.getByText('Take Quiz')
    fireEvent.click(takeQuizButton)
    
    expect(screen.getByText('Test question?')).toBeInTheDocument()
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('should have proper CSS classes', () => {
    const { container } = render(<Lesson {...defaultProps} />)
    
    expect(container.querySelector('.lesson-container')).toBeInTheDocument()
    expect(container.querySelector('.lesson-header')).toBeInTheDocument()
    expect(container.querySelector('.lesson-content')).toBeInTheDocument()
    expect(container.querySelector('.lesson-navigation')).toBeInTheDocument()
  })

  it('should render key point with proper styling', () => {
    const { container } = render(<Lesson {...defaultProps} />)
    
    const keyPoint = container.querySelector('.key-point')
    expect(keyPoint).toBeInTheDocument()
    expect(keyPoint).toHaveTextContent('💡 Important point')
  })

  it('should not render key point when not provided', () => {
    const lessonWithoutKeyPoint = {
      ...mockLesson,
      content: {
        ...mockLesson.content,
        keyPoint: null
      }
    }
    const { container } = render(<Lesson {...defaultProps} lesson={lessonWithoutKeyPoint} />)
    
    expect(container.querySelector('.key-point')).not.toBeInTheDocument()
  })

  it('should handle lesson without quiz', () => {
    const lessonWithoutQuiz = { ...mockLesson, quiz: null }
    render(<Lesson {...defaultProps} lesson={lessonWithoutQuiz} />)
    
    expect(screen.queryByText('Take Quiz')).not.toBeInTheDocument()
    expect(screen.getByText('Continue')).toBeInTheDocument()
  })

  it('should call onNext when Continue button is clicked', () => {
    const lessonWithoutQuiz = { ...mockLesson, quiz: null }
    render(<Lesson {...defaultProps} lesson={lessonWithoutQuiz} />)
    
    const continueButton = screen.getByText('Continue')
    fireEvent.click(continueButton)
    
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1)
  })
})