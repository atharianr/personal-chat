import { useSecret } from "../contexts/SecretContext";

export default function SecretModal() {
    const { secret, setSecret, handleSecretSubmit } = useSecret();

    if (secret !== process.env.NEXT_PUBLIC_SECRET_KEY) {
        return (
            <div className="z-20 fixed inset-0 flex items-center justify-center bg-black/60">
                <form
                    onSubmit={handleSecretSubmit}
                    className="bg-white p-3 rounded-3xl shadow-xl w-80 space-y-4"
                >
                    <h2 className="text-lg font-semibold text-center">Bla bla bla!</h2>
                    <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder="Enter here..."
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="w-full py-3 px-8 bg-black text-white rounded-2xl hover:bg-black/80 duration-500 ml-auto cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    } else {
        return null
    }
}
