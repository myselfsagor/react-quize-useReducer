import React from 'react';

function NextBtn({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button onClick={() => dispatch({ type: 'next' })} className="btn btn-ui">
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: 'finish' })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
}

export default NextBtn;
