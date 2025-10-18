// app/components/RukiCircleTrigger.jsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RukiCircleTrigger() {
  const triggerRef = useRef(null);
  const circleRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.set(circleRef.current, { scale: 0.8 });

ScrollTrigger.create({
  trigger: "#trigger-circle",
  start: "top center",
  end: "bottom center",
  scrub: true,
  // TANPA pin:
  onUpdate: (self) => {
    const scale = 1 + self.progress * 18;
    gsap.to(circleRef.current, {
      scale,
      duration: 0.1,
      ease: "power1.out",
    });
  },
});
  });

  return () => ctx.revert();
}, []);


  return (
    <div ref={triggerRef} className="relative h-screen w-screen bg-transparent z-11">
      <div
        ref={circleRef}
        className="fixed bottom-0 right-0 w-20 h-20 rounded-full bg-blue-600 z-11"
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
}
