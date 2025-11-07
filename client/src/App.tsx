import React from "react";
import {
  Link,
  createBrowserRouter,
  RouterProvider,
  useRouteError

} from "react-router-dom"
import Layout from "./pages/layout/Layout";
import HomePage from "./pages/homePage/HomePage";
import ListPage from "./pages/listPage/ListPage";
import SinglePage from "./components/singlePage/SinglePage";
import Profile from "./pages/profile/Profile";
import ProfileUpdatePage from "./pages/profileUpdatePage/ProfileUpdatePage";

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
          path: "list",
          element: <ListPage/>,
        },
        {
          path: ":id",
          element: <SinglePage/>
        },
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "profileUpdatePage/:id",
          element: <ProfileUpdatePage/>
        }
        
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