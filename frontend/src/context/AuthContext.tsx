"use client";
import {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged, signOut, User} from "firebase/auth";
import {auth} from "@/lib/firebase";

const AuthContext = createContext<{
    user: User | null;
    loading: boolean;
    logout: () => void;
}>({
    user: null,
    loading: true,
    logout: () => {
    },
});

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{user, loading, logout}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);