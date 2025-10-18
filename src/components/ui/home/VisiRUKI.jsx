"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";


const VisiRUKI = () => {
  const containerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Line_Animation
    const line2 = containerRef.current.querySelector(".line-white2");
    const line3 = containerRef.current.querySelector(".line-white3");
    const line = containerRef.current.querySelector(".line-white");

    gsap.fromTo(
      line,
      { height: "0%" }, 
      {
        height: "100%", 
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.001,
          toggleActions: "play none none reverse", 
          
        },
      }
    );

    gsap.fromTo(
      line2,
      { height: "0%" }, 
      {
        height: "100%", 
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.2,
          toggleActions: "play none none reverse", 

        },
      }
    );

    gsap.fromTo(
      line3,
      { height: "0%" }, 
      {
        height: "100%", 
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.44,
          toggleActions: "play none none reverse", 

        },
      }
    );

    // Line_Animation

    // Line_Fill_Animation
    const lineFill = containerRef.current.querySelector(".line-fill");
    const lineFill2 = containerRef.current.querySelector(".line-fill2");
    const lineFill3 = containerRef.current.querySelector(".line-fill3");

    gsap.to(lineFill, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => "+=" + containerRef.current.offsetHeight * 0.2,
        scrub: true,
      },
    });

    gsap.to(lineFill2, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: () => "+=" + containerRef.current.offsetHeight * 0.2,
        end: () => "+=" + containerRef.current.offsetHeight * 0.3,
        scrub: true,
      },
    });

    gsap.to(lineFill3, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: () => "+=" + containerRef.current.offsetHeight * 0.44,
        end: () => "+=" + containerRef.current.offsetHeight * 0.5,
        scrub: true,
      },
    });

    // Line_Fill_Animation

    // Text_Animation
    const visionText = containerRef.current.querySelector(".vision-text");
    const ambitionText = containerRef.current.querySelector(".ambition-text");
    const missionText = containerRef.current.querySelector(".mission-text");

    gsap.fromTo(
      visionText,
      { opacity: 0, y: 30 }, 
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.01,
          toggleActions: "play none none reverse", 
        
        },
      }
    );



    gsap.fromTo(
      ambitionText,
      { opacity: 0, y: 30 }, 
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.2,
          toggleActions: "play none none reverse", 
          
        },
      }
    );

    gsap.fromTo(
      missionText,
      { opacity: 0, y: 30 }, 
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.44,
          toggleActions: "play none none reverse", 
          
        },
      }
    );

    // Text_Animation

    // Title_Animation
    const visionTitle = containerRef.current.querySelector(".vision-title");
    const ambitionTitle = containerRef.current.querySelector(".ambition-title");
    const missionTitle = containerRef.current.querySelector(".mission-title");

    gsap.fromTo(
      visionTitle,
      { y: 20, x: -4 }, 
      {
        x: 0,
        y: 0, 
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.01,
          toggleActions: "play none none reverse",
          onEnter: () => {
          gsap.to([ambitionTitle, missionTitle], {
            yPercent: 120,
            duration: 0.5,
            ease: "power1.out",
          });
        },
        onLeaveBack: () => {
          gsap.to([ambitionTitle, missionTitle], {
            yPercent: 0,
            duration: 1.5,
            ease: "power1.out",
          });
        },
        },
      }
    );


    




    gsap.fromTo(
      ambitionTitle,
      { y: -70 }, 
      {
        y: 0, 
        yPercent: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.2,
          toggleActions: "play none none reverse",
          onEnter: () => {
          gsap.to([missionTitle], {
            yPercent: 540,
            duration: 0.9,
            ease: "power1.out",
          });
        },
        onLeaveBack: () => {
          gsap.to([missionTitle], {
            yPercent: 110,
            duration: 0.9,
            ease: "power1.out",
          });
        },
        },
      }
    );

    gsap.fromTo(
      missionTitle,
      { y: -160 }, 
      {
        y: 0, 
        yPercent: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "+=" + containerRef.current.offsetHeight * 0.44,
          toggleActions: "play none none reverse",
        },
      }
    );


    // Title_Animation


  },[])



    return (
    <div ref={containerRef} className="w-screen h-2300 relative z-12 px-4 pt-6 bg-blue-950 top-[-25px] text-white">
      
      <div className="w-full h-max sticky top-18 left-0">
        <h1 className='font-bold text-2xl'>RUKI</h1>
        <h2 className="font-light">Ruang Kreasi dan Informasi</h2>
      </div>

      {/* vision */}
      <div className="w-full h-max flex items-center justify-center sticky top-60 left-0 mt-30">
        <div className="relative w-5 h-20 top-0">
          <div className="bg-white w-[3px] h-20 absolute top-0 left-0 line-white"></div>
          <div className="bg-blue-800 w-[3px] h-0 absolute top-0 left-0 line-fill"></div>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <h5 className="vision-title font-semibold">Ruki Vision</h5>
            <p className="vision-text">Menginspirasi Untuk Berinovasi. <span className="invisible">hsdkfhksfhsdfhkshfhkhkhkhhk</span></p>
          </div>
        </div>
      </div>
      {/* vision */}

      {/* ambition */}
      <div className="w-full h-max flex items-center justify-center sticky top-90 left-0 mt-10">
        <div className="relative w-5 h-20 top-0">
          <div className="bg-white w-[3px] h-20 absolute top-0 left-0 line-white2"></div>
          <div className="bg-blue-800 w-[3px] h-0 absolute top-0 left-0 line-fill2"></div>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <h5 className="ambition-title font-semibold">Ruki Ambition</h5>
            <p className="ambition-text">Mewujudkan Ekosistem Informasi Yang Terintegrasi. <span className="invisible">Lorem ipsum do</span></p>
          </div>
        </div>
      </div>
      {/* ambition */}

      {/* mission */}
      <div className="w-full h-max flex items-center justify-center sticky top-120 left-0 mt-10">
        <div className="relative w-5 h-20 top-0">
          <div className="bg-white w-[3px] h-20 absolute top-0 left-0 line-white3"></div>
          <div className="bg-blue-800 w-[3px] h-0 absolute top-0 left-0 line-fill3"></div>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <h5 className="mission-title font-semibold">Ruki Mission</h5>
            <p className="mission-text">Menghadirkan Platform Dengan Berbagai Fitur <span className="invisible">Lorem ipsum, dolor</span></p>
          </div>
        </div>
      </div>
      {/* mission */}

    </div>
    )
}

export default VisiRUKI;