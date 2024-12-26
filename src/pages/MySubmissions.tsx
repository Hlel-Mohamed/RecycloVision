import { useState, useEffect } from 'react';
import SubmissionService from '../services/submission';
import { toast } from 'react-hot-toast';

type Submission = {
    id: string;
    items: string[];
    images: string[];
    points: number;
    status: string;
};

function MySubmissions() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

    const fetchSubmissions = async () => {
        try {
            const response = await SubmissionService.getUserSubmissions(userId);
            if (!response) {
                throw new Error('HTTP error! status: undefined');
            }
            setSubmissions(response);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            toast.error('Failed to fetch submissions. Please try again later.');
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    return (
        <div className="px-10 py-10 h-full w-full flex flex-col gap-5">
            <h1 className="text-4xl font-bold mb-6">My Submissions</h1>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">Items</th>
                    <th className="px-4 py-2">Images</th>
                    <th className="px-4 py-2">Points</th>
                    <th className="px-4 py-2">Status</th>
                </tr>
                </thead>
                <tbody>
                {submissions.map((submission) => (
                    <tr key={submission.id}>
                        <td className="border px-4 py-2">{submission.items.join(', ')}</td>
                        <td className="border px-4 py-2">
                            {submission.images.map((image, index) => (
                                <img key={index} src={image} alt={`Submission ${submission.id} Image ${index + 1}`}
                                     className="w-16 h-16 object-cover mr-2"/>
                            ))}
                        </td>
                        <td className="border px-4 py-2">{submission.points}</td>
                        <td className="border px-4 py-2">{submission.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MySubmissions;