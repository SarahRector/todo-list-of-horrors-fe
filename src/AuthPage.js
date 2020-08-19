import React, { Component } from 'react';
import { signUp, signIn } from './todo-api.js';
import { Link } from 'react-router-dom';

export default class AuthPage extends Component {
    state = {
        signInEmail: '',
        signInPassword: '',
        signUpEmail: '',
        signUpPassword: ''
    }

    handleSignUp = async (e) => {
        e.preventDefault();

        const user = await signUp({
            email: this.state.signUpEmail,
            password: this.state.signUpPassword
        });

        this.props.handleToken(user.body.token);
        this.props.history.push('/list');
    }

    handleSignIn = async (e) => {
        e.preventDefault();

        const user = await signIn({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        });

        this.props.handleToken(user.body.token);
        this.props.history.push('/list');
    }

    render() {
        return (
            <div>
                <Link to='/'>Home</Link>
                <form onSubmit={this.handleSignIn}>
                    Sign In Here!
                    <label>
                        Email
                        <input onChange={e => this.setState({ signInEmail: e.target.value })} value={this.state.signInEmail}/>
                    </label>
                    <label>
                        Password
                        <input type="password" onChange={e => this.setState({ signInPassword: e.target.value })} value={this.state.signInPassword}/>
                    </label>
                    <button>Submit</button>
                </form>
                <form onSubmit={this.handleSignUp}>
                    First Time? Sign Up Here!
                    <label>
                        Email
                        <input onChange={e => this.setState({ signUpEmail: e.target.value })} value={this.state.signUpEmail}/>
                    </label>
                    <label>
                        Password
                        <input type="password" onChange={e => this.setState({ signUpPassword: e.target.value })} value={this.state.signUpPassword}/>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}