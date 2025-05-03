// import Image from "next/image";
'use client';


import {useEffect, useState} from "react";

export default function Home() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl || '');
                const text = await response.text();
                setMessage(text)
            } catch (err) {
                console.error("No communication with backend:", err);
                setMessage("Error getting data from backend!");
            }
        };
        fetchData();
    },[]);

    return (
        <div className="grid min-h-screen items-center justify-items-center bg-black text-white">
            <main className="flex flex-col gap-4 items-center">
                <h1 className="text-4xl font-bold">Hello World</h1>
                <p>{message}</p>
            </main>
        </div>
    );
}
