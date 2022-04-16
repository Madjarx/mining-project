// imports - react
import React from "react";
// imports - styles
import styles from "../styles";
// imports - antd
import { Input, Card, Space } from "antd";
import { CopyOutlined, LineChartOutlined } from "@ant-design/icons";

const { Search } = Input;
const onSearch = value => console.log(value);

const suffix = (
  <LineChartOutlined
    // <DollarCircleOutlined
    // <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const nativeCurrency = "AVAX";

export default function Referral() {
  const httpsURL = "https://www.google.com";

  return (
    <div style={styles.box}>
      <Card title="Referral Link">
        <div style={styles.layout}>
          <Space direction="vertical">
            <Search
              placeholder={`${httpsURL}/?referral=YOUR ETH ADDRESS HERE`}
              enterButton={<CopyOutlined />}
              size="large"
              style={styles.input}
              onSearch={onSearch}
            />
          </Space>

          <div style={styles.paragraph}>
            <p>You earn 12% of whatever they earn</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
