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
import Orders from "./pages/orders/Orders"
import SingleUser from "./components/singleUser/SingleUser"
import SingleHospital from "./components/singleHospital/SingleHospital"
import SingleBloodBank from "./pages/singleBloodBank/SingleBloodBank"
import { Layout, RequireAuthLayout } from "./pages/layout/Layout"
import { ToastContainer } from "react-toastify"


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
          path: "login",
          element: <Login/>
        },
        {
          path: "register",
          element: <Register/>
        },

      ]
    },
    {
      path: "/",
      element: <RequireAuthLayout/>,
      children: [
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
          path: "orders",
          element: <Orders/>
        },
        {
          path: "users/:id",
          element: <SingleUser/>
        },
        {
          path: "hospitals/:id",
          element: <SingleHospital/>
        },
        {
          path: "bloodBanks/:id",
          element: <SingleBloodBank/>
        }
      ]
    }
 
  ])

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer autoClose={false}/>
    </>
  )
}

export default App