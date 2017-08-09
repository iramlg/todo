import React from 'react';

export class Login extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    handleLogin(e) {
        e.preventDefault();

        let username = this.refs.login.value;
        let password = this.refs.password.value;
        
        if (!username.length || !password.length) {
            return alert('Fill access data!');
        }

        $.ajax({
            url: "http://localhost:3000/user/auth",
            method: "POST",
            data: {
                username: username,
                password: md5(password)
            }
        }).done((response) => {
            if (response.error)
                return alert(response.error);

            this.props.returnSession(response.sessionId, username);
        });
    }

    render() {
        let s = this.state;
        let p = this.props;

        return (
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card-panel">
                        <h2>Login</h2>
                        <form onSubmit={this.handleLogin.bind(this)}>
                            <div className="input-field">
                                <input id="login" type="text" ref="login" className="validate" />
                                <label htmlFor="login">Login</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="password" ref="password" className="validate" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="right-align">
                                <input type="submit" className="waves-effect waves-light btn" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}