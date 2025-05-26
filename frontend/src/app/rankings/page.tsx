"use client";
import React, {useEffect, useState} from 'react';
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {fetchWeeklyBestAndWorstRankings} from "@/services/policyRanking";
import {PolicyRankingsResponse, PrivacyPolicy} from "@/lib/types/policyRanking";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const RankingsPage = () => {
    const {user} = useAuth();
    const router = useRouter();
    const [rankings, setRankings] = useState<PolicyRankingsResponse | null>(null);


    useEffect(() => {
        if (user === null) {
            router.push("/auth");
        }
    }, [user, router]);

    useEffect(() => {
        const loadRankings = async () => {
            try {
                const data = await fetchWeeklyBestAndWorstRankings();
                setRankings(data);
            } catch (error) {
                console.error("Failed to fetch rankings:", error);
            }
        };
        loadRankings();
    }, []);

    const renderPolicyCard = (policy: PrivacyPolicy | null, type: "best" | "worst") => {
        if (!policy) return null;

        const isBest = type === "best";
        const borderColor = isBest ? "border-green-500" : "border-red-500";
        const titleColor = isBest ? "text-green-700" : "text-red-700";
        const scoreColor = isBest ? "text-green-600" : "text-red-600";

        return (
            <div className={`bg-white rounded-2xl shadow p-6 border-l-8 border-r-8 ${borderColor}`}>
                <h2 className={`text-xl font-semibold ${titleColor}`}>
                    {isBest ? "🏆 Best Privacy Policy" : "🚫 Worst Privacy Policy"}
                </h2>

                {policy.inputType === "pdf" && policy.signedUrl && (
                    <p className="mt-6 text-sm">
                        <span className="font-semibold text-gray-800">Source: </span>
                        <a
                            href={policy.signedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            View PDF
                        </a>
                    </p>
                )}

                {policy.inputType === "url" && policy.originalInput && (
                    <p className="mt-6 text-sm">
                        <span className="font-semibold text-gray-800">Source: </span>
                        <a
                            href={policy.originalInput}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Visit Website
                        </a>
                    </p>
                )}

                <p className="text-sm text-gray-600 mt-1">
                    Score: <span className={`${scoreColor} font-semibold`}>
                    {(policy.overallScore * 10).toFixed(1)} / 10
                </span>
                </p>

                <p className="mt-4 text-gray-700">{policy.summary}</p>

                {/* READABILITY */}
                <div className="mt-4 text-sm text-gray-800">
                    <h3 className="font-semibold">Readability:</h3>
                    <ul className="list-disc list-inside ml-2">
                        <li>Flesch Score: {policy.nlpAnalysis.readability.flesch_score}</li>
                        <li>Gunning Fog Index: {policy.nlpAnalysis.readability.gunning_fog_index}</li>
                        <li>SMOG Index: {policy.nlpAnalysis.readability.smog_index}</li>
                        <li>Dale-Chall Score: {policy.nlpAnalysis.readability.dale_chall_score}</li>
                        <li>Flesch-Kincaid Grade: {policy.nlpAnalysis.readability.flesch_kincaid_grade}</li>
                    </ul>
                </div>

                {/* COMPLEXITY */}
                <div className="mt-4 text-sm text-gray-800">
                    <h3 className="font-semibold">Complexity:</h3>
                    <ul className="list-disc list-inside ml-2">
                        <li>Word Count: {policy.nlpAnalysis.complexity.word_count}</li>
                        <li>Sentence Count: {policy.nlpAnalysis.complexity.sentence_count}</li>
                        <li>Avg Sentence Length: {policy.nlpAnalysis.complexity.avg_sentence_length}</li>
                        <li>Avg Word Length: {policy.nlpAnalysis.complexity.avg_word_length}</li>
                        <li>Syntactic Depth: {policy.nlpAnalysis.complexity.syntactic_depth}</li>
                    </ul>
                </div>

                {/* AMBIGUITY */}
                <div className="mt-4 text-sm text-gray-800">
                    <h3 className="font-semibold">Ambiguity:</h3>
                    <ul className="list-disc list-inside ml-2">
                        <li>Vague Word Ratio: {policy.nlpAnalysis.ambiguity.vague_word_ratio}</li>
                        <li>Passive Voice Ratio: {policy.nlpAnalysis.ambiguity.passive_voice_ratio}</li>
                        <li>Conditional Statement Ratio: {policy.nlpAnalysis.ambiguity.conditional_statement_ratio}</li>
                    </ul>
                </div>

                {/* COVERAGE */}
                <div className="mt-4 text-sm text-gray-800">
                    <h3 className="font-semibold">Coverage:</h3>
                    <p className="ml-2">Coverage Score: {policy.nlpAnalysis.coverage.coverage_score}</p>
                </div>

                {/* SENTIMENT */}
                <div className="mt-4 text-sm text-gray-800">
                    <h3 className="font-semibold">Sentiment:</h3>
                    <ul className="list-disc list-inside ml-2">
                        <li>Subjectivity: {policy.nlpAnalysis.sentiment.subjectivity}</li>
                        <li>Polarity: {policy.nlpAnalysis.sentiment.polarity}</li>
                        <li>Opinion Density: {policy.nlpAnalysis.sentiment.opinion_density}</li>
                    </ul>
                </div>

                {/* USER FOCUS */}
                <div className="mt-4 text-sm text-gray-800">
                    <h3 className="font-semibold">User Focus:</h3>
                    <ul className="list-disc list-inside ml-2">
                        <li>Pronoun Ratio: {policy.nlpAnalysis.userFocus.pronoun_ratio}</li>
                        <li>Rights Phrase Density: {policy.nlpAnalysis.userFocus.rights_phrase_density}</li>
                        <li>Call to Action Presence: {policy.nlpAnalysis.userFocus.call_to_action_presence}</li>
                    </ul>
                </div>
            </div>
        );
    };
    return (
        <div className="px-4 py-10">
            <h1 className="text-3xl font-bold text-center">Weekly Privacy Policy Rankings</h1>
            {!rankings ? (
                <LoadingSpinner/>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-12">
                    {renderPolicyCard(rankings?.bestPolicy ?? null, "best")}
                    {renderPolicyCard(rankings?.worstPolicy ?? null, "worst")}
                </div>
            )}

        </div>
    );
};

export default RankingsPage;