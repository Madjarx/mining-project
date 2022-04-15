import React from 'react';
import styles from '../styles';
import { Input } from 'antd';

export default function Referral () {


    return (
        <div style={styles.box}>
            <div style={styles.layout}>
                <div style={styles.title}>
                    Referral Link
                </div>
                <Input style={styles.input} placeholder="Refer a miner"/>
                <div style={styles.paragraph}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing el</p>
                </div>
            </div>
        </div>
    )
}