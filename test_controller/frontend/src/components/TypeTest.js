import React from 'react';
import EnterText from './EnterText';
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const {sentence}  = require('txtgen/dist/cjs/txtgen.js');

function TypeTest() {
    const [test, setTest] = useState(sentence() + " " + sentence() + " " +sentence() + " " + sentence());
    const [displayTest, setDisplayTest] = useState({correct: "", incorrect: "", remaining: test});
    const [completedWordCount, setCompletedWordCount] = useState(0);
    const wordCount = test.split(" ").length;
    const [allScores, setAllScores] = useState({});
    const {scoresID} = useParams();
    const gotID = JSON.stringify(allScores.id)
    const redirectID = "/type/home/" + gotID;
    
    useEffect(() => {
        axios.get(`https://wpm-test.herokuapp.com/api/${scoresID}/`)
            .then(res => {
                setAllScores(res.data);
            })
    }, []);
    
    const updateInput = (userInput) => {
        let isAllCorrect = true; 
        for(let i = 0; i < userInput.length; i++) {
          if(test.charAt(i) !== userInput.charAt(i)) {
            setDisplayTest({correct: test.substring(0, i), incorrect: test.substring(i, userInput.length), remaining: test.substring(userInput.length, test.length)} );
            setCompletedWordCount(test.substring(0, i).split(" ").length );
            isAllCorrect = false; 
            break;
          }
        }
        if(isAllCorrect) {
          setDisplayTest({correct: test.substring(0, userInput.length), remaining: test.substring(userInput.length, test.length)});
          setCompletedWordCount(test.substring(0, userInput.length).split(" ").length );
        }
    }

    const updateTest = () => {
      const newTest = sentence() + " " + sentence() + " " +sentence() + " " + sentence();
      setTest(newTest);
      updateDisplayTest(newTest);
    }

    const updateDisplayTest = (newTest) => {
      setDisplayTest({correct: "", incorrect: "", remaining: newTest});
    }

    return (
      <div className="TypeTest" >
        <nav class="navbar navbar-dark bg-primary" style={{marginBottom: "1%"}}>
          <div class="container-fluid">
            <a class="navbar-brand" href={redirectID}>Home</a>
            <a class="navbar-text" href="/logout">Logout</a> 
          </div>
        </nav>
        <div class="mx-auto col-md-9" style={{marginTop: "2em"}}>
          <p style={{userSelect: "none"}}><span style={{color: "rgb(62, 143, 62)",  borderRight: "1px solid black"}}>{displayTest.correct}</span><span style={{backgroundColor: "rgb(254, 149, 149)"}}>{displayTest.incorrect}</span>{displayTest.remaining}</p>
          <EnterText scores={allScores} test={test} wordCount={wordCount} completedWordCount={completedWordCount} newUserInput={updateInput} newTest={updateTest}/>
        </div>
      </div>
    );
    
  }
  
  export default TypeTest;
  