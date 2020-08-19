
import React, { Component } from 'react';
import { fetchToDos, updateToDo, createToDo } from './todo-api.js';


export default class ListPage extends Component {
    state = {
        todos: []
    }

    componentDidMount = async () => {
        if (!this.props.token) {
            this.props.history.push('/login');
        } else {
            const data = await fetchToDos(this.props.token)

            this.setState({
                todos: data.body
            })
        }
    }

    handleToDoChange = e => {
        this.setState({todo: e.target.value })
    }

    handleCompleted = async (id, todo) => {
        await updateToDo(
            id,
            {
                todo: todo.todo,
                completed: true
            }
        );
        const data = await fetchToDos(this.props.token)

        this.setState({ todos: data.body })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createToDo({
                todo: this.state.todo,
                completed: false,
            });

            this.setState({
                todo: '',
            });

            const data = await fetchToDos(this.props.token)

            this.setState({ todos: data.body })
        } catch(e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <div>
                Daily Monster Duties
                <div className="todo-list">
                    {
                        this.state.todos.map(todo => {
                        if(todo.completed ===false) {
                        return <div className="todo" key={`${todo.id}`}>
                            <p>Task: {todo.todo}</p>
                            <button onClick={() => this.handleCompleted(todo.id, todo)}>Completed!</button>
                            </div>
                        } else {
                            return <div className="task complete" key={`${todo.id}`}>
                                <p>Task: {todo.todo}</p>
                            </div>
                        }
                        })
                    }
                </div>
                <div>
                    Create A Task
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input onChange={e => this.setState({ todo: e.target.value })} value={this.state.todo}/>
                            </label>
                            <button>Add Task</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
