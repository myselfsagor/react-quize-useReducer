import React from 'react';

function FinishedScreen({ points, maxPoints, highScore, dispatch }) {
  const avarage = (points / maxPoints) * 100;
  let emoji;

  if (avarage === 100) emoji = '🥇';
  if (avarage >= 80 && avarage < 100) emoji = '🥈';
  if (avarage >= 50 && avarage < 80) emoji = '🥈';
  if (avarage >= 0 && avarage < 50) emoji = '🥉';
  if (avarage === 0) emoji = '😪';

  return (
    <>
      <p className="result">
        {emoji} You score {points} out of {maxPoints} ({Math.floor(avarage)}%)
      </p>
      <p className="highscore">(Highscore : {highScore})</p>
      <button
        onClick={() => dispatch({ type: 'restart' })}
        className="btn btn-ui"
      >
        Restart qize
      </button>
    </>
  );
}

export default FinishedScreen;
