import {Navbar, Welcome} from "#components";
import Dock from "#components/Dock";
import React from "react";

const App = () => {
  return (
    <main>
     <Navbar/>
     <Welcome/>
     <Dock/>
    </main>
  );
};

export default App;
