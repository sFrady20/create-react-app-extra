import React from "react";
import styles from "./App.module.scss";
import Router from "./components/Router";

export default () => {
  return (
    <div className={styles.root}>
      <Router />
    </div>
  );
};
