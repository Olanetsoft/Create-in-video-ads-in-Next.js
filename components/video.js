import { useRef } from "react";

export default function Video() {
  const videoRef = useRef(null);

  const adVideoRef = useRef(null);

  const skipButtonRef = useRef(null);

  const throttle = (func, delay = 800) => {
    // Previously called time of the function
    let prev = 0;
    return (...args) => {
      // Current called time of the function
      let now = new Date().getTime();

      // If difference is greater than delay call
      // the function again.
      if (now - prev > delay) {
        prev = now;

        // returning the function with the
        // array of arguments
        return func(...args);
      }
    };
  };

  const onVideoTimeUpdate = (ev) => {
    const { currentTime } = ev.target;

    // Check if the video's current time matches the ad's begin time
    if (Math.round(currentTime).toFixed(2) === Math.round(15).toFixed(2)) {
      // Pause the main video
      videoRef.current.pause();

      // Show the ad video element on top of the main video
      adVideoRef.current.style.display = "block";

      // Show the skip ad button
      skipButtonRef.current.style.display = "block";

      // Play the ad video
      adVideoRef.current.play();
    }
  };

  const skipAd = () => {
    // Make sure the ad video is paused
    adVideoRef.current.pause();

    // Hide the ad video element
    adVideoRef.current.style.display = "none";

    // Hide the skip ad button
    skipButtonRef.current.style.display = "none";

    // Increase the main video's current time by one second to prevent the ad from playing twice
    videoRef.current.currentTime += 1;

    // Play the main video
    videoRef.current.play();
  };

  return (
    <div className="wrapper">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          id="video"
          src="https://res.cloudinary.com/olanetsoft/video/upload/v1554336425/samples/elephants.mp4"
          preload="auto"
          controls
          onTimeUpdate={throttle(onVideoTimeUpdate)}
        ></video>
        <video
          ref={adVideoRef}
          id="adVideo"
          src="https://res.cloudinary.com/olanetsoft/video/upload/v1554336421/samples/sea-turtle.mp4"
          preload="auto"
          controls
          onEnded={() => {
            skipAd();
          }}
        ></video>
        <button className="skip" ref={skipButtonRef} onClick={skipAd}>
          SKIP AD
        </button>
      </div>
      <style jsx>{`
        .wrapper {
          background-color: #ffffff;
          height: 100%;
          width: 100%;
        }

        .video-wrapper {
          position: relative;
          width: 80%;
          margin: 20px auto;
          background-color: #ffffff;
        }

        .video-wrapper video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-wrapper video#adVideo {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: none;
        }

        .video-wrapper button.skip {
          position: absolute;
          bottom: 100px;
          right: 20px;
          padding: 15px;
          min-width: 100px;
          font-weight: bold;
          border: 1px solid #ffffff;
          background-color: #ffffff7c;
          display: none;
        }

        .video-wrapper button.skip:hover {
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
}
