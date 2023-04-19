import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

import './Loader.css';

function Loader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { status } = useContext(AppContext);


  useEffect(() => {
    if(status === 'LOADING') {
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);
    } else {
      setIsLoaded(false);
    }
  }, [status]);

  return <>
    {status  === 'LOADING' &&
      <div className={`loader-holder board-details-content board-display app-content-holder ${isLoaded ? 'is-loading' : ''}`}>
        <h1>Loading...</h1>
      </div>
    }
  </>
}

export default Loader;