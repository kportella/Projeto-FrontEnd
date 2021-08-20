import './Login.css';
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

function Login() {
    const [usuario, setUsername] = useState("");
    const [senha, setPassword] = useState("");

    const { SignIn } = useContext(AuthContext)

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        SignIn({ usuario, senha })
    }
    return (
        <div>
            <h2>Login</h2>
            <div className='login'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input type='text'
                            name='user'
                            value={usuario}
                            onChange={e => setUsername(e.target.value)}
                            id='uname'></input>
                    </label>
                    <br />
                    <label>
                        Password
                        <input type='password'
                            name='password'
                            values={senha}
                            onChange={e => setPassword(e.target.value)}
                            id='password'></input>
                    </label>
                    <br />
                    <br />
                    <input type='submit' value='Submit' id='log' />
                </form>
            </div>
        </div >
    );
}

export default Login;
