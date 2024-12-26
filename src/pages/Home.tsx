import { useEffect, useState } from "react"
import { TfiCup } from "react-icons/tfi"
import {
  FaArrowRight,
  FaRecycle,
  FaRegPauseCircle,
  FaRegUser,
} from "react-icons/fa"
import { IoIosArrowDropdown } from "react-icons/io"
import { VscError } from "react-icons/vsc"
import DashboardService from "../services/dashboard"
import User from "../services/users"
import { toast } from "react-hot-toast"
import { NavLink } from "react-router-dom"
import { format } from "date-fns"
import React from "react"

const Home = () => {
  const [userCoins, setUserCoins] = useState(0)
  const [userName, setUserName] = useState("")
  const [numberRecycledItems, setNumberRecycledItems] = useState(0)
  const [goal, setGoal] = useState(100)
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [submissionStatus, setSubmissionStatus] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
        const userId = storedUser.id

        const userData = await User.getUserById(userId)
        setUserCoins(userData.walletPoints)
        setUserName(userData.firstName)

        const totalItems = await DashboardService.getTotalItemsByUser(userId)
        setNumberRecycledItems(totalItems)

        const activities = await DashboardService.getRecentActivities()
        setRecentActivities(activities)

        const submissionsSummary =
          await DashboardService.getSubmissionsSummary()
        setSubmissionStatus(submissionsSummary)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to fetch data. Please try again later.")
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (numberRecycledItems >= goal) {
      setGoal(prevGoal => prevGoal + 100)
    }
  }, [numberRecycledItems, goal])

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <div className="px-10 py-5 h-full w-full flex gap-8">
      <div className="w-3/4 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-green-700">
          Hey {userName}, Welcome to Recyclovision
        </h1>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Recycling Progress
          </h2>
          <div className="mt-4">
            <p className="text-lg text-gray-700 mb-2">
              You have recycled {numberRecycledItems} items
            </p>
            <progress
              className="progress progress-success w-full"
              value={numberRecycledItems}
              max={goal}
            ></progress>
            <p className="mt-2 text-sm text-gray-500">Goal: {goal} items</p>
          </div>
        </div>

        <div className="flex gap-8 flex-wrap">
          <div className="flex-2">
            <div className="bg-gray-300 rounded-lg p-4 shadow-md flex gap-4 h-full">
              <TfiCup className="h-10 w-10 " />
              <div>
                <h3 className="text-xl">Coins</h3>
                <p className="text-lg">{userCoins} coins</p>
                <NavLink
                  to={"/shop"}
                  className="btn btn-primary text-white mt-4 flex items-center gap-2 sm:w-auto mx-auto"
                >
                  <FaArrowRight />
                  View Products
                </NavLink>
              </div>
            </div>
          </div>

          <div className="flex-2 ">
            <div className="bg-gray-300  rounded-lg p-4 shadow-md  h-full">
              <div className="flex gap-4">
                <FaRecycle className="h-10 w-10" />
                <h3 className="text-xl">Ready to recycle?</h3>
              </div>
              <NavLink
                to={"/image-recognition"}
                className="btn btn-success text-white mt-4 flex items-center gap-2 sm:w-auto mx-auto"
              >
                Image Recognition
              </NavLink>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-gray-300  rounded-lg p-4 shadow-md flex gap-4 h-full">
              <FaRegUser className="h-10 w-10" />
              <div>
                <h3 className="text-xl">Manage your profile's points</h3>
                <NavLink
                  to={"/me"}
                  className="btn bg-gray-700 border-none  text-white mt-8 flex items-center gap-2 sm:w-auto mx-auto"
                >
                  Go to Profile
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-blue-100 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Submission Status</h2>
            <div className="flex gap-4">
              <div className="bg-gray-300 flex-1 gap-6  rounded-lg p-4 flex">
                <FaRegPauseCircle className="h-10 w-10 mt-4" />
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold">Pending</p>
                  <p className="text-2xl font-bold">
                    {submissionStatus.pending}
                  </p>
                </div>
              </div>

              <div className="bg-gray-300 flex-1 gap-6  rounded-lg p-4 flex">
                <IoIosArrowDropdown className="h-10 w-10 mt-4" />
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold">Approved</p>
                  <p className="text-2xl font-bold">
                    {submissionStatus.approved}
                  </p>
                </div>
              </div>

              <div className="bg-gray-300 flex-1 gap-6  rounded-lg p-4 flex">
                <VscError className="h-10 w-10 mt-4" />
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold">Rejected</p>
                  <p className="text-2xl font-bold">
                    {submissionStatus.rejected}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Special Events
        </h2>
        <div className="alert alert-info mb-4">
          <div className="flex-1">
            <label>
              <span>
                Special Christmas Recycling Event! Double your coins during this
                period.
              </span>
            </label>
          </div>
        </div>
        <div className="bg-green-100 p-2 rounded-md shadow">
          <h3 className="text-lg font-medium text-gray-700">Promotions</h3>
          <p className="text-gray-600">
            Get 20% off eco-friendly products this month!
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-3">
            Recent Activities
          </h2>
          <div className="flex flex-col gap-2">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-gray-100 p-4 rounded-md shadow"
              >
                <div>
                  <p className="text-lg text-gray-700 font-medium">
                    Items:{" "}
                    <span className="text-gray-900">
                      {activity.items
                        .map((item: string) => capitalizeFirstLetter(item))
                        .join(", ")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Reward:{" "}
                    <span className="text-green-600">
                      {activity.points} coins
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {format(new Date(activity.date), "dd-MM-yyyy")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
