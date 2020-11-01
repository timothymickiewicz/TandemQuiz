import React from 'react';
import { Button } from 'react-bootstrap';

import $ from 'jquery';

import shuffle from '../utils/shuffle';

import './Question.css';
import 'bootstrap/dist/css/bootstrap.css';

function Question(props) {

    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        // Resets question formatting
        $(".correct").fadeIn(500).attr("disabled", false).attr("active", false);
        $(".incorrect").fadeIn(500).attr("disabled", false).attr("active", false);
        $(".questionTitle").fadeIn(500)

        // Shuffling to prevent memorizing correct answer order
        const shuffleQuestions = () => {
            let shuffledQuestions = props.currentQuestion.incorrect;

            // Adds the correct answer to answer pool if it doesn't already exist in it
            !shuffledQuestions.includes(props.currentQuestion.correct) ?
                shuffledQuestions.push(props.currentQuestion.correct)
            :
                <null></null>
            
            shuffle(shuffledQuestions);
            setQuestions(shuffledQuestions)
        }
        shuffleQuestions();
    }, [props.currentQuestion.incorrect, props.currentQuestion.correct])

    // Handles visual and state changes for answers
    const handleAnswer = (e) => {
        $('.correct').css("background-color", "green").attr("disabled", true)
        $('.incorrect').css("background-color", "red").attr("disabled", true)

        e.target.value === props.currentQuestion.correct ?
        $('.response').text("Correct").css("color", "green").css("display", "initial")
        :
        $('.response').text("Incorrect").css("color", "red").css("display", "initial")

        // Fading effects make for a much cleaner transition and masks background color changes
        setTimeout(() => {
            // Reset correct/incorrect coloring
            $(".correct").fadeOut(500, () => {
                $('.correct').css("background-color", "")
            })
            $(".incorrect").fadeOut(500, () => {
                $('.incorrect').css("background-color", "")
            })
            $(".response").fadeOut(500, () => {
                $('.response').text("").css("display", "none")
            })
            $(".questionTitle").fadeOut(500)
        }, 1500)

        setTimeout(() => {
            e.target.value === props.currentQuestion.correct ?
                props.handleAnswer('correct')
            :
                props.handleAnswer('incorrect')
        }, 2000)
    }

  return (
    <div className="question">
        <div className="response"></div>
        <h1 className="questionTitle">{props.currentQuestion.question}</h1>
        <div className="answerContainer">
            {questions.map((key, index) => {
                return (
                    <Button 
                    onClick={(e) => {handleAnswer(e)}} 
                    active={false}
                    value={key} 
                    variant="light" 
                    className={key === props.currentQuestion.correct ? "correct answerBtn" : "incorrect answerBtn"} 
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