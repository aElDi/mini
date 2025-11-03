import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "@/pages/Root";
import "@/global.css"

const router = createBrowserRouter([{
  path: "/",
  element: (<Root/>),
}])

/** @type { import("react").FC } */
export default function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    <script
      src={import.meta.env.VITE_TRACKING_SCRIPT_URL}
      data-site-id={import.meta.env.VITE_TRACKING_SITE_ID}
      defer
    ></script>
    </>
  );
}
