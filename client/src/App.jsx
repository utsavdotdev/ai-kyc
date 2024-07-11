import react from "react";
import Router from "./route";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Router />
    </>
  );
}

export default App;
