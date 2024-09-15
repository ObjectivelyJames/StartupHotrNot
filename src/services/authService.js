import { useState, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'https://3329-2605-8d80-4c1-6697-8922-9d69-d077-1946.ngrok-free.app'

export function AuthProvider({ children }) {
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

function useAuthProvider() {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        //if user includes user, then its a user, if it includes startup, its a startup
        if (username.toLowerCase().includes('user')) {
            setUser({ email: username, type: 'user' });
            return { email: username, type: 'user' }

        } else if (username.toLowerCase().includes('startup')) {
            setUser({ email: username, type: 'startup' });
            return { email: username, type: 'startup' }
        }
    };

    const registerUser = (data) => {
        console.log(data)
        axios.post(`${API_URL}/user`, data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        setUser({ ...data, type: 'user' });
    };

    const registerStartup = (data) => {
        axios.post(`${API_URL}/startup`, data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        setUser({ ...data, type: 'startup' });
    };

    const logout = () => {
        setUser(null);
    };

    return {
        user,
        registerUser,
        registerStartup,
        login,
        logout,
    };
}