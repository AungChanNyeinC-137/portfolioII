import React from "react";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

import { Dock, Navbar, Welcome } from "#components";
import { Contact, Finder, ImageViewer, Photos, Resume, Safari, Terminal, Text } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Photos />
      <Safari />
      <Resume />
      <Finder/>
      <Text/>
      <ImageViewer/>
      <Contact/>
    </main>
  );
};

export default App;
