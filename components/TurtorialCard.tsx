"use client";
import TurtorialBox from "@/components/TurtorialBox";
import { tutorialContent } from "@/constants";
import { useEffect, useRef } from "react";

const TurtorialCard = () => {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    if (box1Ref.current) {
      observer.observe(box1Ref.current);
    }
    if (box2Ref.current) {
      observer.observe(box2Ref.current);
    }
    if (box3Ref.current) {
      observer.observe(box3Ref.current);
    }
    return () => {
      if (box1Ref.current) {
        observer.unobserve(box1Ref.current);
      }
      if (box2Ref.current) {
        observer.unobserve(box2Ref.current);
      }
      if (box3Ref.current) {
        observer.unobserve(box3Ref.current);
      }
    };
  }, []);

  return (
    <section className="w-[1100px] px-4 max-[1100px]:w-full">
      <div className="slide-in-left" ref={box1Ref}>
        <TurtorialBox
          title="Step 1：建立行程"
          videoUrl={tutorialContent.step_1.videoUrl}
          msgs={tutorialContent.step_1.msgs}
        />
      </div>
      <div className="slide-in-left mt-4" ref={box2Ref}>
        <TurtorialBox
          title="Step 2：規劃行程"
          videoUrl={tutorialContent.step_2.videoUrl}
          msgs={tutorialContent.step_2.msgs}
        />
      </div>
      <div className="slide-in-left mt-4" ref={box3Ref}>
        <TurtorialBox
          title="Step 3：分享行程"
          videoUrl={tutorialContent.step_3.videoUrl}
          msgs={tutorialContent.step_3.msgs}
        />
      </div>
    </section>
  );
};

export default TurtorialCard;
