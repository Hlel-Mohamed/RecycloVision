import {useContext, useEffect, useState} from "react"
import {toast} from "react-hot-toast"
import auth from "../services/auth"
import {useNavigate} from "react-router-dom"
import Authcontext from "../utils/context"

const Login = () => {
    const context = useContext(Authcontext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.getItem("token") && navigate("/")
    })

    const handleLogin = async (e: any) => {
        e.preventDefault()
        try {
            await auth.login(email, password).then(res => {
                toast.success(res.message)
                localStorage.setItem("token", res.token)
                localStorage.setItem("user", JSON.stringify(res.result))
                context.login(res.result)
                const role = res.result.role
                role == "Admin"
                    ? navigate("/users")
                    : role == "Recycler"
                        ? navigate("/home")
                        : navigate("/users")
            })
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
                    <form className="card-body !gap-0" onSubmit={handleLogin}>
                        <h2 className="text-3xl text-center font-bold mb-6">Login</h2>
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
                        <label className="label !pb-[0.25rem]">
                            <a href="#" className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
