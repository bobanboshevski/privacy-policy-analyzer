import InputFormContainer from "@/components/forms/InputFormContainer";

export default function Home() {
    return (
        <div className="flex flex-col gap-4 items-center justify-items-center text-center min-h-screen mt-30">
            <h1 className="text-4xl font-bold">Privacy Policy Analyzer</h1>
            <InputFormContainer/>
        </div>
    );
}
