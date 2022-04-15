// imports - react
import React from "react";
// imports - antd
import { Input, Divider, Empty, Card, Statistic, Row, Col, Button } from "antd";
// imports - styles js
import styles from "../styles";

export default function Statistics() {
  return (
    <div style={styles.box}>
      <Card title="Statistics" bordered={false}>
        <div style={styles.layout}>
          <div style={{marginTop: -20}}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="Daily Return" value={`2%`} />
            </Col>
            <Col span={8}>
              <Statistic title="APR" value={`2630%`} precision={2} />
            </Col>
            <Col span={8}>
              <Statistic title="Dev Fee" value={`5%`} />
            </Col>
          </Row>
          </div>         
        </div>
      </Card>
    </div>
  );
}
