import {useContext} from "react"
import {NavLink} from "react-router-dom"
import Authcontext from "../utils/context"

const Sidebar = () => {
    const context = useContext(Authcontext)
    const role = context.user.role
    return (
        <div className="flex flex-col min-w-52 gap-10 h-full px-7 py-20 border-r-[1px] border-base-300">
             {role === "Admin" && (
                <NavLink
                    to="/dashboard"
                    className={({isActive}) =>
                        isActive
                            ? "btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none"
                            : "btn bg-transparent hover:text-white hover:bg-[#1f9d9a] shadow-none !border-none"
                    }
                >
                    Dashboard
                </NavLink>
            )}
            {role === "Admin" && (
                <NavLink
                    to="/users"
                    className={({isActive}) =>
                        isActive
                            ? "btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none"
                            : "btn bg-transparent hover:text-white hover:bg-[#1f9d9a] shadow-none !border-none"
                    }
                >
                    Users
                </NavLink>
            )}
            {role === "Admin" && (
                <NavLink
                    to="/submissions"
                    className={({isActive}) =>
                        isActive
                            ? "btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none"
                            : "btn bg-transparent hover:text-white hover:bg-[#1f9d9a] shadow-none !border-none"
                    }
                >
                    Submissions
                </NavLink>
            )}
            {role === "Admin" && (
                <NavLink
                    to="/orders"
                    className={({isActive}) =>
                        isActive
                            ? "btn bg-[#1f9d9a] text-white shadow-none hover:bg-[#1f9d9a] !border-none"
                            : "btn bg-transparent hover:text-white hover:bg-[#1f9d9a] shadow-none !border-none"
                    }
                >
                    Orders
                </NavLink>
            )}
        </div>
    )
}

export default Sidebar
