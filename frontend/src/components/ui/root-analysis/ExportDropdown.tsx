"use client";

import {useRef, useState} from "react";
import {exportToPdf} from "@/services/exporter";
import {AnalyzedPrivacyResponse} from "@/lib/types/privacyAnalyzer";
import useClickOutside from "@/components/ui/root-analysis/useClickOutside";

interface Props {
    result: AnalyzedPrivacyResponse;
}

export default function ExportDropdown({result}: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setOpen(false));

    async function handleExportPDF() {
        try {
            const blob = await exportToPdf(result);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "analysis_result.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("PDF export failed", err);
        } finally {
            setOpen(false);
        }
    }

    function handleExportCSV() {
        // TODO
        setOpen(false);
    }

    return (
        <div ref={ref} className="relative inline-block text-left mr-4">
            <button onClick={() => setOpen((prev) => !prev)} className="text-white text-2xl hover:text-gray-300">
                ⋮
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-gray-800 shadow-lg z-50">
                    <div className="py-1">
                        <button className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-700"
                                onClick={handleExportPDF}>Export to PDF
                        </button>
                        <button className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-700"
                                onClick={handleExportCSV}>Export to CSV
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}