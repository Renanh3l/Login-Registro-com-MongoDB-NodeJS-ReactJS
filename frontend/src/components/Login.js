import React, {Component} from 'react'

import {login, validEmail} from './UserFunctions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        try {

            const user = {
                email: this.state.email,
                password: this.state.password
            }
            
            if (!user || !user.email || !user.password || !validEmail(user.email)) {
                console.log('Digite dados válidos!');
            } else {
                login(user).then(res => {
                    if (res) {
                        this.props.history.push('/profile');
                    }
                })
            }
        } catch(e) {
            console.log('error: ' + e);
        }
        
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Fazer login</h1>

                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={this.state.email}
                                onChange={this.onChange} />
                                
                                <label htmlFor="password">Senha</label>
                                <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Digite sua senha"
                                value={this.state.password}
                                onChange={this.onChange} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;