import { render, screen } from '@testing-library/react';
import App from './App';
import Question from './components/Question';
import End from './components/End';

test('renders app', () => {
  render(<App />);
  const Intro = screen.getByText(/Tandem for 400!/i);
  expect(Intro).toBeInTheDocument();
});

test('renders questions', () => {
  render(<Question 
    currentQuestion={{question: "FooBar", correct: "correct", incorrect: ["oneIncorrect", "twoIncorrect", "threeIncorrect"]}} />);
  const RenderedQuestionTitle = screen.getByText(/FooBar/i);
  expect(RenderedQuestionTitle).toBeInTheDocument();
});

test('renders endpage', () => {
  render(<End           
    correct={5}
    incorrect={5}/>);
  const IncorrectScore = screen.getByText(/Incorrect: 5/i);
  expect(IncorrectScore).toBeInTheDocument();
});
