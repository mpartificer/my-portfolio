import { useState, useEffect, useRef, memo } from "react";

// Memoized Welcome Banner Component with smooth fade-in and visible overflow
const WelcomeBanner = memo(() => {
  const [animationState, setAnimationState] = useState("initial");
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Only play animation if it hasn't played yet in this session
    if (!hasAnimatedRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setAnimationState("animate");
        hasAnimatedRef.current = true;
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Skip animation if already played
      setAnimationState("completed");
    }
  }, []);

  return (
    <div className="w-full py-4 mb-8 rounded-2xl text-2xl flex justify-center">
      {/* Use a container div that will be faded in */}
      <div className="welcome-container">
        <h1
          className={`text-3xl text-blue-900 babycakes-font text-center welcome-text ${
            animationState !== "initial" ? animationState : ""
          }`}
        >
          <span className="letter-h">H</span>
          <span className="letter-i">i</span>
          <span className="letter-comma">,</span>
          <span className="letter-space1">&nbsp;</span>
          <span className="letter-I">I</span>
          <span className="letter-apostrophe">'</span>
          <span className="letter-m">m</span>
          <span className="letter-space2">&nbsp;</span>
          <span className="letter-M">M</span>
          <span className="letter-e">e</span>
          <span className="letter-g">g</span>
          <span className="letter-a">a</span>
          <span className="letter-n">n</span>
          <span className="exclamation-mark">&nbsp;!</span>
        </h1>
      </div>
    </div>
  );
});

export default WelcomeBanner;
