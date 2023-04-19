import { useState, useContext } from "react";
import { AppContext, AppDispatchContext } from "../context/AppContext";


function QuestionForm () {
  const [question, setQuestion] = useState('');
  const appState = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'LOADING', question: question});

    fetch(`http://localhost:3001/ask/${encodeURIComponent(question)}`)
    .then(res => res.json())
    .then(data => {
        dispatch({ type: 'COMPLETE', data: data.content });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  }

  return (<>
    {appState.status === 'ASK' &&
      <form onSubmit={handleSubmit} >
        <div className={`form-content app-content-holder ${appState.status === 'ASK' ? 'active' : ''}`}>
          <label htmlFor="question">What do you request<br/> of the spirits?</label>
          <input 
            value={question} 
            onChange={handleChange}
            type="text" />
        </div>
        <button>Contact The Spirits!</button>
      </form>
    }
  </>);
}

export default QuestionForm;

