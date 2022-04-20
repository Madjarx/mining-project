// imports - react
import React, { useState, useEffect } from 'react';
// imports - styles js
import styles from "../styles";
import {ethers} from 'ethers';
// const { ethers } = require("ethers");
// imports - antd
import { ThunderboltOutlined, DownloadOutlined, LineChartOutlined, DollarCircleOutlined, AudioOutlined, LoadingOutlined } from "@ant-design/icons";
import { Progress, Input, InputNumber, Divider, Empty, Card, Statistic, Row, Col, Button, Menu, Dropdown, Space, Steps } from "antd";
// imports - components
import Address from "../../components/Address";
import Balance from "../../components/Balance";
import Wallet from "../../components/Wallet";
import Account from "../../components/Account";
// imports - css
import { useThemeSwitcher } from "react-css-theme-switcher";
// imports - custom hooks
import {useBalance } from "eth-hooks";


const { Step } = Steps;

// TODO: Add processing buttons and shit
// TODO: integrate into wallet
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

export default function Stake({
  useBurner,
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  isContract,
  targetNetwork
}) {
  
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  
  const [amountWithinWallet, setAmountWithinWallet] = useState(0);
  const [amountWithinContract, setAmountWithinContract] = useState(0);
  const [amountWithinDeposits, setAmountWithinDeposits] = useState(0);
  const [amountWithinRewards, setAmountWithinRewards] = useState(0);

  const balanceOfRewards = ethers.BigNumber.from('0');
  const balanceOfWallet = useBalance(localProvider, address);
  const balanceOfDeposits = ethers.BigNumber.from('0');


  const nativeCurrency = targetNetwork.nativeCurrency || "ETH";
  const [inputValue, setInpuValue] = useState(null)


  // TODO: put this somewhere global so we have "one definition" for "humanized"
  const humanizedBalance = (balance) => parseFloat(ethers.utils.formatEther(balance)).toFixed(3)

  const stepForward = () => {
      setCurrentStep(currentStep + 1);
  };

  const onClickUrl = () => {
    return window.open(`https://www.sushi.com/`)
  }

  // UseEffect for balance within wallet
  useEffect(() => setAmountWithinWallet(humanizedBalance(balanceOfWallet)), [balanceOfWallet])
  
  // UseEffect for balance of deposits
  useEffect(() => setAmountWithinDeposits(humanizedBalance(balanceOfDeposits)), [balanceOfDeposits])

  // TODO: rewards should always be 2% of generators
  // TODO: when you type a # and click "Hire" it should just add that much to rewards (but not do an actual tx)
  // TODO: prevent the user from entering an invalid # (some sort of error display)
  
  //this useeffect should calculate the rewards by multiplaying with 1.02
  useEffect(() => {
    setAmountWithinRewards(amountWithinDeposits * 1.02);
  }, [amountWithinDeposits])

  //*****/
  // Tell user what the next expected action is.
  //*****/
  useEffect(()=>{
    const ZERO = ethers.BigNumber.from("0");
    
    if(!address){
      // if they don't have an address, they're not logged in
      setCurrentStep(0)
    // } else if (amountWithinWallet) {   // TODO: this is the wrong equivalence (we need *.lte(*) BigNumber)
    } else if (balanceOfWallet && balanceOfWallet.lte(ZERO)) {   // TODO: this is the wrong equivalence (we need *.lte(*) BigNumber)
      // if they don't have funds, then they need some
      setCurrentStep(1)
    } else if (balanceOfDeposits && balanceOfDeposits.lte(ZERO)) {
      // if they don't have deposits, then they need some
      setCurrentStep(2)
    } else {
      // by default, always say invest more
      setCurrentStep(3)
    }
  }, [address, balanceOfWallet, balanceOfDeposits]);


  return (
    <>

    <Space>
      <Steps current={currentStep} style={{marginTop: 50}}>
        <Step title="Connect Wallet" description="Get Started." icon={currentStep === 0 ? <LoadingOutlined /> : ""} style={styles.step}/>
        <Step title="Get Funds" description="Get Loaded" icon={currentStep === 1 ? <LoadingOutlined /> : ""} style={styles.step}/>
        <Step title="Buy Generators" description="Generate Gains." icon={currentStep === 2 ? <LoadingOutlined /> : ""} style={styles.step}/>
        <Step title="Reinvest" description="Amplify Gains." icon={currentStep === 3 ? <LoadingOutlined /> : ""} style={styles.step}/>
        <Step title="Earn" description="Make Bank." style={styles.step}/>
      </Steps>
    </Space>

    <div style={styles.box}>
      <Card title="Fortuna Wealth Generator" bordered={false}>
        <div style={styles.layout}>
          <Row gutter={16} style={{marginTop: -15}}>
            <Col span={12}>
              {/* TODO: make "Contract" a href to the etherscan url  */}
              <Statistic title="Contract Balance" value={amountWithinContract} />
            </Col>
            <Col span={12}>
              {/* TODO: make "Wallet" a href to their etherscan url  */}
              <Statistic title="Wallet Balance" value={`${amountWithinWallet} ${nativeCurrency}`} precision={2} />

              {web3Modal.cachedProvider ? (
                <Button style={{ marginTop: 16 }} type="primary" onClick={onClickUrl}>
                  Recharge
                </Button>
              ) : (
                <Button 
                  style={{ marginTop: 16 }}
                  type="primary"
                  key="loginbutton"
                  onClick={loadWeb3Modal}
                >
                  Connect Wallet
                </Button>              
              )}

            </Col>
          </Row>
          <Divider orientation="left">
            Your Generators
          </Divider>

          <div style={styles.group}>
            <Space direction="vertical">

              <Statistic title="Your Generators" value={amountWithinDeposits} prefix={<ThunderboltOutlined />} style={styles.layout}/>

              {/* status property can show errors and become red if input is invalid */}
              <Search
                placeholder={`amount of ${nativeCurrency}`}
                enterButton="Hire"
                size="large"
                suffix={suffix}
                onSearch={stepForward}
                style={{marginTop: 10 }}
                value={inputValue}
                onClick={()=>{
                  setInpuValue(amountWithinWallet)
                }}
              />
            </Space>

            <Divider orientation="left">
              Your Rewards             
            </Divider>

            {web3Modal.cachedProvider ? (
              <Progress
                type="circle"
                percent={75}
                format={() => `${amountWithinRewards}`} //${nativeCurrency}
                style={{ marginBottom: 10 }}
              />
            ) : (
              <Empty description={'No Rewards - Deposit to earn!'}/>
            )}

            {web3Modal.cachedProvider? <div style={styles.btn_group}>
              <Dropdown.Button type="primary" size={"large"} style={styles.button} overlay={menu} trigger={"click"}>
                <DownloadOutlined />
                REINVEST
              </Dropdown.Button>
            </div> : ""}
            
          </div>
        </div>
      </Card>
    </div>
    </>
  );
}
