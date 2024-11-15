import {useContext} from "react"
import {NavLink} from "react-router-dom"
import Authcontext from "../utils/context"

const Sidebar = () => {
    const context = useContext(Authcontext)
    const role = context.user.role
    return (
        <div className="flex flex-col min-w-52 gap-10 h-full px-7 py-20 border-r-[1px] border-base-300">
            {(
                <NavLink
                    to="/"
                    className={({isActive}) =>
                        isActive
                            ? "btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none"
                            : "btn bg-transparent hover:text-white hover:bg-[#1f9d9a] shadow-none !border-none"
                    }
                >
                    Home
                </NavLink>
            )}
            {(
                <NavLink
                    to="/image-recognition"
                    className={({isActive}) =>
                        isActive
                            ? "btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none"
                            : "btn bg-transparent hover:text-white hover:bg-[#1f9d9a] shadow-none !border-none"
                    }
                >
                    Image Recognition
                </NavLink>
            )}
            {role === "Admin" && (
                <NavLink
                    to="/users"
                    className={({isActive}) =>
                        isActive
                            ? "btn bg-[#1f9d9a] text-primary-content shadow-none hover:bg-[#1f9d9a] !border-none"
                            : "btn bg-transparent hover:text-primary-content hover:bg-[#1f9d9a] shadow-none !border-none"
                    }
                >
                    Users
                </NavLink>
            )}
        </div>
    )
}

export default Sidebar
