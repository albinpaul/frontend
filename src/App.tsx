import { Route, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";
import MainPage from "./components/MainPage";
import { AuthLayout } from "./components/AuthLayout";
import { HomeLayout } from "./components/HomeLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route  element={<HomeLayout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Route>
  )
)
