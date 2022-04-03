import React from "react";
import { useState } from "react";
import axios from 'axios';
import cookie from 'react-cookies';

function EnterText(props) {
    const [curr, setCurr] = useState("");
    const [wpm, setWpm] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const gotID = JSON.stringify(props.scores.id)
    const redirectID = "/type/home/" + gotID;
    let displayScores = JSON.stringify(props.scores.all_scores);

    if(displayScores == "[]") {
      displayScores = "No games played";
    }
    if (displayScores != null && displayScores != "No games played"){
      displayScores = displayScores.substring(2, displayScores.length-2).split("\",\"");
      displayScores = displayScores.slice(-5).join(", ");
    }

    const textAreaChange = (textArea) => {
      if(!hasStarted) {
        setHasStarted(true);
        setStartTime(new Date().getTime()/1000);
        
      }

      if(textArea.value === props.test) {
        textArea.setAttribute("disabled", "");

        const timeToFinish = (new Date().getTime()/1000 - startTime)/60;
        const finalWPM = parseInt(props.wordCount/timeToFinish)
        setWpm(finalWPM);
        props.scores.all_scores.push(finalWPM.toString());
      
        const headers = {
          'Content-Type': 'application/json',
          headers: {"X-CSRFToken": cookie.load('csrftoken')}
        };

        axios.put(`https://wpm-test.herokuapp.com/api/${props.scores.id.toString()}/`, {
          all_scores: props.scores.all_scores
        }, headers)
        .then(res => console.log(res));
      } else {
        const timeElapsed = (new Date().getTime()/1000 - startTime)/60;
        setWpm(parseInt(props.completedWordCount/timeElapsed));
      }

      setCurr(textArea.value);
      props.newUserInput(textArea.value);
    };

    const newGame = (newGameBtn) => {
      setCurr("");
      setWpm(0);
      setStartTime(0);
      setHasStarted(false);
      props.newUserInput("");
      props.newTest();

      let textArea = document.getElementById("text-area");
      if(textArea.hasAttribute("disabled")) {
        textArea.removeAttribute("disabled");
      }
    }

    return (
      <div >
        <textarea style={{margin: "2em 0"}} class="form-control" id="text-area" rows="6" placeholder="Start typing..." value={curr} onChange={ (e) => textAreaChange(e.target)}></textarea>
        <div>
          <h5 style={{display: "inline"}}>{wpm} WPM</h5>    
          <button class="btn btn-outline-secondary btn-sm float-end" id="startNewGame" onClick={(e) => newGame(e.target)}>New Game</button>
        </div>
        <div style={{marginTop: "5%"}} class="text-center">
          <h5>Last 5 Games: {displayScores}</h5>
        </div>
      </div>
      
    );
  }
  
  EnterText.defaultProps = {
    wpm: "default",
    text: "default"
  }

export default EnterText;