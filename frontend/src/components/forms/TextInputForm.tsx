import {useState} from "react";

export default function TextInputForm() {
    const [text, setText] = useState('');

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call backend API with text
        console.log("Submitted text: ", text);
    }

    return (
        <form onSubmit={handleSumbit} className="md:w-[600px] lg:w-[800px] space-y-4">
            <textarea
                className="w-full p-3 border rounded-lg text-white bg-gray-800
                focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste privacy policy text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                >
                    Analyze Text
                </button>
            </div>
        </form>
    )
}