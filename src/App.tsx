import React from 'react';
import { useReducer, useContext } from 'react';
import Board from './components/Board';
import Loader from './components/Loader';
import Answer from './components/Answer';
import QuestionForm from './components/QuestionForm';
import { AppContext, AppDispatchContext } from './context/AppContext';

import AppInterface from './interfaces/AppInterface';
import initialState from './states/InitialState';

import './App.css';


const reducer = (state: AppInterface, action: any) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, status: 'LOADING', question: action.question };
    case "COMPLETE":
      return { ...state, status: 'COMPLETE', answer: action.data };
    case "START_ANIMATION":
      return { ...state, animations: action.animations};
    case "RESET":
      // reset all timeouts
      state.animations.forEach(animation => {
        clearTimeout(animation);
      });

      return initialState;
    default:
      return state;
  }
};

function App() {
  const [question, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App board-application">
      <AppContext.Provider
        value={question}>
        <AppDispatchContext.Provider
        value={dispatch}>
          <Board />
          <Loader />
          <Answer />
          <QuestionForm />
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
