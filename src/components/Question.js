import React from 'react';
import { Button } from 'react-bootstrap';

import $ from 'jquery';

import './Question.css';
import 'bootstrap/dist/css/bootstrap.css';

function Question(props) {

    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        // Resets correct/incorrect buttons to original format
        $(".correct").fadeIn(500)
        $(".incorrect").fadeIn(500)
        // Shuffling to prevent memorizing correct answer order
        const shuffleQuestions = () => {
            let shuffledQuestions = props.currentQuestion.incorrect;
            shuffledQuestions.push(props.currentQuestion.correct);
            shuffleArray(shuffledQuestions);
            setQuestions(shuffledQuestions)
        }
        shuffleQuestions();
    }, [props.currentQuestion.incorrect, props.currentQuestion.correct])

    function shuffleArray(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    const checkAnswer = (e) => {
        // Highlights correct/incorrect answers
        $('.correct').css("background-color", "green")
        $('.incorrect').css("background-color", "red")
        setTimeout(() => {
            // Reset correct/incorrect coloring
            $(".correct").fadeOut(500, () => {
                $('.correct').css("background-color", "")
            })
            $(".incorrect").fadeOut(500, () => {
                $('.incorrect').css("background-color", "")
            })
        }, 2500)
        setTimeout(() => {
            // Handles correct/incorrect answers, assigns points and progreses to next question
            if (e.target.value === props.currentQuestion.correct) {
                return props.handleAnswer('correct')
            }
            else {
                return props.handleAnswer('incorrect')
            }
        }, 3000)
    }

  return (
    <div className="question">
        <h1>{props.currentQuestion.question}</h1>
        <div className="answerContainer">
            {questions.map((key, index) => {
                return (
                    <Button 
                    onClick={(e) => {checkAnswer(e)}} 
                    value={key} variant="primary" 
                    className={key === props.currentQuestion.correct ? "correct" : "incorrect"} 
                    key={index}>
                        {key}
                    </Button>
                )
            })}
        </div>
    </div>
  );
}

export default Question