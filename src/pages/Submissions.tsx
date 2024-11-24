import { useState, useEffect } from 'react';
import SubmissionService from '../services/submission';

type Submission = {
    id: string;
    items: string[];
    images: string[];
    points: number;
    status: string;
    user: {
        firstName: string;
        lastName: string;
    };
};

function AdminSubmissions() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    const fetchSubmissions = async () => {
        try {
            const response = await SubmissionService.getAll();
            if (!response) {
                throw new Error('HTTP error! status: undefined');
            }
            setSubmissions(response);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            setMessage('Failed to fetch submissions. Please try again later.');
        }
    };

    const approveSubmission = async (id: string) => {
        try {
            const response = await SubmissionService.approve(id);

            if (response.message === 'Submission approved') {
                setMessage('Submission approved successfully.');
                await fetchSubmissions();
            } else {
                setMessage('Failed to approve submission.');
            }
        } catch (error) {
            console.error('Error approving submission:', error);
            setMessage('Failed to approve submission.');
        }
    };

    const rejectSubmission = async (id: string) => {
        try {
            const response = await SubmissionService.reject(id);

            if (response.message === 'Submission rejected') {
                setMessage('Submission rejected successfully.');
                await fetchSubmissions();
            } else {
                setMessage('Failed to reject submission.');
            }
        } catch (error) {
            console.error('Error rejecting submission:', error);
            setMessage('Failed to reject submission.');
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    return (
        <div className="px-10 py-10 h-full w-full flex flex-col gap-5">
            <h1 className="text-4xl font-bold mb-6">Admin Submissions</h1>
            {message && <div className="text-red-500 mb-4">{message}</div>}
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">Submitted By</th>
                    <th className="px-4 py-2">Items</th>
                    <th className="px-4 py-2">Images</th>
                    <th className="px-4 py-2">Points</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {submissions.map((submission) => (
                    <tr key={submission.id}>
                        <td className="border px-4 py-2">{submission.user.firstName} {submission.user.lastName}</td>
                        <td className="border px-4 py-2">{submission.items.join(', ')}</td>
                        <td className="border px-4 py-2">
                            {submission.images.map((image, index) => (
                                <img key={index} src={image} alt={`Submission ${submission.id} Image ${index + 1}`}
                                     className="w-16 h-16 object-cover mr-2"/>
                            ))}
                        </td>
                        <td className="border px-4 py-2">{submission.points}</td>
                        <td className="border px-4 py-2">{submission.status}</td>

                        <td className="border px-4 py-2">
                            <button
                                className="btn bg-green-500 text-white mr-2"
                                onClick={() => approveSubmission(submission.id)}
                                disabled={submission.status !== 'Pending'}
                            >
                                Approve
                            </button>
                            <button
                                className="btn bg-red-500 text-white"
                                onClick={() => rejectSubmission(submission.id)}
                                disabled={submission.status !== 'Pending'}
                            >
                                Reject
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminSubmissions;