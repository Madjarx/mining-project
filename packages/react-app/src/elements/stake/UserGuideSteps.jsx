import React from "react";
import {
  Space,
  Steps,
} from "antd";
import {
  ThunderboltOutlined,
  DownloadOutlined,
  LineChartOutlined,
  DollarCircleOutlined,
  AudioOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import styles from '../styles';

const { Step } = Steps;

export default function UserGuideSteps(currentStep) {
  return (
    <div>
      <Space>
        {/* size="small" */}
        <Steps current={currentStep} style={styles.steps} responsive="true">
          <Step
            title="Connect Wallet"
            description="Get Started."
            icon={currentStep === 0 ? <LoadingOutlined /> : ""}
            style={styles.step}
          />
          <Step
            title="Get Funds"
            description="Get Loaded"
            icon={currentStep === 1 ? <LoadingOutlined /> : ""}
            style={styles.step}
          />
          <Step
            title="Buy Generators"
            description="Generate Gains."
            icon={currentStep === 2 ? <LoadingOutlined /> : ""}
            style={styles.step}
          />
          <Step
            title="Reinvest"
            description="Amplify Gains."
            icon={currentStep === 3 ? <LoadingOutlined /> : ""}
            style={styles.step}
          />
          <Step title="Earn" description="Make Bank." style={styles.step} />
        </Steps>
      </Space>
    </div>
  );
}
