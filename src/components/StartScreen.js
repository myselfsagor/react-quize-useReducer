import React from 'react';

function StartScreen({ dispatch, numQuestions }) {
  return (
    <div>
      <h2>Welcome to react quize </h2>
      <h3>{numQuestions} question to test your React mastary</h3>
      <button onClick={() => dispatch({ type: 'start' })} className="btn">
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
