import { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

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

    const registerUser = () => {
        // Implement register logic
        setUser({ email: 'user@example.com', type: 'user' });
    };

    const registerStartup = () => {
        // Implement register logic
        setUser({ email: 'startup@example.com', type: 'startup' });
    };

    const logout = () => {
        // Perform your logout logic here
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