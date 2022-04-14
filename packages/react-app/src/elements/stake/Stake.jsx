// imports - React core imports
import React, { useState } from "react";
// imports - styles
import styles from "../styles";

export default function Stake() {
  return (
    <div style={styles.box}>
      <div style={styles.layout}>
        <div style={styles.info}>
          <p>Contract</p>
          <h1>0</h1>
        </div>
        <div style={styles.info}>
          <p>Wallet</p>
          <h1>0</h1>
        </div>
        <div style={styles.info}>
          <p>Your trash</p>
          <h1>0</h1>
        </div>
        <div style={styles.group}>

          <input type="text" style={styles.input}/>
          <button style={styles.button}>btn1 (lower border)</button>
          
          <hr style={styles.divider}/>

          <div style={styles.title}>title</div>

          <div style={styles.btn_group}>
            <button>re-hire</button>
            <button>pull out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
