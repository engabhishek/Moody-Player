import React, { useState } from "react";
import FaceExpression from "./components/FaceExpression";
import Tracks from "./components/Tracks";

function App() {

   const [Songs, setSongs] = useState([]);

  return (
    <div className="">
      <h1 className="text-2xl font-extrabold m-8">🎵 Moody Player</h1>
      <FaceExpression setSongs={setSongs} />
      <Tracks Songs={Songs} />
    </div>
  );
}

export default App;
