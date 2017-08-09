import React from 'react';
import {Todo} from './todo.jsx';
import {Login} from './login.jsx';

export class SinglePageApp extends React.Component {
	constructor(){
		super();
		this.state = {
			token: false,
			username: false
		}
	}

	componentWillMount() {
		if (localStorage.token)
			this.setState({
				token: localStorage.token,
				username: localStorage.username
			})
	}

	logout() {
		$.ajax({
            url: "http://localhost:3000/user/logout",
            method: "GET",
            data: {
                sessionId: this.state.token
            }
        }).done((response) => {
            if (response.error)
                return alert(response.error);

		    this.setState({
				token: false,
				username: false
			})
			localStorage.clear();
        });

	}

	saveToken(token, username) {
		this.setState({
			token: token,
			username: username
		})

		localStorage.setItem('token', token);
		localStorage.setItem('username', username);
	}

	render() {
		let s = this.state;

		return (
			<div className="">
				<div className="header">
					<div className="container">
						<img src="/public/img/logo.png" />
						{s.username && (
							<div className="button-holder">
								<i onClick={this.logout.bind(this)} className="small material-icons">exit_to_app</i>		
							</div>
						)
						 
						}
					</div>
				</div>   
				<div className="content">
					<div className="container">
						{s.token ? 
							<Todo token={s.token} user={s.username} />
						:
							<Login returnSession={this.saveToken.bind(this)} />
						}
					</div>
				</div>
			</div>

		)
	}
}