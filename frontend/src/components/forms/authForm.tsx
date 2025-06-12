'use client';
import {useEffect, useState} from 'react';
import {auth} from '@/lib/firebase';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider, sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import {FirebaseError} from "@firebase/util";

export default function AuthForm() {
    const {user} = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const getFriendlyError = (code: string): string => {
        switch (code) {
            case "auth/invalid-email":
                return "The email address is not valid.";
            case "auth/user-not-found":
                return "No user found with this email.";
            case "auth/wrong-password":
            case "auth/invalid-credential":
                return "Incorrect email or password.";
            case "auth/email-already-in-use":
                return "This email is already registered.";
            case "auth/weak-password":
                return "Password should be at least 6 characters.";
            case "auth/popup-closed-by-user":
                return "Google sign-in was cancelled.";
            default:
                return "An unexpected error occurred. Please try again.";
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push("/");
        } catch (error) {
            setMessage(getFriendlyError((error as FirebaseError).code));
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/education");
        } catch (error) {
            setMessage(getFriendlyError((error as FirebaseError).code));
        }
    };

    const handleForgotPassword = async () => {
        if (!resetEmail) {
            setMessage("Please enter your email address.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setMessage("Password reset email sent. Please check your inbox.");
            setResetEmail("");
            setShowReset(false);
        } catch (error) {
            setMessage(getFriendlyError((error as FirebaseError).code));
        }
    };

    if (user) {
        return null;
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
                {isRegister ? "Register as a new user" : "Login"}
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="w-full p-2 rounded bg-zinc-800 text-white"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="w-full p-2 rounded bg-zinc-800 text-white"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-indigo-500 px-4 py-2 rounded text-white cursor-pointer">
                    {isRegister ? "Register" : "Login"}
                </button>

                {!isRegister && (
                    <div className="text-sm text-center mt-2 text-gray-400">
                        <button
                            type="button"
                            onClick={() => setShowReset(!showReset)}
                            className="text-indigo-400 underline cursor-pointer"
                        >
                            Forgot your password?
                        </button>
                    </div>
                )}
            </form>

            {showReset && (
                <div className="mt-4 p-4 bg-zinc-700 rounded space-y-3">
                    <h3 className="text-white text-sm font-semibold">Reset your password</h3>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={resetEmail}
                        className="w-full p-2 rounded bg-zinc-800 text-white"
                        onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <button
                        onClick={handleForgotPassword}
                        className="bg-indigo-600 px-4 py-2 rounded text-white w-full cursor-pointer"
                    >
                        Send reset email
                    </button>
                </div>
            )}

            {message && (
                <div className="mb-4 mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-sm">
                    {message}
                </div>
            )}

            <hr className="border-gray-300 mt-4"/>
            <div className="mt-4 text-center">
                <button
                    onClick={handleGoogleSignIn}
                    className="bg-red-500 px-4 py-2 rounded text-white cursor-pointer"
                >
                    Sign in with Google
                </button>
            </div>

            <p className="text-gray-400 text-sm text-center mt-4">
                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                    className="text-indigo-400 underline cursor-pointer"
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setMessage("");
                        setShowReset(false);
                    }}
                >
                    {isRegister ? "Login" : "Register"}
                </button>
            </p>
        </div>
    );
}

