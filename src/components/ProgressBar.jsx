function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="progress-text">{Math.round(progress)}% Complete</span>
    </div>
  )
}

export default ProgressBar