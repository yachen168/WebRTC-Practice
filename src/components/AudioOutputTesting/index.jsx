import React, { useEffect, useState, useRef } from "react";
import { listDevices } from "../../utilts/enumerateDevices";
import { Dropdown } from "primereact/dropdown";

import styles from "./index.module.scss";

export default function AudioOutputTesting() {
  const audioOutputRef = useRef();
  const [selectedAudioOutput, setSelectedAudioOutput] = useState(false);
  const [audioOutputDevices, setAudioOutputDevices] = useState(null);
  const [micAccess, setMicAccess] = useState("");

  useEffect(() => {
    startTestAudioOutput();
  }, []);

  const startTestAudioOutput = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      const audioOutputDevices = await listDevices({ kind: "audiooutput" });
      setMicAccess(() => "allowed");
      setAudioOutputDevices(() => audioOutputDevices);
      setSelectedAudioOutput(() => audioOutputDevices[0]);
    } catch (error) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        setMicAccess(() => "disallowed");
      }

      alert(error.name);
    }
  };

  const onChangeAudioOutput = async (e) => {
    setSelectedAudioOutput(e.value);

    try {
      await audioOutputRef.current.setSinkId(e.value.deviceId);
    } catch (error) {
      alert(error);
    }
  };

  if (micAccess === "disallowed") return "Microphone permission denied";

  return (
    <div className={styles.audioOutputTesting}>
      <Dropdown
        optionLabel="label"
        value={selectedAudioOutput}
        options={audioOutputDevices}
        onChange={onChangeAudioOutput}
      />
      <div>
        <audio
          ref={audioOutputRef}
          src="https://www.w3schools.com/html/horse.ogg"
          playsInline
          controls
        />
      </div>
    </div>
  );
}
