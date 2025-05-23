"use client";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "@/lib/firebase";

export default function TrainingPage() {
    const {user} = useAuth();
    const router = useRouter();
    const [trainingText, setTrainingText] = useState("");


    useEffect(() => {
        if (user === null) {
            router.push("/auth");
        }
    }, [user, router]);

    useEffect(() => {
        const fetchTrainingText = async () => {
            const querySnapshot = await getDocs(collection(db, "trainingText"));
            querySnapshot.forEach((doc) => {
                setTrainingText(doc.data().text);
            });
        };
        if (user) {
            fetchTrainingText();
        }
    }, [user]);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white">Training Page</h2>
            <p className="text-gray-300 mt-2">{trainingText || "Loading..."}</p>
        </div>
    );
}