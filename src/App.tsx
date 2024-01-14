import { Route, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";
import MainPage from "./components/MainPage";
import { HomeLayout } from "./components/HomeLayout";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import { OverFlowHiddenLayout } from "./components/OverFlowHidden";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={
        <OverFlowHiddenLayout>
          <HomeLayout />
        </OverFlowHiddenLayout>
      }>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route element={<HomeLayout />}>
        <Route path="/game/:id" element={<GamePage />} />
      </Route>
    </Route>
  )
)
