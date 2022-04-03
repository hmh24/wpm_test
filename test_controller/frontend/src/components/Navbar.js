import React from 'react';

function Navbar() {
  return (
    <div>
        <nav class="navbar navbar-dark bg-primary" style={{marginBottom: "1%"}}>
          <div class="container-fluid">
            <a class="navbar-brand" href=".">Home</a>
            <a class="navbar-text" href="/logout">Logout</a> 
          </div>
        </nav>
    </div>
    
  );
  
}

export default Navbar;
