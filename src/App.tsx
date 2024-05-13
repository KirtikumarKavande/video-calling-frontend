import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Room from "./components/pages/Room";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/:roomId" element={<Room/>} />

    </Routes>
  );
}
