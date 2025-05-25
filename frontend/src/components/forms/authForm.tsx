'use client';
import {useState} from 'react';
import {auth} from '@/lib/firebase';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import {useRouter} from "next/navigation";

export default function AuthForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push("/training");
        } catch (error) {
            // alert("Login failed: " + (error as Error).message);
            alert(`${isRegister ? "Registration" : "Login"} failed: ${(error as Error).message}`);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/training");
        } catch (error) {
            alert("Google login failed: " + (error as Error).message);
        }
    };

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
                {/*<button type="submit" className="bg-indigo-500 px-4 py-2 rounded text-white">Login</button>*/}
                <button type="submit" className="bg-indigo-500 px-4 py-2 rounded text-white cursor-pointer">
                    {isRegister ? "Register" : "Login"}
                </button>

            </form>
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
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Login" : "Register"}
                </button>
            </p>

        </div>
    );
}

