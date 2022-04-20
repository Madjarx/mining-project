// imports - react
import React from "react";
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

// TODO: napravi da moze da se kopira jebena adresa walleta na click, znaci value se preffiluje ako si ulogovan
// Egnlish translation: Make the referral box prefilled with the address if the user is logged in, so thats the value prop of the search, and make it copyable on button click

export default function Referral(  web3Modal, address,) {

  // let displayAddress = address?.substr(0, 5) + "..." + address?.substr(-4);
  const walletAddress = () => {
    return (
      <Text copyable={{ text: address }}>
        {address}
      </Text>
    );
  };
  


  const httpsURL = "https://www.wealthgenerator.com";

  return (
    <div style={styles.box}>
      <Card title="Referral Link">
        <div style={styles.layout}>
          <Space direction="vertical">
            <Search
              // placeholder={`${httpsURL}/?referral=YOUR ETH ADDRESS HERE`}
              placeholder={
                web3Modal.cachedProvider? 
                `${httpsURL}/?ref=${address}`
                :
                `${httpsURL}/?ref=`
              }
              enterButton={<CopyOutlined />}
              size="large"
              style={styles.input}
              onSearch={onSearch}
              // value={walletAddress}
            />
          </Space>

          <div style={styles.paragraph}>
            <p>Earn 12% of the AVAX used to mine ruby
            from anyone who uses your referral link</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
