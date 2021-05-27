import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks'
import TaskForm from './pages/Tasks/Form'
import TaskDetail from './pages/Tasks/Details'

const Routes: React.FC = () => {
  return(
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tasks" exact component={Tasks} />
          <Route path="/newTask" exact component={TaskForm} />
          <Route path="/newTask/:id" exact component={TaskForm} />
          <Route path="/tasks/:id" exact component={TaskDetail} />
      </Switch> 
  );
}

export default Routes;