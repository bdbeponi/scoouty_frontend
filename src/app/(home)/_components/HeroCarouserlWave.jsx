const Wave = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
      <svg
        // Increase width to 200% for smooth animation loop
        className="relative block w-[200%] h-40 animate-wave"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          // UPDATED PATH: Uses multiple cubic Bézier curves (C) to create peaks and valleys
          d="M0,48 C150,96 350,0 600,48 C850,96 1050,0 1200,48 L1200,120 L0,120 Z"
          fill="rgba(255,255,255,0.2)"
        ></path>
      </svg>

      <style jsx>{`
        .animate-wave {
          /* Adjust duration for speed */
          animation: waveAnimation 15s linear infinite;
        }

        @keyframes waveAnimation {
          0% {
            transform: translateX(0);
          }
          /* Translates the 200% wide SVG to the left by 50% of its width
             to create a seamless, looping animation */
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Wave;
