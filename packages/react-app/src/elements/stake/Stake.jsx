// imports - react
import React, { useState } from "react";
// imports - styles js
import styles from "../styles";
// imports - antd
import { DownloadOutlined, LineChartOutlined, DollarCircleOutlined, AudioOutlined } from "@ant-design/icons";
import { Progress, Input, Divider, Empty, Card, Statistic, Row, Col, Button, Menu, Dropdown, Space } from "antd";

const nativeCurrency = "AVAX";
const amountWithinWallet = "0.1"; // TODO: integrate into wallet
const amountWithinContract = "120201.45";
const amountOfRedeemableRewards = 0.3;
const { Search } = Input;

const calculateRewardsPercent = (actualNow, estimatedMax) => {
  return "0.7"; // return the % of redeemable vs max possible
};

function handleMenuClick(e) {
  console.log("click", e);
}

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

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="2">Share</Menu.Item>
    <Divider style={styles.divider} />
    <Menu.Item key="1">Learn Optimizations</Menu.Item>
    <Divider style={styles.divider} />
    <Menu.Item key="3">Withdraw</Menu.Item>
  </Menu>
);

const onSearch = value => console.log(value);

export default function Stake() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div style={styles.box}>
      <Card title="Fortuna Wealth Generator" bordered={false}>
        <div style={styles.layout}>
          <Row gutter={16}>
            <Col span={12}>
              {/* TODO: make "Contract" a href to the etherscan url  */}
              <Statistic title="Contract Balance" value={amountWithinContract} />
            </Col>
            <Col span={12}>
              {/* TODO: make "Wallet" a href to their etherscan url  */}
              <Statistic title="Wallet Balance" value={`${amountWithinWallet} ${nativeCurrency}`} precision={2} />
              {isConnected ? (
                <Button style={{ marginTop: 16 }} type="primary">
                  Recharge
                </Button>
              ) : (
                <Button style={{ marginTop: 16 }} type="primary">
                  Connect Wallet
                </Button>
              )}
            </Col>
          </Row>
          <Divider orientation="left" orientationMargin="0">
            Add Funds
          </Divider>

          <div style={styles.group}>
            <Space direction="vertical">
              <Search
                placeholder={`amount of ${nativeCurrency}`}
                enterButton="Add Funds"
                size="large"
                suffix={suffix}
                onSearch={onSearch}
              />
            </Space>

            <Divider orientation="left" orientationMargin="0">
              Your Rewards
            </Divider>

            {isConnected ? (
              <Progress
                type="circle"
                percent={75}
                format={() => `${amountOfRedeemableRewards}`}
                style={{ marginBottom: 10 }}
              />
            ) : (
              <Empty description={'No Rewards - Deposit to earn!'}/>
            )}

            {isConnected? <div style={styles.btn_group}>
              <Dropdown.Button type="primary" size={"large"} style={styles.button} overlay={menu} trigger={"click"}>
                <DownloadOutlined />
                REINVEST
              </Dropdown.Button>
            </div> : () =>{}}
            
          </div>
        </div>
      </Card>
    </div>
  );
}
