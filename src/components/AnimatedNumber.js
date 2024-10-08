import React, { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ value, suffix, description }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const numberRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 1200; 
      const increment = value / (duration / 100); 
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start)); 
        }
      }, 100); 

      return () => clearInterval(timer); 
    }
  }, [isVisible, value]);

  return (
    <div className="achievement" ref={numberRef}>
      <h2 className="achievement-value">
        {count}
        {suffix}
      </h2>
      <p className="achievement-description">{description}</p>
    </div>
  );
};

export default AnimatedNumber;
