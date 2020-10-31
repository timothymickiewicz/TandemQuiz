import React from 'react';
import { Button } from 'react-bootstrap';

import './Question.css';
import 'bootstrap/dist/css/bootstrap.css';

function Question(props) {

    function handleClick() {
        props.onClick();
    }

    const shuffle = () => {
        let questions = props.currentQuestion.incorrect.concat(props.currentQuestion.correct);
        console.log(questions)
    }

    const checkAnswer = (e) => {
        console.log(e.target.value)
        if (e.target.value === props.currentQuestion.correct) {
            return props.handleAnswer('correct')
        }
        else {
            return props.handleAnswer('incorrect')
        }
    }

  return (
    <div className="question">
        {props.currentQuestion.question}
        <ul>
            {props.currentQuestion.incorrect.map((key, index) => {
                return (
                    <Button onClick={(e) => {checkAnswer(e); handleClick()}} value={key} variant="primary" key={index}>{key}</Button>
                )
            })}
            <Button onClick={(e) => {checkAnswer(e); handleClick()}} variant="primary" value={props.currentQuestion.correct} key="3">{props.currentQuestion.correct}</Button>
        </ul>
    </div>
  );
}

export default Question