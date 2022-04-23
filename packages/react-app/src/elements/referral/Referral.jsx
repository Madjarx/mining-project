// imports - react
import React, { useEffect, useState } from "react";
// imports - styles
import styles from "../styles";
// imports - antd
import { Input, Card, Space, Typography } from "antd";
import { CopyOutlined, LineChartOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Search } = Input;
const onSearch = value => console.log(value);

const suffix = (
  <LineChartOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

export default function Referral(
  web3Modal,
  useBurner,
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  isContract,
  targetNetwork,
) {
  // let displayAddress = address?.substr(0, 5) + "..." + address?.substr(-4);
  const walletAddress = () => {
    return <Text copyable={{ text: address }}>{address}</Text>;
  };
  const httpsURL = "https://www.wealthgenerator.com";
  const [refLink, setRefLink] = useState("");

  function generateRefLink() {
    setRefLink(`${httpsURL}/?referral=${address}`);
  }

  return (
    <div style={styles.box}>
      <Card title="Referral Link">
        <div style={styles.layout}>
          <Space direction="vertical">
            {web3Modal.cachedProvider ? (
              <Search
                // placeholder={`${httpsURL}/?referral=YOUR ETH ADDRESS HERE`}
                placeholder={address}
                enterButton={<CopyOutlined />}
                size="large"
                style={styles.input}
                onSearch={() => generateRefLink()}
              />
            ) : (
              <Search
                // placeholder={`${httpsURL}/?referral=YOUR ETH ADDRESS HERE`}
                placeholder={`Connect Wallet to get Referral Link`}
                enterButton={<CopyOutlined />}
                size="large"
                style={styles.input}
                disabled={true}
              />
            )}
          </Space>

          <div style={styles.paragraph}>
            <p>Earn 12% of the AVAX used to generate wealth from anyone who uses your referral link</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
