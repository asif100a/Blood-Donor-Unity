import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.conf";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isPending, setIsPending] = useState(true);

    // Register the user
    const registerUser = (email, password) => {
        setIsPending(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login the user
    const loginUser = (email, password) => {
        setIsPending(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Log out the user
    const logoutUser = () => {
        setIsPending(true);
        return signOut(auth);
    };

    // State change of user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            setIsPending(false);
        });

        return() => {
            unsubscribe();
        };
    }, []);

    // Share the auth data to it's children components
    const authData = {
        user,
        isPending,
        registerUser,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;