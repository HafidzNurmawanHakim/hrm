import React from "react";
import Dashboard from "./App/Pages/Dashboard";
import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./App/Pages/MainPage";
import Schedule from "./App/Pages/Schedule";

function App() {
   const baseRoutes: RouteObject[] = [
      {
         path: "/",
         element: <MainPage />,
         children: [
            {
               path: "/",
               element: <Navigate to={"/dashboard"} />,
            },
            {
               path: "/dashboard",
               element: <Dashboard />,
            },
            {
               path: "/schedule",
               element: <Schedule />,
            },
         ],
      },
   ];

   const router = createBrowserRouter([...baseRoutes]);

   return <RouterProvider router={router} />;
}

export default App;
