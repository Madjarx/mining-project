// imports - React imports
import React from 'react';
// imports - styles
import styles from '../styles';
// imports - antd imports
import { TwitterOutlined } from "@ant-design/icons";

export default function Links () {

    const handleContractClick = () => window.open(`https://www.blockchain.com/eth/address/0x33b651376918f0d341947b36D02472E19b7e3243`);

    return (
        <div style={styles.links}>
            <TwitterOutlined style={styles.link} onClick={handleContractClick()} />
            <TwitterOutlined style={styles.link} onClick={handleContractClick()} />
            <TwitterOutlined style={styles.link} onClick={handleContractClick()} />
        </div>
    )
}