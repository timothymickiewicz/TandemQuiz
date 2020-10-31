import React from 'react';
import { Button } from 'react-bootstrap';

import './Main.css';
import 'bootstrap/dist/css/bootstrap.css';

import questions from '../utils/Apprentice_TandemFor400_Data.json';

import Question from './Question';
import End from './End';

function Main() {
    const [questionCount, setQuestionCount] = React.useState(-1);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = React.useState(0);

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

    const handleStartStop = () => {
        if (questionCount === -1) {
            return (
                <Button 
                onClick={() => {setQuestionCount(questionCount + 1)}} 
                variant="primary">Start</Button>
            )
        }
        else if (questions[questionCount] === undefined) {
            return (
                <End 
                correct={correctAnswers} 
                incorrect={incorrectAnswers} 
                onClick={setQuestionCount(questionCount + 1)}/>
            )
        }
    }

  return (
    <div className="main">
        <h1>Tandem for 400!</h1>
        {questions[questionCount] ?
            <Question currentQuestion={questions[questionCount]}handleAnswer={handleAnswer}/>
        :
            handleStartStop()
        }
    </div>
  );
}

export default Main