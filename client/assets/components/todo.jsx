import React from 'react';

export class Todo extends React.Component {
    constructor(){
        super();
        this.state = {
            tasks: []
        }
    }

    componentWillMount() {
        let videos = [];
        let promises = [];

        $.ajax({
            url: "http://localhost:3000/todos",
            method: "GET",
            data: {
                sessionId: this.props.token
            }
        }).done((response) => {
            this.setState({
                tasks: response.data
            })
        });
    }

    componentDidUpdate(prevProps, prevState) {
        setTimeout(() => {
            $('.draggable-area').css('min-height', $('.home').height() - 84);
        }, 1000)
    }
     
    dragEnter(currentBox, event) {
        event.preventDefault();
        this.setState({
            currentBox: currentBox
        })
    }
     
    dragDrop(task, ev) {
        if (task.status !== this.state.currentBox) {
            let tasks = this.state.tasks.map((item) => {
                if (item._id === task._id) 
                    item.status = this.state.currentBox;

                return item;
            })

            $.ajax({
                url: "http://localhost:3000/todo?sessionId=" + this.props.token,
                method: "PUT",
                data: {
                    _id: task._id,
                    status:this.state.currentBox
                }
            }).done((response) => {
                if (response.error)
                    return alert(response.error);

                this.setState({
                    tasks: tasks
                })
            });
        }
        ev.stopPropagation();
    }

    removeTask(id) {
        $.ajax({
            url: "http://localhost:3000/todo?sessionId=" + this.props.token,
            method: "DELETE",
            data: {
                id: id
            }
        }).done((response) => {
            if (response.error)
                return alert(response.error);

            let tasks = this.state.tasks.reduce((item) => {
                if (item._id !== id) 
                    return item;
            })

            this.setState({
                tasks: tasks
            })

        });
    }

    addTask() {
        $.ajax({
            url: "http://localhost:3000/todo?sessionId=" + this.props.token,
            method: "PUT",
            data: {
                title: ,
                description: ,
                status: 
            }
        }).done((response) => {
            if (response.error)
                return alert(response.error);

            let tasks = this.state.tasks.reduce((item) => {
                if (item._id !== id) 
                    return item;
            })

            this.setState({
                tasks: tasks
            })

        });
    }

    render() {
        let s = this.state;
        let p = this.props;

        return (
            <div className="home row" >
                <div className="col s12 m6" >
                    <h2>In Progress</h2>
                    <div 
                        className="draggable-area"
                        onDragEnter={this.dragEnter.bind(this, 'notCompleted')}
                    >
                        {s.tasks.map((task, i) => {
                            if (task.status === "notCompleted") {
                                return (
                                    <div className="card-box" key={i} id={i} onDragEnd={this.dragDrop.bind(this, task)} draggable="true">
                                        {(p.user == task.author.username) && <div className="button-holder">
                                            <i onClick={this.removeTask.bind(this, task._id)} className="small material-icons">close</i>        
                                        </div>}
                                        <p className="title">{task.title}</p>
                                        <div className="description" dangerouslySetInnerHTML={{__html: task.description}}></div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>

                <div className="col s12 m6">
                    <h2>Completed</h2>
                    <div 
                        className="draggable-area" 
                        onDragEnter={this.dragEnter.bind(this, 'completed')}
                    > 
                        {s.tasks.map((task, i) => {
                            if (task.status === "completed") {
                                return (
                                    <div className="card-box" key={i} id={i} onDragEnd={this.dragDrop.bind(this, task)} draggable="true">
                                        <p className="title">{task.title}</p>
                                        <div className="description" dangerouslySetInnerHTML={{__html: task.description}}></div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>

        )
    }
}