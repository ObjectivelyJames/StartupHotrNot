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

    const login = () => {
        // Implement login logic
        setUser({ email: 'user@example.com' });
    };

    const registerUser = () => {
        // Implement register logic
        setUser({ email: 'user@example.com' });
    };

    const registerStartup = () => {
        // Implement register logic
        setUser({ email: 'user@example.com' });
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