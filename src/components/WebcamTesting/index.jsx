import React, { useRef, useState, useEffect } from "react";
import { listDevices } from "../../utilts/enumerateDevices";
import { Dropdown } from "primereact/dropdown";

import styles from "./index.module.scss";

export default function WebcamTesting() {
  const localVideoRef = useRef();
  const [webcamAccess, setWebcamAccess] = useState("");
  const [selectedWebcam, setSelectedWebcam] = useState(false);
  const [videoInputDevices, setVideoInputDevices] = useState(null);

  useEffect(() => {
    startTestWebcam();
  }, []);

  const startTestWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      localVideoRef.current.srcObject = stream;
      setWebcamAccess(() => "allowed");
      getVideoInputDevices();
    } catch (error) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        setWebcamAccess(() => "disallowed");
      }

      alert(error.name);
    }
  };

  const getVideoInputDevices = async () => {
    const videoInputDevices = await listDevices({ kind: "videoinput" });
    setVideoInputDevices(() => videoInputDevices);
    setSelectedWebcam(() => videoInputDevices[0]);
  };

  const onChangeWebcam = async (e) => {
    setSelectedWebcam(e.value);

    const newVideoStream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: e.value.deviceId,
      },
      audio: false,
    });

    localVideoRef.current.srcObject = newVideoStream;
  };

  return (
    <section className={styles.webcamTesting}>
      {webcamAccess === "disallowed" ? (
        "Webcam permission denied."
      ) : (
        <React.Fragment>
          {videoInputDevices ? (
            <Dropdown
              optionLabel="label"
              value={selectedWebcam}
              options={videoInputDevices}
              onChange={onChangeWebcam}
            />
          ) : null}
          <div>
            <video ref={localVideoRef} autoPlay playsInline />
          </div>
        </React.Fragment>
      )}
    </section>
  );
}
