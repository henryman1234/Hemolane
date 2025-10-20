import React, { Fragment, useState } from "react";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes, useRouteError } from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Test from "./components/Test";
import Subscribe from "./pages/suscribe/Subscribe";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/profile/Profile";
import ProfileUpdatepage from "./pages/profileUpdatePage/ProfileUpdatePage";
import Trainings from "./pages/trainings/Trainings";
import { Layout, RequireAuthLayout } from "./pages/layout/Layout";
import Contacts from "./pages/contacts/Contacts";



function App () {


    const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout/>,
          errorElement: <PageError/>,
          children: [
            {
              path: "",
              element: <Home/>
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
              path: "test",
              element: <Test/>
            },

            {
              path: "trainings",
              element: <Trainings/>
            },
            {
              path: "admin",
              element: <Admin/>
            },
            {
              path: "subscribe",
              element: <Subscribe/>
            },
            {
              path: "contacts",
              element: <Contacts/>
            }


          ]
        },

        {
          path: "",
          element: <RequireAuthLayout/>,
          children: [
            {
              path: "login",
              element: <Login/>
            },
            {
              path: "profile",
              element: <Profile/>
            },
            {
              path: "profileUpdatePage/:id",
              element: <ProfileUpdatepage/>
            },

          ]
        }

      ])

    return (
      <RouterProvider router={router}/>
    )
}

function PageError () {
    const error = useRouteError() as {data?: string, message?: string}
    console.log(error)
    return (
      <div>
        <h1>Une érreur est survenue</h1>
        <p>{error?.data ?? error?.message}</p>
      </div>
    )
  }

export default App