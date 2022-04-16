import React from "react";
import styles from "../styles";
import { Space, Button } from 'antd';
import { Steps } from "antd";

const { Step } = Steps;

export default function Navbar() {
  return (
    // <div style={styles.header}>
    //     Title
    // </div>
    // <MyHeader />
    <Space>
      <Steps current={1}>
        <Step title="Connect Wallet" description="Get Started." />
        <Step title="Deposit Funds" description="Generate Gains." />
        <Step title="Reinvest" description="Amplify Gains." />
        <Step title="Earn" description="Make Bank." />
      </Steps>
    </Space>
  );
}
