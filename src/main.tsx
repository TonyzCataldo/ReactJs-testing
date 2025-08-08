import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout.tsx";
import Counter from "./components/Counter/Counter.tsx";
import NewPage from "./components/NewPage/NewPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Counter defaultCount={0} description="sei la" />,
      },
      {
        path: "pagina",
        element: <NewPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
