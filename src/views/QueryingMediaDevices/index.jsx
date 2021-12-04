import React from "react";
import { Card } from "primereact/card";
import WebcamTesting from "../../components/WebcamTesting";
import AudioInputTesting from "../../components/AudioInputTesting";
import AudioOutputTesting from "../../components/AudioOutputTesting";

import styles from "./index.module.scss";

export default function Home() {
  const webcamSectionCardTitle = () => {
    return (
      <React.Fragment>
        <h2 className={styles.cardTitle}>Webcam</h2>
        <i className="pi pi-video" />
      </React.Fragment>
    );
  };

  const audioOutputSectionCardTitle = () => {
    return (
      <React.Fragment>
        <h2 className={styles.cardTitle}>Audio output</h2>
        <i className="pi pi-volume-up" />
      </React.Fragment>
    );
  };

  const audioInputSectionCardTitle = () => {
    return (
      <React.Fragment>
        <h2 className={styles.cardTitle}>Audio input</h2>
        {/* <i className="pi pi-video" /> */}
      </React.Fragment>
    );
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.hint}>
        <span>
          <i className="pi pi-info-circle" /> This website needs access to your
          camera and microphone.
        </span>
      </div>
      <div className="p-grid p-dir-col p-align-center">
        <div className="p-col-12 p-md-8 p-lg-5">
          <Card title={webcamSectionCardTitle}>
            <WebcamTesting />
          </Card>
        </div>
        <div className="p-col-12 p-md-8 p-lg-5">
          <Card title={audioOutputSectionCardTitle}>
            <AudioOutputTesting />
          </Card>
        </div>
        <div className="p-col-12 p-md-8 p-lg-5">
          <Card title={audioInputSectionCardTitle}>
            <AudioInputTesting />
          </Card>
        </div>
      </div>
    </div>
  );
}
