import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Quiz from '../Quiz'

const mockQuiz = {
  question: 'What is 2 + 2?',
  options: ['3', '4', '5'],
  correct: 1
}

describe('Quiz', () => {
  const defaultProps = {
    quiz: mockQuiz,
    onComplete: vi.fn(),
    onBack: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render quiz question and options', () => {
    render(<Quiz {...defaultProps} />)
    
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should render Back to Lesson and Submit Answer buttons initially', () => {
    render(<Quiz {...defaultProps} />)
    
    expect(screen.getByText('← Back to Lesson')).toBeInTheDocument()
    expect(screen.getByText('Submit Answer')).toBeInTheDocument()
  })

  it('should disable Submit Answer button when no option selected', () => {
    render(<Quiz {...defaultProps} />)
    
    const submitButton = screen.getByText('Submit Answer')
    expect(submitButton).toBeDisabled()
  })

  it('should enable Submit Answer button when option is selected', () => {
    render(<Quiz {...defaultProps} />)
    
    const option = screen.getByText('4')
    fireEvent.click(option)
    
    const submitButton = screen.getByText('Submit Answer')
    expect(submitButton).not.toBeDisabled()
  })

  it('should highlight selected option', () => {
    render(<Quiz {...defaultProps} />)
    
    const option = screen.getByText('4')
    fireEvent.click(option)
    
    expect(option).toHaveClass('selected')
  })

  it('should call onBack when Back to Lesson button is clicked', () => {
    render(<Quiz {...defaultProps} />)
    
    const backButton = screen.getByText('← Back to Lesson')
    fireEvent.click(backButton)
    
    expect(defaultProps.onBack).toHaveBeenCalledTimes(1)
  })

  it('should show result when correct answer is submitted', () => {
    render(<Quiz {...defaultProps} />)
    
    // Select correct answer (option index 1 = "4")
    const correctOption = screen.getByText('4')
    fireEvent.click(correctOption)
    
    // Submit answer
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Correct! Great job!')).toBeInTheDocument()
    expect(screen.getByText('✅')).toBeInTheDocument()
  })

  it('should show result when incorrect answer is submitted', () => {
    render(<Quiz {...defaultProps} />)
    
    // Select incorrect answer (option index 0 = "3")
    const incorrectOption = screen.getByText('3')
    fireEvent.click(incorrectOption)
    
    // Submit answer
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Not quite. The correct answer is: 4')).toBeInTheDocument()
    expect(screen.getByText('❌')).toBeInTheDocument()
  })

  it('should highlight correct and incorrect options after submission', () => {
    render(<Quiz {...defaultProps} />)
    
    // Select incorrect answer
    const incorrectOption = screen.getByText('3')
    fireEvent.click(incorrectOption)
    
    // Submit answer
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)
    
    // Check option classes
    expect(screen.getByText('3')).toHaveClass('incorrect')
    expect(screen.getByText('4')).toHaveClass('correct')
    expect(screen.getByText('5')).toHaveClass('disabled')
  })

  it('should show Continue button after result is displayed', () => {
    render(<Quiz {...defaultProps} />)
    
    // Select and submit answer
    const option = screen.getByText('4')
    fireEvent.click(option)
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Continue')).toBeInTheDocument()
    expect(screen.queryByText('Submit Answer')).not.toBeInTheDocument()
    expect(screen.queryByText('← Back to Lesson')).not.toBeInTheDocument()
  })

  it('should call onComplete with correct result when Continue is clicked', () => {
    render(<Quiz {...defaultProps} />)
    
    // Select correct answer and submit
    const correctOption = screen.getByText('4')
    fireEvent.click(correctOption)
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)
    
    // Click Continue
    const continueButton = screen.getByText('Continue')
    fireEvent.click(continueButton)
    
    expect(defaultProps.onComplete).toHaveBeenCalledWith(true)
  })

  it('should call onComplete with incorrect result when Continue is clicked', () => {
    render(<Quiz {...defaultProps} />)
    
    // Select incorrect answer and submit
    const incorrectOption = screen.getByText('3')
    fireEvent.click(incorrectOption)
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)
    
    // Click Continue
    const continueButton = screen.getByText('Continue')
    fireEvent.click(continueButton)
    
    expect(defaultProps.onComplete).toHaveBeenCalledWith(false)
  })

  it('should prevent option selection after result is shown', () => {
    render(<Quiz {...defaultProps} />)
    
    // Select and submit answer
    const option1 = screen.getByText('3')
    fireEvent.click(option1)
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)
    
    // Try to select different option after result
    const option2 = screen.getByText('5')
    fireEvent.click(option2)
    
    // First option should still be marked as selected/incorrect
    expect(screen.getByText('3')).toHaveClass('incorrect')
  })

  it('should have proper CSS classes and structure', () => {
    const { container } = render(<Quiz {...defaultProps} />)
    
    expect(container.querySelector('.lesson-container')).toBeInTheDocument()
    expect(container.querySelector('.quiz-container')).toBeInTheDocument()
    expect(container.querySelector('.quiz-question')).toBeInTheDocument()
    expect(container.querySelector('.quiz-options')).toBeInTheDocument()
    expect(container.querySelector('.quiz-navigation')).toBeInTheDocument()
  })
})