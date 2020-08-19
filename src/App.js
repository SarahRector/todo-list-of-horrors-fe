import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import HomePage from './HomePage.js';
import AuthPage from './AuthPage.js';
import ListPage from './ListPage.js';
import './App.css';

export default class App extends Component {
    state = {
      token: localStorage.getItem('token'),
    }

    handleToken = (token) => {
      this.setState({ token: token })
      localStorage.setItem('token', token)
    }

    clearToken = () => {
      this.setState({ token: '' })
      localStorage.setItem('token', '')
    }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <Router>
              <main>
                <div className="sidebar">
                  {
                    this.state.token &&
                    <>
                    <Link to='/'>Home</Link>
                    <Link to='/login'>Login</Link>
                    <Link to='/list'>My To Do</Link>
                    <Link to='/login'>
                      <button onClick={this.clearToken}>Log Out</button>
                    </Link>
                    </>
                  }
                </div>
                  <Switch>
                      <Route 
                          path="/" 
                          exact
                          render={(routerProps) => <HomePage {...routerProps} />} 
                      />
                      <Route 
                          path="/login" 
                          exact
                          render={(routerProps) => <AuthPage handleToken={this.handleToken} token={this.state.token} {...routerProps} />}                         />
                      <Route 
                        path="/list" 
                        exact
                        render={(routerProps) => <ListPage token={this.state.token} {...routerProps} />} 
                      />
                  </Switch>

              </main>
            </Router>
          </header>
        </div>
      )
    }
}