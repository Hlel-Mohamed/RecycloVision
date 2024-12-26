import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Users from "./pages/users"
import MySubmissions from "./pages/MySubmissions"
import Sidebar from "./components/Sidebar"
import Authcontext from "./utils/context"
import { useContext, useState } from "react"
import ImageRecognition from "./pages/ImageRecognition"
import ProtectedRoute from "./utils/protectedRoute"
import Profile from "./pages/Profile"
import Submissions from "./pages/Submissions"
import Dashboard from "./pages/Dashboard"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import { CartProvider } from "./utils/cartContext"

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function Main() {
  const context = useContext(Authcontext)
  const role = context.user.role
  return (
    <div className="flex h-screen justify-between">
      {role === "Admin" && <Sidebar />}
      <Outlet />
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
      element: <Layout />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        {
          path: "/",
          element: (
            <ProtectedRoute allowedRoles={["Recycler", "Admin"]}>
              <Main />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "/home",
              element: <Home />,
            },
            {
              path: "/shop",
              element: <Shop />,
            },
            {
              path: "/cart",
              element: <Cart />,
            },
            {
              path: "/users",
              element: (
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Users />
                </ProtectedRoute>
              ),
            },
            {
              path: "/my-submissions",
              element: (
                <ProtectedRoute allowedRoles={["Recycler"]}>
                  <MySubmissions />
                </ProtectedRoute>
              ),
            },
            {
              path: "/dashboard",
              element: (
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              ),
            },
            {
              path: "/submissions",
              element: (
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Submissions />
                </ProtectedRoute>
              ),
            },
            {
              path: "/me",
              element: <Profile />,
            },
            {
              path: "/image-recognition",
              element: (
                <ProtectedRoute allowedRoles={["Recycler"]}>
                  <ImageRecognition />
                </ProtectedRoute>
              ),
            },
            { path: "/unauthorized", element: <div>Unauthorized</div> },
          ],
        },
        { path: "*", element: <div>Not Found</div> },
      ],
    },
  ])
  return (
    <>
      <Authcontext.Provider value={{ user, login, logout }}>
        <CartProvider>
          <Toaster />
          <RouterProvider router={router} />
        </CartProvider>
      </Authcontext.Provider>
    </>
  )
}

export default App
