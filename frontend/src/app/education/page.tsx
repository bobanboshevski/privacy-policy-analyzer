"use client";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getTrainingText} from "@/services/education";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {TrainingItem} from "@/lib/types/education";

export default function TrainingPage() {
    const {user} = useAuth();
    const router = useRouter();
    const [trainingItems, setTrainingItems] = useState<TrainingItem[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (user === null) {
            router.push("/auth");
        }
    }, [user, router]);

    useEffect(() => {
        const fetchTrainingText = async () => {
            try {
                const data = await getTrainingText();
                setTrainingItems(data.trainingItems);
            } catch (error) {
                console.error("Error fetching education data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchTrainingText();
        }
    }, [user]);

    function extractYouTubeId(url: string): string | null {
        const match = url.match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
        );
        return match ? match[1] : "";
    }

    return (
        <div className="p-8 max-w-6xl">
            <h2 className="text-4xl text-center font-bold text-white">Education Center</h2>

            {loading ? (
                // <p className="text-gray-300 mt-2">Loading...</p>
                <LoadingSpinner/>
            ) : (
                trainingItems.map((item, idx) => (
                    <div key={idx} className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-300 mt-1">{item.description}</p>
                        <div className="text-gray-400 mt-2 whitespace-pre-line">{item.content}</div>

                        {item.resources?.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-white font-medium">Resources:</h4>
                                <div className="space-y-4 mt-2">
                                    {item.resources.map((res, i) => (
                                        <div key={i}>
                                            {res.type === "video" ? (
                                                <div>
                                                    <p className="text-blue-300 font-medium mb-2">
                                                        <a href={res.url} target="_blank"
                                                           rel="noopener noreferrer"
                                                           className="underline">[{res.type.toUpperCase()}] {res.label}</a>
                                                    </p>
                                                    <div className="aspect-video max-w-2xl mx-auto">
                                                        <iframe
                                                            className="w-full h-full rounded-md"
                                                            src={`https://www.youtube.com/embed/${extractYouTubeId(res.url)}`}
                                                            title={res.label}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>
                                                    <a
                                                        href={res.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-300 underline"
                                                    >
                                                        [{res.type.toUpperCase()}] {res.label}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {item.updatedAt && (
                            <p className="text-xs text-gray-500 mt-4">
                                Updated: {new Date(item.updatedAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}