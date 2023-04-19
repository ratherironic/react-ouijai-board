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
    answer.replace(/\s/g, '');
    answer.toLowerCase();

    let animations:  Array<ReturnType<typeof setTimeout>> = [];

    for (let i = 0; i < (answer.length + 1); i++) {
      let animation = setTimeout(() => {
        if(answer.charAt(i) !== '') {
          if(/^-?\d+$/.test(answer.charAt(i))) {
            setCurrentLetter(`num${answer.charAt(i)}`);
          } else {
            setCurrentLetter(`${answer.charAt(i)}`);
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