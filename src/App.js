import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import Loader from './components/Loader';
import Error from './components/Error';
import Question from './components/Questions';
import NextBtn from './components/NextBtn';
import Progress from './components/Progress';
import FinishedScreen from './components/FinishedScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';

const initialState = {
  questions: [],

  // status: loading/error/ready/active/finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 20;

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: Number(state.questions.length * SECS_PER_QUESTION),
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'next':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    case 'restart':
      return { ...state, status: 'ready', index: 0, answer: null, points: 0 };
    default:
      throw new Error('Unknown Action');
  }
}

function App() {
  const [
    { status, questions, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions?.length;
  const maxPoints = questions?.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              answer={answer}
              points={points}
              index={index}
              maxPoints={maxPoints}
              numQuestions={numQuestions}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

              {answer !== null && (
                <NextBtn
                  index={index}
                  dispatch={dispatch}
                  numQuestions={numQuestions}
                />
              )}
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <FinishedScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
