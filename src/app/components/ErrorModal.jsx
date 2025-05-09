import Image from "next/image";
import { useError } from "../contexts/ErrorContext";

export default function ErrorModal() {

    const { isError, setIsError } = useError()

    const onViewClicked = () => {
        setIsError(false)
    }

    if (isError) {
        return (
            <div onClick={onViewClicked} className="z-20 fixed inset-0 flex items-center justify-center bg-black/60">
                <div className="flex flex-col bg-white rounded-3xl overflow-hidden items-center">
                    <Image src="/assets/error_illustration.jpg" alt="" width={200} height={200} />
                    <p className="mx-8 mb-8">Something went wrong, please try again later</p>
                </div>
            </div>
        );
    } else {
        return null
    }
}