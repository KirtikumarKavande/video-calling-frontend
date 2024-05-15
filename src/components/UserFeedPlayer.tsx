import React, { useEffect, useRef } from "react";

const UserFeedPlayer = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef?.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <video
      ref={videoRef}
      style={{ width: "500px", height: "300px" }}
      muted={true}
      autoPlay
    />
  );
};

export default UserFeedPlayer;
