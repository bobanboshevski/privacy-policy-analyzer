"use client";

import {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import GdprInputFormContainer from "@/components/forms/gdpr/GdprInputFormContainer";

export default function GdprPage() {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/auth");
        }
    }, [user, router]);

    return (
        <div
            className="w-full max-w-4xl flex flex-col gap-4 items-center justify-items-center min-h-screen mt-30 text-center mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Analyze Your Privacy Policy for GDPR
                Compliance</h1>
            <GdprInputFormContainer/>
        </div>
    )
}