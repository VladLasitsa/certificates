import React from 'react';

import {userService} from '../service/user.service';
import {valueLessThan} from "../validation/FormValidation";
import {valueGreaterOrEqualThan} from "../validation/FormValidation";
import {Header} from "./part/Header";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            usernameError: '',
            passwordError: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userNameInput = this.userNameInput.bind(this);
        this.passwordInput = this.passwordInput.bind(this);
    }

    userNameInput(e) {
        this.handleChange(e);
        const {value} = e.target;
        if (valueGreaterOrEqualThan(value.length, 30)) {
            this.setState({usernameError: "Login field length must not be greater than 30 characters."});
        } else {
            this.setState({usernameError: ""});
        }
    }

    passwordInput(e) {
        this.handleChange(e);
        const {value} = e.target;
        if (valueLessThan(value.length, 4)) {
            this.setState({passwordError: "Password length must not be less than 4 characters"});
        } else {
            this.setState({passwordError: ""});
        }
        // passwordInputValidation(e);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {username, password, returnUrl} = this.state;

        // stop here if form is invalid
        if (!(username && password) || !valueLessThan(username.length, 30) || !valueGreaterOrEqualThan(password.length, 4)) {
            return;
        }
        this.setState({loading: true});
        userService.login(username, password)
            .then(
                user => {
                    const {from} = this.props.location.state || {from: {pathname: "/"}};
                    this.props.history.push(from);
                },
                error => this.setState({error, loading: false})
            );
    }

    render() {
        const {username, password, submitted, loading, error, usernameError, passwordError} = this.state;
        return (
            <div>
                <Header/>
                <div className="container mt-5 p-5 shadow rounded-sm">
                    <h2>Certificates</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username && usernameError ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username}
                                   onChange={this.userNameInput}/>
                            {submitted && !username &&
                            <div className="help-block">Username is required</div>
                            }
                            {usernameError && <div className="help-block">{this.state.usernameError}</div>}
                        </div>
                        <div className={'form-group' + (submitted && !username && passwordError ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username}
                                   onChange={this.userNameInput}/>
                            {submitted && !username &&
                            <div className="help-block">Username is required</div>
                            }
                            {usernameError && <div className="help-block">{this.state.usernameError}</div>}
                        </div>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username}
                                   onChange={this.userNameInput}/>
                            {submitted && !username &&
                            <div className="help-block">Username is required</div>
                            }
                            {usernameError && <div className="help-block">{this.state.usernameError}</div>}
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password}
                                   onChange={this.passwordInput}/>
                            {submitted && !password &&
                            <div className="help-block">Password is required</div>
                            }
                            {passwordError && <div className="help-block">{this.state.passwordError}</div>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>Login</button>
                            {loading &&
                            <img
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                            }
                        </div>
                        {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export {RegisterPage};