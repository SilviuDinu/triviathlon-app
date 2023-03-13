import { fetchQuestions } from '@api/api';
import classNames from 'classnames';
import { shuffle } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: unknown[];
}

const COUNTDOWN_TIME = 15;

function escapeHtml(html: string) {
  if (!html) {
    return '';
  }
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent ?? tmp.innerText ?? '';
}

function QuestionPage({ category }: any) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [countDown, setCountDown] = useState(COUNTDOWN_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const correctAnswers = useRef(0);
  const categoryRef = useRef('');
  const timerRef = useRef<any>();
  const navigate = useNavigate();

  const clearSelectedAnswer = useCallback(() => setSelectedAnswer(''), []);

  const resetGame = useCallback(() => {
    setQuestions([]);
    setGameOver(false);
    setCurrentIdx(0);
    setCountDown(COUNTDOWN_TIME);
    navigate('/');
  }, []);

  const syncQuestions = useCallback(
    async (category: string) => {
      if (category === categoryRef.current) {
        return;
      }
      try {
        const { data } = await fetchQuestions({ category });
        setQuestions(data.results);
      } catch (err) {
        console.error(err.response.data);
      } finally {
        categoryRef.current = category;
      }
    },
    [questions, category]
  );

  useEffect(() => {
    if (!questions.length) {
      syncQuestions(category);
    }
  }, [category]);

  useEffect(() => {
    if (!questions.length) {
      return;
    }

    timerRef.current = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [currentIdx, countDown, questions]);

  const updateTimer = () => {
    if (countDown < 1) {
      tryAnswer(null);
      return;
    }
    clearInterval(timerRef.current);
    setCountDown((cd) => cd - 1);
  };

  const tryAnswer = (answer: any) => {
    if (selectedAnswer !== '') {
      return;
    }
    if (isCorrect(answer)) {
      correctAnswers.current++;
    }
    clearInterval(timerRef.current);
    setSelectedAnswer(answer);
    nextQuestion();
  };

  const nextQuestion = () => {
    setTimeout(() => {
      if (!questions.length) {
        return;
      }
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setGameOver(true);
      }
      clearInterval(timerRef.current);
      setCountDown(COUNTDOWN_TIME);
    }, 3000);
  };

  const isCorrect = (answer: any) =>
    !!answer &&
    !questions[currentIdx].incorrect_answers.some((ia: any) => ia === answer) &&
    answer === questions[currentIdx].correct_answer;

  const answers = useMemo(
    () => shuffle([...(questions[currentIdx]?.incorrect_answers || []), questions[currentIdx]?.correct_answer]) || [],
    [currentIdx, questions]
  );

  useEffect(() => {
    clearSelectedAnswer();
  }, [gameOver, currentIdx]);

  return (
    <div className='App'>
      {!gameOver ? (
        <>
          <button
            // className='restart-btn'
            style={{ position: 'absolute', top: '30px', right: '20px', maxWidth: '150px' }}
            onClick={resetGame}>
            Restart game
          </button>
          {questions.length > 0 && (
            <h2 style={{ justifySelf: 'flex-start' }}>
              {currentIdx} / {questions.length}
            </h2>
          )}
          {questions.length > 0 && (
            <div>
              {true && (
                <div
                  className='round-time-bar'
                  style={
                    {
                      transform: `scaleX(${countDown / COUNTDOWN_TIME})`,
                      background: `hsl(${(countDown / COUNTDOWN_TIME) * 100}, 100%, 50%)`,
                    } as any
                  }>
                  <div></div>
                </div>
              )}
            </div>
          )}

          <div className='question-container'>
            <h2>{escapeHtml(questions[currentIdx]?.question)}</h2>
          </div>
          <div className='answers-container'>
            {questions[currentIdx] &&
              answers?.map((a) => {
                const correct = isCorrect(a);

                return (
                  <button
                    key={a}
                    className={classNames({
                      correct: selectedAnswer !== '' && correct,
                      incorrect: selectedAnswer && !correct,
                      selected: selectedAnswer === a,
                    })}
                    onClick={() => tryAnswer(a)}>
                    {escapeHtml(a)}
                  </button>
                );
              })}
          </div>
        </>
      ) : (
        <>
          <h2>Correct answers: {`${correctAnswers.current} / ${questions.length}`}</h2>
          <button onClick={resetGame}>Play again</button>
        </>
      )}
    </div>
  );
}

export default QuestionPage;
