import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';


class Profile extends Component {
    constructor() {
        super();

        this.state = {
            first_name: '',
            last_name: '',
            email: ''
        }
    }

    componentDidMount() {
        const token = localStorage.utoken;

        try {
            const decoded = jwt_decode(token);
            this.setState({
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email: decoded.email
            })
        } catch(e) {
            console.log('error: ' + e);
            this.props.history.push('/');
        }
        
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Perfil</h1>
                    </div>

                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Nome</td>
                                <td>{this.state.first_name}</td>
                            </tr>

                            <tr>
                                <td>Sobrenome</td>
                                <td>{this.state.last_name}</td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}

export default Profile;