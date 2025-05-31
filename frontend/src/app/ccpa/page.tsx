import CcpaInputFormContainer from "@/components/forms/ccpa/CcpaInputFormContainer";

export default function CcpaPage() {
    return (
        <div
            className="w-full max-w-4xl flex flex-col gap-4 items-center justify-items-center min-h-screen mt-30 text-center mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Analyze Your Privacy Policy for CCPA
                Compliance</h1>
            <CcpaInputFormContainer/>
        </div>
    )
}