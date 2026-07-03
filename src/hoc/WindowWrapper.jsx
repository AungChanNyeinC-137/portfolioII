import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import React, { useEffect, useLayoutEffect, useRef } from "react";

const MINIMIZE_DURATION = 0.24;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const {
      isOpen,
      isMinimized,
      position,
      size,
      zIndex,
    } = windows[windowKey];
    const ref = useRef(null);
    const draggableRef = useRef(null);

    useGSAP(() => {
      const el = ref.current; //current element
      if (!el || !isOpen || isMinimized) return;
      el.style.display = "block";
      gsap.fromTo(
        el,
        { scale: 0.2, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isMinimized) return;
      const dock = document.querySelector("#dock");
      const dockRect = dock?.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const baseX = gsap.getProperty(el, "x");
      const baseY = gsap.getProperty(el, "y");
      const targetX = dockRect
        ? dockRect.left + dockRect.width / 2 - (rect.left + rect.width / 2)
        : 0;
      const targetY = dockRect
        ? dockRect.top - (rect.top + rect.height / 2)
        : window.innerHeight - rect.top;

      gsap.to(el, {
        x: `+=${targetX}`,
        y: `+=${targetY}`,
        scale: prefersReducedMotion() ? 1 : 0.12,
        opacity: prefersReducedMotion() ? 0 : 0,
        duration: prefersReducedMotion() ? 0 : MINIMIZE_DURATION,
        ease: "power2.in",
        onComplete: () => {
          el.style.display = "none";
          el.style.pointerEvents = "none";
          gsap.set(el, { opacity: 1, scale: 1, x: baseX, y: baseY });
        },
      });
    }, [isMinimized]);

    useGSAP(() => {
      const el = ref.current; 
      if (!el) return;
      const [instance] = Draggable.create(el,{
        allowEventDefault: true,
        trigger: el.querySelector("#window-header") || el,
        onPress:()=>focusWindow(windowKey),
      });
      draggableRef.current = instance;
      return ()=> instance.kill(); //destructure 'instance' from Draggable and kill it not to keep track of every open window
    }, []);

    useEffect(() => {
      const instance = draggableRef.current;
      if (!instance) return;
      if (isMinimized) {
        instance.disable();
      } else {
        instance.enable();
      }
    }, [isMinimized]);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const handleMouseDown = () => focusWindow(windowKey);

      el.addEventListener("mousedown", handleMouseDown);

      return () => {
        el.removeEventListener("mousedown", handleMouseDown);
      };
    }, [focusWindow]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (!isOpen) {
        el.style.display = "none";
      } else if (!isMinimized) {
        el.style.display = "block";
      }
      el.style.pointerEvents = isOpen && !isMinimized ? "auto" : "none";
      if (isOpen && !isMinimized && position && size) {
        gsap.set(el, {
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          x: 0,
          y: 0,
        });
      }
    }, [isOpen, isMinimized, position, size]);

    const windowStyle = {
      zIndex,
      ...(position && size
        ? {
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
          }
        : {}),
    };

    return (
      <section
        id={windowKey}
        ref={ref}
        style={windowStyle}
        className="absolute"
      >
        <Component {...props} />
      </section>
    );
  };
  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
