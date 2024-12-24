import { FaUsers, FaRecycle, FaCheck, FaTimes } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import "react-circular-progressbar/dist/styles.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import {NavLink} from "react-router-dom";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const submissions = {
    pending: 12,
    approved: 45,
    rejected: 8,
  };

  const totalUsers = 120;
  const totalPoints = 4500;
 

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Recycled Items",
        data: [20, 30, 50, 80, 100, 70, 60, 120, 150, 200, 180, 220], 
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
  <h1 className="text-3xl font-bold text-green-600 mb-3 text-center">Welcome Admin, manage and monitor with ease!</h1>

  <div className="flex gap-6">
    

  <div className="bg-white shadow-md p-6 rounded-lg w-full sm:w-1/3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Points & Rewards</h2>
      <div className="flex items-center gap-4">
        <TfiCup className="h-10 w-10 text-green-600" />
        <div>
          <p>Total Points: {totalPoints}</p>
          <button className="btn btn-success text-white mt-2">View Rewards</button>
        </div>
      </div>
    </div>


    <div className="bg-white shadow-md p-6 rounded-lg w-full sm:w-1/3">
      <div className="flex gap-4 text-center">
        <FaUsers className="h-20 w-20 " />
        <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
          <h3 className="text-xl font-semibold">{totalUsers}</h3>
        </div>
      </div>
      <NavLink
          to="/users"
          className="btn bg-gray-400 text-white w-full mt-12"
        >Manage Users</NavLink>


    </div>

    <div className="bg-white shadow-md p-3 rounded-lg w-full sm:w-1/3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Submissions Summary</h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-yellow-500">
          <FaRecycle className="h-6 w-6" />
          <p>Pending: {submissions.pending}</p>
        </div>
        <div className="flex items-center gap-2 text-green-500">
          <FaCheck className="h-6 w-6" />
          <p>Approved: {submissions.approved}</p>
        </div>
        <div className="flex items-center gap-2 text-red-500">
          <FaTimes className="h-6 w-6" />
          <p>Rejected: {submissions.rejected}</p>
        </div>
      </div>
        <NavLink to={"/submissions"} className="btn btn-primary mt-4 w-full">View Submissions</NavLink>

    </div>
    

    

    
  </div>

  <div className="flex gap-6 mt-5">
  <div className="ml-6 w-2/3 h-80"> 
    <h3 className="text-xl font-semibold text-gray-800">Recycling Stats</h3>
    <Bar data={data} options={options} height={200} width={500} /> {/* Limite la hauteur du graphique */}
  </div>

  <div className="bg-white shadow-md p-6 rounded-lg w-1/3 h-80"> {/* Limite la hauteur */}
    <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Recent Activities</h2>
    <ul className="space-y-4">
      <li className="flex items-center justify-between">
        <p>User "John Doe" submitted a bottle.</p>
        <span className="text-gray-600 text-sm">2 hours ago</span>
      </li>
      <li className="flex items-center justify-between">
        <p>User "Jane Smith" earned 50 points.</p>
        <span className="text-gray-600 text-sm">1 day ago</span>
      </li>
      <li className="flex items-center justify-between">
        <p>Admin approved 10 submissions.</p>
        <span className="text-gray-600 text-sm">3 days ago</span>
      </li>
    </ul>
  </div>
</div>
</div>

  );
};

export default Dashboard;

/*
<div className="mt-8 bg-white shadow-md p-6 rounded-lg">
<h2 className="text-xl font-semibold text-gray-800 mb-4">Recycling Progress</h2>
<div className="w-1/3 mx-auto">
  <CircularProgressbar
  className="w-40"
    value={progressPercentage}
    text={`${progressPercentage}%`}
    styles={buildStyles({
      textSize: "16px",
      pathColor: `#4CAF50`,
      textColor: "#4CAF50",
      trailColor: "#d6d6d6",
    })}
  />
</div>
</div>

*/