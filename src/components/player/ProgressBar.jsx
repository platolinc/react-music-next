import { useState, useEffect, useRef } from 'react';
import './ProgressBar.scss';

const ProgressBar = ({ progress }) => {
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const progressBtnWidth = 10;

  useEffect(() => {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    setOffset(barWidth * progress);
  }, [progress]);
  
  // const onTouchStart = (e) => {
  //   // Capture initial touch position and progress bar width
  //   const touchX = e.touches[0].pageX;
  //   const beginWidth = progressRef.current.clientWidth;
  //   setTouch({ x: touchX, beginWidth });
  // };

  // const onTouchMove = (e) => {
  //   const delta = e.touches[0].pageX - touch.x;
  //   const tempWidth = touch.beginWidth + delta;
  //   const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
  //   const newProgress = Math.min(1, Math.max(tempWidth / barWidth, 0));
  //   setOffset(barWidth * newProgress);
  // };

  // const onTouchEnd = () => {
  //   const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
  //   const newProgress = progressRef.current.clientWidth / barWidth;
  // };

  // const onClick = (e) => {
  //   const rect = progressBarRef.current.getBoundingClientRect();
  //   const offsetWidth = e.pageX - rect.left;
  //   const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
  //   const newProgress = offsetWidth / barWidth;
  // };

  return (
    <div className="progress-bar" ref={progressBarRef}>
      <div className="bar-inner">
        <div
          className="progress"
          style={{ width: `${offset}px` }}
          // ref={progressRef}
        ></div>
        <div
          className="progress-btn-wrapper"
          style={{ transform: `translate3d(${offset}px, 0, 0)` }}
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;