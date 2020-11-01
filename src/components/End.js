import React from 'react';
import { Button } from 'react-bootstrap';

import './End.css';
import 'bootstrap/dist/css/bootstrap.css';


function End(props) {

    const handleRestart = () => {
        props.onClick()
    }

  return (
    <div className="endContainer">
        <span id="score">{(props.correct / (props.correct + props.incorrect) * 100) + '%'}</span>
        <span id="correct">Correct: {props.correct}</span>
        <span id="incorrect">Incorrect: {props.incorrect}</span>
        <Button 
        onClick={() => handleRestart()} 
        variant="light"
        className="restartBtn">
            Restart
        </Button>
    </div>

  );
}

export default End