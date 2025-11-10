import React from "react";
import {
  Link,
  createBrowserRouter,
  RouterProvider,
  useRouteError

} from "react-router-dom"
import HomePage from "./pages/homePage/HomePage";
import ListPage from "./pages/listPage/ListPage";
import Profile from "./pages/profile/Profile";
import ProfileUpdatePage from "./pages/profileUpdatePage/ProfileUpdatePage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { Layout, RequireAuthLayout } from "./pages/layout/Layout";
import SinglePage from "./pages/singlePage/SinglePage";
import { listPageLoader } from "./loader/listPageLoader";

function App () {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <PageError/>,
      children: [
        {
          path: "",
          element: <HomePage/>
        },

        {
          path: ":id",
          element: <SinglePage/>
        },


        {
          path: "register",
          element: <Register/>
        },
        {
          path: "login",
          element: <Login/>
        }
        
      ]
    },
     {
      path: "/",
      element: <RequireAuthLayout/>,
      children: [
        {
          path: "profileUpdatePage/:id",
          element: <ProfileUpdatePage/>
        },
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "list",
          element: <ListPage/>,
          loader: listPageLoader
        },
      ]
     }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

function PageError  () {
  const error = useRouteError() as {error: {stack: string, message: string}, data: string}
  console.log(error)
  return (
    <div>
      <p>l'érreur ci-dessous est survenue</p>
      <h1> {error?.error?.message ?? error?.data}</h1>
    </div>
  )
}

export default App