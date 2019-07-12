import React, {Component} from 'react'

import {register, validEmail} from './UserFunctions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
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
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            }
            
            if (!user || !user.email || !user.password || !validEmail(user.email) || user.password.length < 4) {
                console.log('Digite dados válidos!');
            } else {
                register(user).then(res => {
                    this.props.history.push('/login');
                })
            }
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Cadastre-se</h1>

                            <div className="form-group">
                                <label htmlFor="first_name">Nome</label>
                                <input type="text"
                                className="form-control"
                                name="first_name"
                                placeholder="Digite seu nome"
                                value={this.state.first_name}
                                onChange={this.onChange} />

                                <label htmlFor="last_name">Sobrenome</label>
                                <input type="text"
                                className="form-control"
                                name="last_name"
                                placeholder="Digite seu sobrenome"
                                value={this.state.last_name}
                                onChange={this.onChange} />

                                <label htmlFor="email">E-mail *</label>
                                <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={this.state.email}
                                onChange={this.onChange} />
                                
                                <label htmlFor="password">Senha *</label>
                                <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Digite sua senha"
                                value={this.state.password}
                                onChange={this.onChange} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;