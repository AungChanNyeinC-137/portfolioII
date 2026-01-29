import React from "react";
import { Draggable } from 'gsap/Draggable'
import gsap from "gsap";

import {Dock, Navbar, Welcome} from "#components";
import { Photos, Safari, Terminal } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
     <Navbar/>
     <Welcome/>
     <Dock/>
     <Terminal/>
     <Photos/>
     <Safari/>

    </main>
  );
};

export default App;
