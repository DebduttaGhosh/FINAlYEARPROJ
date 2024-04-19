import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hero from './Hero/Hero';
import Year from './Year/Year'; 
import Year2 from './Year2/Year2'; 
import Edit from './Edit/Edit'; 
import Add from './Add/Add'
import Year4 from './Year4/Year4';
import Year3 from './Year3/Year3';
import Search from './Search/Search'

function App() {
  return (
    <Router>
      <div className='w-full h-20 bg-blue-200'></div>
      <div className="">
        <Switch>
          <Route exact path="/" component={Hero} />
          <Route path="/year1/:year" component={Year} />
          <Route path="/year2/:year" component={Year2} />
          <Route path="/year3/:year" component={Year3} />
          <Route path="/year4/:year" component={Year4} />
          <Route path="edit-student/:year/:id" component={Edit} />
          <Route path="/add/:year" component={Add} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
