// imports - react
import React from "react";
// imports - antd
import { Progress, Input, Divider, Empty, Card, Statistic, Row, Col, Button } from "antd";
// imports - styles js
import styles from "../styles";

export default function Stake() {
  return (
    <div style={styles.box}>
      <Card title="Fortuna Wealth Generator" bordered={false}>
        <div style={styles.layout}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Contract Balance" value={112893} />
            </Col>
            <Col span={12}>
              <Statistic title="Your Investment" value={`0.7 AVAX`} precision={2} />
              <Button style={{ marginTop: 16 }} type="primary">
                Recharge
              </Button>
            </Col>
            {/* <Col span={16}>
              <Statistic title="Active Users" value={112893} loading />
            </Col> */}
          </Row>
          <Divider orientation="left" orientationMargin="0">
            Add Funds
          </Divider>

          <div style={styles.info}>
            <p>Wallet</p>
            <h1>0</h1>
          </div>
          <div style={styles.group}>
            <div style={styles.funds}>
              <Input placeholder="0 AVAX" size="large" style={styles.input} />
              <Button type="primary" size="large" style={styles.button}>
                Add Funds
              </Button>
            </div>

            <Divider orientation="left" orientationMargin="0">
              Your Rewards
            </Divider>

            <Progress type="circle" percent={75} format={() => '0.3 AVAX'} style={{marginBottom: 10}}/>
            
            

            <div style={styles.btn_group}>
              <Button type="primary" size="large" style={styles.button}>
                Recharge
              </Button>
              <Button type="primary" size="large" style={styles.button}>
                PULL OUT
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
