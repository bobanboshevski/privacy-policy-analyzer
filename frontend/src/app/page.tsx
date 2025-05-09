'use client';

import InputFormContainer from "@/components/forms/InputFormContainer";
import {useApiData} from "@/hooks/useApiData";

export default function Home() {

    const {message, loading, error} = useApiData();

    return (
        <div className="flex flex-col gap-4 items-center justify-items-center min-h-screen mt-12">
            <h1 className="text-4xl font-bold">Privacy Policy Analyzer</h1>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="bg-gray-800 p-6 rounded-lg">
                    <p>{message}</p>
                </div>
            )}

            <InputFormContainer/>
        </div>
        //</div>
    );
}
