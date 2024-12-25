import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar"
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Users from "./pages/users"
import Sidebar from "./components/Sidebar"
import Authcontext from "./utils/context"
import {useState} from "react"
import ImageRecognition from "./pages/ImageRecognition.tsx";
import ProtectedRoute from "./utils/protectedRoute.tsx"
import Profile from "./pages/Profile";
import Submissions from "./pages/Submissions";
import Dashboard from "./pages/Dashboard.tsx"
import Shop from "./pages/Shop.tsx"
import Cart from "./pages/Cart.tsx"
import {CartProvider} from "./utils/cartContext";

function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}

function Main() {
    return (
        <div className="flex h-screen justify-between">
            <Outlet/>
        </div>
    )
}

function App() {
    const userr = localStorage.getItem("user") || "{}"
    const [user, setUser] = useState({
        name: JSON.parse(userr).firstName || "",
        role: JSON.parse(userr).role || "",
        isAuth: !!localStorage.getItem("token"),
    })

    const login = (user: any) => {
        setUser({
            name: user.firstName,
            role: user.role,
            isAuth: user.isAuth,
        })
    }

    const logout = () => {
        setUser({
            name: "",
            role: "",
            isAuth: false,
        })
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {path: "/login", element: <Login/>},
                {path: "/signup", element: <Signup/>},
                {
                    path: "/",
                    element: (
                        <ProtectedRoute allowedRoles={["Recycler","Admin"]}>
                            <Main/>
                        </ProtectedRoute>
                    ),
                    children: [
                        {
                            path: "/home",
                            element: <Home/>,
                        },
                        {
                            path: "/shop",
                            element:
                                <Shop/>,
                        },
                        {
                            path: "/cart",
                            element:
                                    <Cart/>,
                        },
                        {path: "/hr", element: <div>HR page</div>},
                        {path: "/admin", element: <div>admin page</div>},
                        {
                            path: "/users",
                            element: (
                                <ProtectedRoute allowedRoles={["Admin"]}>
                                    <Users/>
                                </ProtectedRoute>
                            ),
                        },
                        {
                            path: "/dashboard",
                            element: (
                                <ProtectedRoute allowedRoles={["Admin"]}>
                                    <Dashboard/>
                                </ProtectedRoute>
                            ),
                        },
                        {
                            path: "/submissions",
                            element: (
                                <ProtectedRoute allowedRoles={["Admin"]}>
                                    <Submissions/>
                                </ProtectedRoute>
                            ),
                        },
                        {
                            path: "/me",
                            element: <Profile/>
                        },
                        {
                            path: "/image-recognition",
                            element: (
                                <ProtectedRoute allowedRoles={["Recycler"]}>
                                    <ImageRecognition/>
                                </ProtectedRoute>
                            )
                        },
                        {path: "/unauthorized", element: <div>Unauthorized</div>},
                    ],
                },
                {path: "*", element: <div>Not Found</div>},
            ],
        },
    ])
    return (
        <>
            <Authcontext.Provider value={{user, login, logout}}>
                <CartProvider>
                    <Toaster/>
                    <RouterProvider router={router}/>
                </CartProvider>
            </Authcontext.Provider>
        </>
    )
}

export default App
