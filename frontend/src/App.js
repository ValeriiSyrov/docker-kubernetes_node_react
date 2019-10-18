import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Manager from './components/manager'
import Statistics from './components/statistics'


function App() {
  return (
    <Router>
     <div className="nav">
          <Link to="/manager">Manager</Link>
          <Link to="/Statistics">Statistics</Link>
     </div>
     <Route exact path="/manager" component={Manager} />
     <Route path="/Statistics" component={Statistics} />
  </Router>
  );
}

export default App;
