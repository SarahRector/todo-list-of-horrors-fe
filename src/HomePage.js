import React, { Component } from 'react'

export default class ListPage extends Component {

    handleClick = e => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <p>Welcome to Monster To Do! The most efficient app for all of your monster to-do list needs.</p>
                <button onClick={this.handleClick}>Click Here to Sign In</button>
            </div>
        )
    }
}