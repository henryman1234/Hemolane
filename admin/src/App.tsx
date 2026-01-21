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
import Orders from "./pages/orders/Reservations"
import SingleUser from "./components/singleUser/SingleUser"
import SingleHospital from "./pages/singleHospital/SingleHospital"
import SingleBloodBank from "./pages/singleBloodBank/SingleBloodBank"
import { Layout, RequireAuthLayout } from "./pages/layout/Layout"
import { ToastContainer } from "react-toastify"
import CreateHospitalPage from "./pages/createHospitalPage/CreateHospitalPage"
import Notifications from "./pages/notifications/Notifications"
import ReservationsPage from "./pages/orders/Reservations"
import Profile from "./pages/profile/Profile"
import ProfileUpdatePage from "./pages/profileUpdatePage/ProfileUpdatePage"
import HospitalUpdatePage from "./pages/hospitalUpdatePage/HospitalUpdatePage"


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
          path: "reservations",
          element: <ReservationsPage/>
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
        },
        {
          path: "createHospital",
          element: <CreateHospitalPage/>
        },
        {
          path: "notifications",
          element:<Notifications/>
        },
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "profileUpdatePage/:id",
          element: <ProfileUpdatePage/>
        },
        {
          path: "hospitalUpdatePage/:id",
          element: <HospitalUpdatePage/>
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