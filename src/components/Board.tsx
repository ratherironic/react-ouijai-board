import { useState, useEffect, useContext } from "react";
import { AppContext, AppDispatchContext } from "../context/AppContext";

import './Board.css'

function Board () {
  const [boardReady, setBoardReady] = useState(false);
  const { status, answer } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [currentLetter, setCurrentLetter] = useState('');

  useEffect(() => {
    if(status === 'COMPLETE') {
      setTimeout(() => {
        setBoardReady(true);
      }, 200);
    } else {
      setBoardReady(false);
    }
  }, [status]);

  useEffect(() => {
    // if answer has changed, loop through all letters and move the board
    let formatAnswer = answer.replace(/\s/g, '');
    formatAnswer =  formatAnswer.toLowerCase();

    let animations:  Array<ReturnType<typeof setTimeout>> = [];

    for (let i = 0; i < (formatAnswer.length + 1); i++) {
      let animation = setTimeout(() => {
        if(formatAnswer.charAt(i) !== '') {
          if(/^-?\d+$/.test(formatAnswer.charAt(i-1))) {
            setCurrentLetter(`num${formatAnswer.charAt(i)}`);
          } else {
            setCurrentLetter(`${formatAnswer.charAt(i)}`);
          }
        } else {
          setCurrentLetter(`bye`);
        }
      }, (1000 * i));

      animations.push(animation);

      dispatch({type: 'START_ANIMATION', animations: animations});
    }
  }, [answer]);

  return <>
    {status === 'COMPLETE' &&
      <div className={`board-holder ${boardReady ? 'board-display' : ''} ${currentLetter}`} >
        <div className="board"></div>
      </div>  
    }
  </>
}

export default Board;