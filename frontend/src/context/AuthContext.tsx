"use client";
import {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged, signOut, User} from "firebase/auth";
import {auth} from "@/lib/firebase";

const AuthContext = createContext<{
    user: User | null;
    logout: () => void;
}>({
    user: null,
    logout: () => {
    },
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });

        return () => unsubscribe();
    }, []);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{user, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);