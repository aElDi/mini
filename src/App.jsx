import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import "./global.css"

const router = createBrowserRouter([{
  path: "/",
  element: (<Root/>),
}])

/** @type { import("react").FC } */
export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}
