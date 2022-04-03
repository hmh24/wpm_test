import React from 'react';
import {render} from 'react-dom'; 
import PageRoutes from './PageRoutes';


function App() {
    return (
        <div>
            <PageRoutes/>
        </div>
    );
}

export default App;

const appDiv = document.getElementById("app");
render(<App/>, appDiv);