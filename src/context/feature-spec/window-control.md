Improve WindowWrapper by adding macOS-like functionality for the yellow and green traffic-light buttons.

Context:
- The red button / closeWindow functionality already works.
- The UI is a macOS-inspired portfolio desktop.
- WindowWrapper currently displays the three traffic-light buttons, but only close works.
- Implement yellow = minimize and green = maximize/restore by referencing macOS behavior.
- Do not break the existing close behavior or current window UI.

Main goals:

1. Yellow button: Minimize window
- Clicking the yellow button should minimize the window.
- A minimized window should disappear from the desktop area, but it should NOT be closed/destroyed.
- Its internal state/content should be preserved.
- The minimized window should be restorable by clicking its related Dock icon/app icon.
- Add a smooth macOS-like minimize animation:
  - window slightly scales down
  - fades or slides toward the Dock area
  - then becomes hidden
- If there is already a Dock component/state, integrate with it.
- If there is no centralized window manager yet, add the minimum required state management so each window can track:
  - isOpen
  - isMinimized
  - isMaximized
  - previous position/size before maximize

Expected behavior:
- Red close = removes/closes the window.
- Yellow minimize = hides the window but keeps it restorable.
- Clicking the app icon while minimized = restores the window to its previous position and size.
- If the window was maximized before minimizing, restoring should bring it back maximized.
- Minimized windows should not block clicks on the desktop.

2. Green button: Maximize / restore window
- Clicking the green button should toggle maximize/restore.
- On first click:
  - save the current window position and size
  - expand the window to fill the usable desktop area
- On second click:
  - restore the window to the exact previous position and size
- The maximized window should respect the macOS-style layout:
  - do NOT cover the top menu bar/navbar
  - do NOT cover the bottom Dock if the Dock is visible
  - use the available desktop viewport between those areas
- If there is no exact Dock/menu height value available, calculate based on actual elements or define safe constants.
- Maximized window should have a smooth transition.
- While maximized:
  - dragging should be disabled or should first restore before dragging
  - resizing, if currently supported, should be disabled
  - window border radius can be slightly reduced but still match current design
- Double-clicking the window title bar should also toggle maximize/restore, similar to desktop window behavior.

3. Window focus / z-index behavior
- Clicking any window should bring it to the front.
- Restoring a minimized window should bring it to the front.
- Maximizing a window should bring it to the front.
- Closing/minimizing the focused window should correctly update focus/z-index without breaking other windows.

4. Visual details
- Keep the existing macOS traffic-light button design.
- Add hover indicators like macOS:
  - red shows close icon or “x”
  - yellow shows minimize icon or “–”
  - green shows maximize/restore icon
- Buttons should have proper cursor:pointer.
- Add accessible labels:
  - aria-label="Close window"
  - aria-label="Minimize window"
  - aria-label="Maximize window" or "Restore window"
- Do not make the UI look bulky. Keep it clean and close to the current design.

5. State architecture
- Prefer a clean centralized window state if this app already has multiple windows.
- Each window should be represented with something like:

  {
    id,
    title,
    isOpen,
    isMinimized,
    isMaximized,
    zIndex,
    position: { x, y },
    size: { width, height },
    previousPosition,
    previousSize
  }

- If the current architecture is simpler, adapt without overengineering, but make sure the implementation supports multiple windows reliably.

6. Animation requirements
- Use existing animation approach if the project already uses Framer Motion / GSAP / Tailwind transitions.
- Keep animations fast and smooth:
  - minimize: around 180–300ms
  - maximize/restore: around 180–250ms
- Respect reduced motion:
  - if prefers-reduced-motion is enabled, avoid fancy scale/slide animation and just toggle state cleanly.

7. Responsive behavior
- On smaller screens, maximize should fill the usable visible area safely.
- Avoid window overflowing outside viewport.
- Restore should never place a window outside the visible screen.
- Clamp restored position if the viewport size changed while the window was minimized/maximized.

8. Do not break existing behavior
- Existing WindowWrapper props should remain backward-compatible.
- Existing closeWindow functionality must still work exactly as before.
- Existing content inside windows must not unmount unnecessarily when minimizing.
- Do not introduce hydration errors in Next.js.
- Do not hardcode values in a fragile way unless absolutely necessary.

9. Acceptance tests
Please verify these manually after implementation:

- Red button closes the window.
- Yellow button minimizes the window.
- Minimized window disappears from desktop.
- Clicking the matching Dock/app icon restores the minimized window.
- Restored window keeps previous content and state.
- Green button maximizes the window.
- Green button again restores the exact previous size and position.
- Maximized window does not cover the top navbar/menu bar.
- Maximized window does not cover the Dock.
- Dragging works normally when not maximized.
- Dragging does not behave weirdly while maximized.
- Multiple windows can be opened, focused, minimized, restored, and maximized independently.
- z-index remains correct after restore/maximize.
- Mobile/small screen layout does not overflow badly.

Implementation priority:
1. Add clean minimize/restore state.
2. Add green maximize/restore toggle.
3. Add z-index/focus handling if not already stable.
4. Add small macOS-like hover icons and animations.
5. Test with all existing windows.