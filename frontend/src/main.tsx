import { StrictMode } from "react";
import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "@/app/layouts/app/AppLayout";
import Binder from "@/app/pages/privates/binder/CardsBinder";
import NotFound from "@/app/pages/privates/not-found/NotFound";
import Pokedex from "@/app/pages/privates/pokedex/Pokedex";
import Profile from "@/app/pages/privates/profile/Profile";
import Shop from "@/app/pages/privates/shop/Shop";
import Tasks from "@/app/pages/privates/tasks/Tasks";
import Home from "@/app/pages/public/Home";
import App from "@/App.tsx";
import { queryClient } from "@/tools/lib/queryClient";

import "@/app/scss/global.scss";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "tasks", element: <Tasks /> },
          { path: "tasks/:id", element: <Tasks /> },
          { path: "shop", element: <Shop /> },
          { path: "pokedex", element: <Pokedex /> },
          { path: "binder", element: <Binder /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
