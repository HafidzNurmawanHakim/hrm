import React from "react";
import Dashboard from "./App/Pages/Dashboard";
import {
	Navigate,
	RouteObject,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import MainPage from "./App/Pages/MainPage";

function App() {
	const baseRoutes: RouteObject[] = [
		{
			path: "/",
			element: <MainPage />,
			children: [
				{
					path: "/dashboard",
					element: <Dashboard />,
				},
			],
		},
	];

	const router = createBrowserRouter([...baseRoutes]);

	return <RouterProvider router={router} />;
}

export default App;
