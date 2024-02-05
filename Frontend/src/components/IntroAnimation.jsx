import React, { useState, useEffect } from "react";

const IntroAnimation = () => {
  const [displayText, setDisplayText] = useState("");
  const textContent =
    "Maaster Todo App is your go-to solution for efficient task management and workflow organization. Whether you're an individual or part of a team, our app simplifies the process of managing your to-dos, making productivity a breeze.";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < textContent.length - 1) {
        setDisplayText((prevText) => prevText + textContent[index]);
        index++;
        if (textContent[index] === undefined) {
          clearInterval(intervalId);
        }
      } else {
        clearInterval(intervalId);
      }
    }, 40); // Adjust the delay for a faster animation speed

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <div>{displayText}</div>;
};

export default IntroAnimation;
