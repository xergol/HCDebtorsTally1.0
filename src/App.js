import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Form from './components/Form';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Reports from './components/Reports';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact component={Form} />
        <Route path="/search" exact component={Search} />
        <Route path="/reports" exact component={Reports}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
