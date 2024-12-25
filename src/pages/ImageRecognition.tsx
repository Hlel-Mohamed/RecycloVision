import {useState, useEffect, useRef, useCallback} from 'react';
import Webcam from 'react-webcam';
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import SubmissionService from '../services/submission';
import {toast} from "react-hot-toast";

/**
 * Type definition for a recyclable item.
 */
type RecyclableItem = {
    /** The name of the recyclable item. */
    name: string;
    /** The points awarded for the recyclable item. */
    points: number;
};

/**
 * ImageRecognition component handles image upload, camera capture, and image recognition using MobileNet model.
 * It allows users to identify recyclable items in images and keeps track of identified items and points.
 * @component
 */
function ImageRecognition() {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [results, setResults] = useState<Array<{ className: string; probability: number; points: number }>>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [selectedGuesses, setSelectedGuesses] = useState<string[]>([]);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [items, setItems] = useState<RecyclableItem[]>([]);

    const imageRef = useRef<HTMLImageElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const webcamRef = useRef<Webcam | null>(null);

    /**
     * Loads the MobileNet model and sets the backend to WebGL.
     * @async
     * @function
     */
    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            await tf.setBackend('webgl');
            await tf.ready();
            const model = await mobilenet.load();
            setModel(model);
        } catch (error) {
            console.error(error);
        } finally {
            setIsModelLoading(false);
        }
    };

    /**
     * Fetches the list of recyclable items from a JSON file.
     * @async
     * @function
     */
    const loadItems = async () => {
        const response = await fetch('/recyclableItems.json');
        const data = await response.json();
        setItems(data);
    };

    /**
     * Handles image upload and sets the image URL.
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the file input.
     */
    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
        } else {
            setImageURL(null);
        }
    };

    /**
     * Captures an image from the webcam and sets the image URL.
     * @function
     */
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImageURL(imageSrc);
        }
    }, [webcamRef]);

    /**
     * Identifies the objects in the uploaded or captured image using the MobileNet model.
     * @async
     * @function
     */
    const identify = async () => {
        if (imageURL && history.includes(imageURL)) {
            toast.error("Already identified");
            return;
        }

        if (model && imageRef.current) {
            const results = await model.classify(imageRef.current);
            const filteredResults = results
                .map(result => {
                    const item = items.find(item => item.name.toLowerCase() === result.className.toLowerCase());
                    return item ? {...result, points: item.points} : null;
                })
                .filter(result => result !== null) as Array<{ className: string; probability: number; points: number }>;
            setResults(filteredResults);
            if (filteredResults.length === 0) {
                toast.error("No recyclable items recognized. Please try again.");
            } else {
                setHistory([imageURL!, ...history]);
            }
        }
    };

    /**
     * Handles the click event on a guess and updates the total points and selected guesses.
     * @function
     * @param {string} guess - The class name of the guessed item.
     */
    const handleGuessClick = (guess: string) => {
        const selectedItem = results.find(result => result.className === guess);
        if (selectedItem) {
            setTotalPoints(totalPoints + selectedItem.points);
            setSelectedGuesses([...selectedGuesses, guess]);
            setResults(results.filter(result => result.className !== guess));
        }
    };


    /**
     * Converts a data URL to a Blob.
     * @param {string} dataUrl - The data URL to convert.
     * @returns {Promise<Blob>} - A promise that resolves to a Blob.
     */
    const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
        const response = await fetch(dataUrl);
        return await response.blob();
    };

    const submitForApproval = async () => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const submission = {
            items: selectedGuesses,
            images: await Promise.all(history.map(async (image) => {
                if (image.startsWith('data:image')) {
                    const blob = await dataUrlToBlob(image);
                    image = URL.createObjectURL(blob);
                }
                const canvas = document.createElement('canvas');
                const img = new Image();
                img.src = image;
                await new Promise((resolve) => {
                    img.onload = resolve;
                });
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                return canvas.toDataURL('image/jpeg');

            })),
            points: totalPoints,
            userId: storedUser,
        };

        try {
            console.log(submission);
            await SubmissionService.submit(submission);
            toast.success('Submission successful. Awaiting admin approval.');
        } catch (error) {
            console.error('Error submitting for approval:', error);
            toast.error('Submission failed. Please try again.');
        }
    };

    /**
     * Loads the model and items when the component mounts.
     * @function
     */
    useEffect(() => {
        loadModel();
        loadItems();
    }, []);

    if (isModelLoading) {
        return (
            <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-10 h-full w-full flex items-center flex-col gap-5">
            <h1 className="text-4xl font-bold mb-6">Image Identification</h1>
            <div className="flex flex-col items-center mb-6 w-full max-w-lg">
                <input type="file" accept="image/*" capture className="hidden" onChange={uploadImage}
                       ref={fileInputRef}/>
                <button className="btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none mb-4"
                        onClick={() => fileInputRef.current!.click()}>Upload Image
                </button>
                <span className="text-lg mb-4">OR</span>
                <button className="btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none mb-4"
                        onClick={() => setIsCameraActive(!isCameraActive)}>
                    {isCameraActive ? 'Stop Camera' : 'Start Camera'}
                </button>

            </div>
            <div className="flex flex-row items-start w-full max-w-lg">
                <div className="flex flex-col items-center w-full">
                    {isCameraActive && (
                        <>
                            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg"
                                    className="w-full mb-4"/>
                            <button
                                className="btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none mb-4"
                                onClick={capture}>Capture Image
                            </button>
                        </>
                    )}
                    {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef}
                                      className="w-full mb-4"/>}
                    {results.length > 0 && (
                        <div className="w-full">
                            {results.map((result) => (
                                <div key={result.className} className="p-4 mb-2 bg-white rounded shadow cursor-pointer"
                                     onClick={() => handleGuessClick(result.className)}>
                                    <span className="block font-bold">{result.className}</span>
                                    <span
                                        className="block">Confidence level: {(result.probability * 100).toFixed(2)}%</span>
                                    <span className="block">Points: {result.points}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {imageURL &&
                        <button className="btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none mt-4"
                                onClick={identify}>Identify Image</button>}
                </div>
            </div>
            {selectedGuesses.length > 0 && (
                <div className="mt-10 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">Selected Guesses</h2>
                    <ul className="list-disc pl-5">
                        {selectedGuesses.map((guess, index) => (
                            <li key={index}>{guess}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="mt-10 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Total Points</h2>
                <div className="text-lg">{totalPoints}</div>
                {selectedGuesses.length > 0 && (
                    <button
                        className="btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none mt-4"
                        onClick={submitForApproval}
                    >
                        Submit for Approval
                    </button>
                )}
            </div>
            {history.length > 0 && (
                <div className="mt-10 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">Recent Images</h2>
                    <div className="flex flex-wrap gap-4">
                        {history.map((image, index) => (
                            <div key={`${image}${index}`}
                                 className="w-24 h-24 overflow-hidden rounded shadow cursor-pointer"
                                 onClick={() => setImageURL(image)}>
                                <img src={image} alt="Recent Prediction" className="w-full h-full object-cover"/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageRecognition;