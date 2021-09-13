import React from 'react'
import '../styles/Question.css'


function Question(props) {
  
  return (
    <div className="stage">
  <div className="stage-content"> <h4>{props.movieQuestion}</h4></div>
  <label className="curtain-container">
    <div className="curtain-panel">
      <input type="checkbox" className="curtain-trigger" />
      <div className="left-curtain curtain" data-title="Click to reveal a Question of the day"></div>
      <div className="right-curtain curtain" data-title="Click to reveal a Question of the day"></div>
    </div>
  </label>
</div>
  )
}

export default Question
