import {useEffect, useState} from "react";
import {FaUsers, FaRecycle, FaCheck, FaTimes} from "react-icons/fa";
import {TfiCup} from "react-icons/tfi";
import "react-circular-progressbar/dist/styles.css";
import {Bar} from "react-chartjs-2";
import {formatDistanceToNow} from 'date-fns';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {NavLink} from "react-router-dom";
import DashboardService from "../services/dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [submissions, setSubmissions] = useState({pending: 0, approved: 0, rejected: 0});
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [userName, setUserName] = useState("");
    const [recyclingData, setRecyclingData] = useState([]);
    const [recentActivities, setRecentActivities] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const submissionsSummary = await DashboardService.getSubmissionsSummary();
                setSubmissions(submissionsSummary);

                const usersSummary = await DashboardService.getUsersSummary();
                setTotalUsers(usersSummary.totalUsers);
                setTotalPoints(usersSummary.totalPoints);

                const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                setUserName(storedUser.firstName);

                const recyclingStats = await DashboardService.getRecyclingStats();
                setRecyclingData(recyclingStats);

                const activities = await DashboardService.getRecentActivities();
                setRecentActivities(activities);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: "Recycled Items",
                data: recyclingData,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Monthly Recycled Items",
            },
        },
    };

    return (
        <div className="px-5 py-4 h-full w-full">
            <h1 className="text-3xl font-bold text-green-600 mb-3 text-center">Welcome {userName}, manage and monitor with
                ease!</h1>

            <div className="flex gap-6">
                <div className="bg-white shadow-md p-6 rounded-lg w-full sm:w-1/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Points & Rewards</h2>
                    <div className="flex items-center gap-4">
                        <TfiCup className="h-10 w-10 text-green-600"/>
                        <div>
                            <p>Total Points: {totalPoints}</p>
                            <button className="btn btn-success text-white mt-2">View Rewards</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md p-6 rounded-lg w-full sm:w-1/3">
                    <div className="flex gap-4 text-center">
                        <FaUsers className="h-20 w-20 "/>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
                            <h3 className="text-xl font-semibold">{totalUsers}</h3>
                        </div>
                    </div>
                    <NavLink to="/users" className="btn bg-gray-400 text-white w-full mt-12">Manage Users</NavLink>
                </div>

                <div className="bg-white shadow-md p-3 rounded-lg w-full sm:w-1/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Submissions Summary</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-yellow-500">
                            <FaRecycle className="h-6 w-6"/>
                            <p>Pending: {submissions.pending}</p>
                        </div>
                        <div className="flex items-center gap-2 text-green-500">
                            <FaCheck className="h-6 w-6"/>
                            <p>Approved: {submissions.approved}</p>
                        </div>
                        <div className="flex items-center gap-2 text-red-500">
                            <FaTimes className="h-6 w-6"/>
                            <p>Rejected: {submissions.rejected}</p>
                        </div>
                    </div>
                    <NavLink to={"/submissions"} className="btn btn-primary mt-4 w-full">View Submissions</NavLink>
                </div>
            </div>

            <div className="flex gap-6 mt-5">
                <div className="ml-6 w-2/3 h-80">
                    <h3 className="text-xl font-semibold text-gray-800">Recycling Stats</h3>
                    <Bar data={data} options={options} height={200} width={500}/>
                </div>

                <div className="bg-white shadow-md p-6 rounded-lg w-1/3 h-80">
                    <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Recent Activities</h2>
                    <ul className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <p>{activity.message}</p>
                                <span className="text-gray-600 text-sm">
                                    {formatDistanceToNow(new Date(activity.date), {includeSeconds: true})}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;