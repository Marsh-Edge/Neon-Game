"use client";

import { useRef, useCallback, useEffect, useState } from "react";

export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    // Only left mouse button
    if (e.button !== 0) return;
    // Only horizontal overflow
    if (el.scrollWidth <= el.clientWidth) return;

    dragState.current.isDown = true;
    dragState.current.hasMoved = false;
    dragState.current.startX = e.pageX;
    dragState.current.scrollLeft = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.isDown) return;
    const el = ref.current;
    if (!el) return;

    const dx = e.pageX - dragState.current.startX;
    // Require 5px movement before treating as a drag (avoids intercepting clicks)
    if (!dragState.current.hasMoved && Math.abs(dx) < 5) return;

    dragState.current.hasMoved = true;
    setIsDragging(true);
    el.scrollLeft = dragState.current.scrollLeft - dx;
    e.preventDefault();
  }, []);

  const stopDrag = useCallback(() => {
    dragState.current.isDown = false;
    dragState.current.hasMoved = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("pointerdown", onPointerDown as unknown as EventListener);
    el.addEventListener("pointermove", onPointerMove as unknown as EventListener);
    el.addEventListener("pointerup", stopDrag);
    el.addEventListener("pointerleave", stopDrag);
    el.addEventListener("pointercancel", stopDrag);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown as unknown as EventListener);
      el.removeEventListener("pointermove", onPointerMove as unknown as EventListener);
      el.removeEventListener("pointerup", stopDrag);
      el.removeEventListener("pointerleave", stopDrag);
      el.removeEventListener("pointercancel", stopDrag);
    };
  }, [onPointerDown, onPointerMove, stopDrag]);

  return { ref, isDragging };
}
