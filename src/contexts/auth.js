import { useState, createContext } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [usuario, setUsuario] = useState(null)

    async function SignIn(credentials) {
        setUsuario(credentials.usuario)
        const response = await fetch('http://localhost:5000/api/login/',
            {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(credentials)
            })

        if (response.ok) {
            //setToken();
            sessionStorage.token = await response.json().then((e) => e.token)
            return 1;

        }
        else if (response.status === 403) {
            alert("Senha expirada")
            return 0;
        }
        else if (response.status === 404) {
            alert("Usuario/Senha não encontrado")
            return 0;
        }
    }

    return (
        <AuthContext.Provider value={{ token, setToken, SignIn, usuario }}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthProvider
