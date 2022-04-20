// imports - React imports
import React from 'react';
// imports - styles
import styles from '../styles';
// imports - antd imports
import { TwitterOutlined } from "@ant-design/icons";

export default function Links () {

    return (
        <div style={styles.links}>
            <TwitterOutlined style={styles.link} />
            <TwitterOutlined style={styles.link} />
            <TwitterOutlined style={styles.link} />
        </div>
    )
}