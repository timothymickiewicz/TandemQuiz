import React from 'react';
import { Button } from 'react-bootstrap';

import './Main.css';
import 'bootstrap/dist/css/bootstrap.css';

import questions from '../utils/Apprentice_TandemFor400_Data.json';
import shuffle from '../utils/shuffle';

import Question from './Question';
import End from './End';

function Main() {
    const [questionCount, setQuestionCount] = React.useState(-1);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = React.useState(0);
    const [questionPool, setQuestionPool] = React.useState([]);

    React.useEffect(() => {
        setQuestionPool(shuffle(questions))
    }, [])

    // Assigns points, progresses to next question
    const handleAnswer = (answer) => {
        if (answer === 'correct') {
            setCorrectAnswers(correctAnswers + 1)
        }
        else {
            setIncorrectAnswers(incorrectAnswers + 1)
        }
        setQuestionCount(questionCount + 1)
    }

    const handleReset = () => {
        setQuestionCount(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
    }

    const handleStartStop = () => {
        if (questionCount === -1) {
            return (
                <Button 
                onClick={() => {setQuestionCount(questionCount + 1)}} 
                variant="light"
                className="start">
                    Start
                </Button>
            )
        }
        else {
            return (
                <End 
                correct={correctAnswers} 
                incorrect={incorrectAnswers} 
                onClick={() => handleReset()}/>
            )
        }
    }

  return (
      <>
        <h1 id="title">Tandem for 400! <span id="subTitle">Trivia</span></h1>
        <div className="main">
            
            {questionCount < 10 && questionCount !== -1 ?
                <Question currentQuestion={questionPool[questionCount]}handleAnswer={handleAnswer}/>
            :
                handleStartStop()
            }
        </div>
    </>
  );
}

export default Main