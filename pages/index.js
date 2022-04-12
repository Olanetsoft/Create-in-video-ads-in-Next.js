import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [showAd, setShowAd] = useState(false);

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

        // "..." is the spread operator here
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
      // Show the ad
      setShowAd(true);

      // Pause the main video
      videoRef.current.pause();

      console.log(adVideoRef.current);

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Create in-video ads in Next.js</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <video
              ref={videoRef}
              id="video"
              src="https://res.cloudinary.com/olanetsoft/video/upload/v1554336425/samples/elephants.mp4"
              preload="auto"
              controls
              onTimeUpdate={throttle(onVideoTimeUpdate)}
              width="100%"
              height="100%"
            ></video>
          </div>
          {showAd && (
            <div className={styles.card}>
              <video
                ref={adVideoRef}
                id="adVideo"
                src="https://res.cloudinary.com/olanetsoft/video/upload/v1554336421/samples/sea-turtle.mp4"
                preload="auto"
                controls
                onEnded={() => {
                  skipAd();
                }}
                width="100%"
                height="100%"
              ></video>
              <button className="skip" ref={skipButtonRef} onClick={skipAd}>
                SKIP AD
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
