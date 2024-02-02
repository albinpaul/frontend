import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainPage from "./components/MainPage";
import { HomeLayout } from "./components/HomeLayout";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import { OverFlowHiddenLayout } from "./components/OverFlowHidden";
import RoomPage from "./components/RoomPage";

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
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Route>
  )
)
