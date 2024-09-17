import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RepoDetails } from "./pages/RepoDitails/RepoDitails";
import RepoSearch from "./pages/RepoSearch/RepoSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RepoSearch />,
  },
  {
    path: "/repo/:id",
    element: <RepoDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
