import { Route, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";
import MainPage from "./components/MainPage";
import { HomeLayout } from "./components/HomeLayout";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route  element={<HomeLayout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route element={<HomeLayout />}>
        <Route path="/game/:id" element={<GamePage/>}/>
      </Route>
    </Route>
  )
)
