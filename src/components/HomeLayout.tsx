import { Navigate, useOutlet } from "react-router-dom";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
  const outlet = useOutlet();

  return (
    <div>
      {outlet}
    </div>
  );
};
