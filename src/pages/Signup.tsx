import {useEffect, useState} from "react"
import register from "../services/register"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.getItem("token") && navigate("/")
    })

    const handleSignup = async (e: any) => {
        e.preventDefault()
        if (phone.length !== 8) {
            toast.error("Phone number must be exactly 8 digits");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await register.createUser(
                firstName,
                lastName,
                phone,
                email,
                password
            )
            toast.success(response.message)
            navigate("/login")
        } catch (error: any) {
            toast.error(error.response?.data.message || error.message)
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex flex-col items-center text-center w-full lg:w-1/2">
                    <img src="RecycloVisionWithTitle.png" alt="logo" className="h-72 w-85"/>
                    <p className="py-6 text-2xl">
                        From collecting recyclables to earning eco-friendly rewards, manage all your recycling
                        activities with ease. Track your progress, redeem rewards, and make a positive impact
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form className="card-body !gap-0" onSubmit={handleSignup}>
                        <h2 className="text-3xl text-center font-bold mb-6">Sign up</h2>
                        <div className="flex gap-2">
                            <div className="form-control">
                                <label className="label !pb-[0.25rem]">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="input input-bordered w-full"
                                    required
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label !pb-[0.25rem]">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="input input-bordered w-full"
                                    required
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label !pb-[0.25rem]">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="number"
                                placeholder="123 456 7890"
                                className="input input-bordered"
                                required
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label !pb-[0.25rem]">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label !pb-[0.25rem]">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label !pb-[0.25rem]">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
