import { useState, useEffect, useContext } from "react";
import { AppContext, AppDispatchContext } from "../context/AppContext";

import './Answer.css';

function Answer () {
  const [boardReady, setBoardReady] = useState(false);
  const {status, question, answer} = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  useEffect(() => {
    if(status === 'COMPLETE') {
      setTimeout(() => {
        setBoardReady(true);
      }, 200);
    } else {
      setBoardReady(false);
    }
  }, [status]);

  const resetBoard = () => {
    dispatch({ type: 'RESET' });
  }

  return <>
    {status === 'COMPLETE' && 
      <>
        <div className={`board-details-content app-content-holder should-load ${boardReady ? 'is-loaded' : ''}`}>
          <p><span>Your Question:</span> {question}</p>
          <p><span>Your Answer:</span> {answer}</p>
        </div>
        <button onClick={() => { resetBoard() }}>Ask Another</button>
      </>
    }
  </>
}

export default Answer;