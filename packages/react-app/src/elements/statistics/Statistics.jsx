import React from "react";
import styles from "../styles";

export default function Statistics() {
  return (
    <div style={styles.box}>
      <div style={styles.layout}>
        <div style={styles.title}>
          <h5>Title</h5>
        </div>
        <div style={styles.container}>
          <div style={styles.info}>
            <p>Daily return</p>
            <h1>0</h1>
          </div>
          <div style={styles.info}>
            <p>APR</p>
            <h1>0</h1>
          </div>
          <div style={styles.info}>
            <p>dev fee</p>
            <h1>0</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
