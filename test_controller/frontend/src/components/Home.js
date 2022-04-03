import React from 'react';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';


function Home() {
  const {scoresID} = useParams();
  const backRedirect = "/type/" + scoresID;


  return (
      <div>
        <Navbar/>
        <div class="mx-auto col-md-5" style={{margin: "5%"}}>
          <div class="text-center">
            <h1>Typing Speed Test</h1>
            <br />
            <h5>Test your typing speed by typing the text as fast as you can. GLHF!</h5>
            <h5>Thanks for playing! :)</h5>
            <a style={{margin: "2em 0"}} class="btn btn-outline-primary" href={backRedirect}>Keep Playing</a> <br></br> 
          </div>
        </div>
        <Footer/>
       </div>
  );
  
}

export default Home;


