import React from "react";
import FaceExpression from "./components/FaceExpression";
import Tracks from "./components/Tracks";

function App() {
  return (
    <div className="">
      <h1 className="text-2xl font-extrabold m-8">🎵 Moody Player</h1>
      <FaceExpression />
      <Tracks />
    </div>
  );
}

export default App;
