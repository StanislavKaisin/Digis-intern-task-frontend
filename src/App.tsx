import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { HomePage } from './pages/HomePage';
import { User } from './pages/User';
import { Alert } from './pages/Alert';
import UserSignUp from './pages/UserSignUp';
import UserSignIn from './pages/UserSignIn';


function App() {
  return (
    <>
    <BrowserRouter >
       <div>
         <nav>
           <ul>
             <li>
               <Link to="/">Home</Link>
             </li>
             <li>
               <Link to="/user">User Profile</Link>
             </li>
             <li>
               <Link to="/user/signup">
                 User SignUp
               </Link>
             </li>
             <li>
               <Link to="/user/signin">
                 User SignIn
               </Link>
             </li>
             <li>
               <Link to="/alert">Alert</Link>
             </li>
           </ul>
         </nav>
 
         <Route path="/" exact component={HomePage} />
         <Route path="/user" exact component={User} />
         <Route path="/user/signup" exact component={UserSignUp} />
         <Route path="/user/signin" exact component={UserSignIn} />
         <Route path="/alert" exact component={Alert} />


       </div>
     </BrowserRouter >
    {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div> */}
    </>
  );
}

export default App;
