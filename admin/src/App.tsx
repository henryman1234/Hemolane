import React from "react"
import {
  Link,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import HomePage from "./pages/homePage/HomePage"
import BloodBanks from "./pages/bloodBanks/BloodBanks"
import Hospitals from "./pages/hospitals/Hospitals"
import Users from "./pages/users/Users"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Layout from "./pages/layout/Layout"
import Orders from "./pages/orders/Orders"


function App () {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <HomePage/>
        },
        {
          path: "bloodBanks",
          element: <BloodBanks/>
        },
        {
          path: "hospitals",
          element: <Hospitals/>
        },
        {
          path: "users",
          element: <Users/>
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "register",
          element: <Register/>
        },
        {
          path: "orders",
          element: <Orders/>
        }
      ]
    },
 
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App