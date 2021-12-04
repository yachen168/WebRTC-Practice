import React from "react";
import QueryingMediaDevices from "./views/QueryingMediaDevices";
import styles from "./app.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <QueryingMediaDevices />
    </div>
  );
};

export default App;
