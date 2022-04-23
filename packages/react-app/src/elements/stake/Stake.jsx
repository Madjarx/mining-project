
// imports - react
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
// imports - custom hooks
import { useBalance } from "eth-hooks";
// imports - antd
import {
  ThunderboltOutlined,
  DownloadOutlined,
  LineChartOutlined,
  DollarCircleOutlined,
  AudioOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Progress,
  Input,
  InputNumber,
  Divider,
  Empty,
  Card,
  Statistic,
  Row,
  Col,
  Button,
  Menu,
  Dropdown,
  Space,
  Steps,
  Modal,
} from "antd";
// our stuff starts here
import { shouldBeStringOrThrow } from "./Checks";
// import - CONTRACT
import WealthGen from "./WealthGen";
// imports - styles js
import styles from "../styles";

import { CONTRACT } from "../../constants";
// imports - abi
import ABI from "../../ABI.json";

const { Step } = Steps;
// const { ethers } = require("ethers");

function UserGuideSteps(currentStep) {
  return (
    <div>
      <Space>
        <Steps current={currentStep} style={styles.steps} responsive="true">
          <Step
            title="Connect Wallet"
            description="Get Started."
            icon={currentStep === 0 ? <LoadingOutlined /> : ""}
            style={styles.step}
          />
          <Step
            title="Get Funds"
            description="Get Loaded"
            icon={currentStep === 1 ? <LoadingOutlined /> : ""}
            style={styles.step}
          />
          <Step
            title="Buy Generators"
            description="Generate Gains."
            icon={currentStep === 2 ? <LoadingOutlined /> : ""}
            style={styles.step}
          />
          <Step
            title="Reinvest"
            description="Amplify Gains."
            icon={currentStep === 3 ? <LoadingOutlined /> : ""}
            style={styles.step}
          />
          <Step title="Earn" description="Make Bank." style={styles.step} />
        </Steps>
      </Space>
    </div>
  );
}


// TODO: put this somewhere global so we have "one definition" for "humanized"
const toHumanizedValue = raw => parseFloat(ethers.utils.formatEther(raw)).toFixed(3);

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
  targetNetwork,
}) {
  // TODO: create a useEffect that will automatically change the native currency. Problem?: nativecurrency prolly wont change because its not bound to targetnetwork but rather initialized only once
  const nativeCurrency = shouldBeStringOrThrow(targetNetwork.nativeCurrency);   // ------> giving off shit ton of errors

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [signerOrProvider, setSignerOrProvider] = useState(userSigner || localProvider)
  const [wealthgen, setWealthGen] = useState(new WealthGen());

  useEffect(() => setSignerOrProvider(userSigner || localProvider), [userSigner, localProvider]);

  const [contract, setContract] = useState(new ethers.Contract(CONTRACT, ABI, userSigner));
  useEffect(() => setContract(contract.connect(signerOrProvider)), [signerOrProvider])

  // Humanized amounts - they are the ones rendered on the screen
  const [amountWithinWallet, setAmountWithinWallet] = useState(0);
  const [amountWithinContract, setAmountWithinContract] = useState(0);
  const [amountWithinDeposits, setAmountWithinDeposits] = useState(0);
  const [amountWithinRewards, setAmountWithinRewards] = useState(0);

  const [amountToDeposit, setAmountToDeposit] = useState(0);

  // Rewards
  const [rewardMax, setRewardsMax] = useState(0);
  const [rewardsCurrent, setRewardsCurrent] = useState(0);
  const [rewardsProgress, setRewardsProgress] = useState(0);
  
  // Raw amounts
  const balanceOfRewards = ethers.BigNumber.from("0");
  const balanceOfDeposits = ethers.BigNumber.from("0");
  const balanceOfWallet = useBalance(localProvider, address);

  ///TODODODODODO - TODO: LUKA - Where does go? Is there a better name?
  const [currentBalance, setCurrentBalance] = useState(0);

  // const [prefill, setPrefill] = useState(0);
  // const [inputValue, setInpuValue] = useState(0);
  // const [focus, setFocus] = useState(false);
  // TODO: when you type a # and click "Hire" it should just add that much to rewards (but not do an actual tx)

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState("");


  useEffect(() => setAmountWithinWallet(toHumanizedValue(balanceOfWallet)), [balanceOfWallet]);
  useEffect(() => setAmountWithinDeposits(toHumanizedValue(balanceOfDeposits)), [balanceOfDeposits]);
  // useEffect(() => setAmountToDeposit(amountToDeposit), [amountToDeposit]);

  //this useEffect should calculate the rewards by multiplaying with 1.02
  useEffect(() => setAmountWithinRewards(amountWithinDeposits * 1.02), [amountWithinDeposits]);
  useEffect(() => setRewardsProgress(amountWithinRewards / rewardMax), [amountWithinRewards]);  //---> its not amountWithinRewards its contract.getRewards or something

  // useEffect(()=>{
  //   setAmountWithinContract(contract.getBalance());                //----------> some errors something idk ask michael about this web3 bullshit
  // }, [contract.getBalance()])

  // useEffect(() => {
  //   // WARNING: how does this interact with the idea of "Contractinator"
  //   setContract(contract.connect(userSigner));
  // }, [userSigner]);



  // Tell user what the next expected action is.
  useEffect(() => {
    const ZERO = ethers.BigNumber.from("0");

    if (!address) {
      // if they don't have an address, they're not logged in
      setCurrentStep(0);
    } else if (balanceOfWallet && balanceOfWallet.lte(ZERO)) {
      // if they don't have funds, then they need some
      setCurrentStep(1);
    } else if (balanceOfDeposits && balanceOfDeposits.lte(ZERO)) {
      // if they don't have deposits, then they need some
      setCurrentStep(2);
    } else {
      // by default, always say invest more
      setCurrentStep(3);
    }
  }, [address, balanceOfWallet, balanceOfDeposits]);

  // maxRewards = amountWithinDeposits * 0.02;
  // progress = amountWithinDeposits / maxRewards;
  //-> but i guess this should be contract.getMyMiners or .getRubiesSinceLastHarvest

  function handleMenuClick(e) {
    console.log("click", e);
  }

  function handleReinvestClicked(address) {
    wealthgen.reinvest(wealthgen, address);
    // setAmountWithinDeposits
    // setAmountWithinWallet --> or this is handled by useEffect I think
  }

  // prevent invalid input
  
  function handleHireClick() {
    debugger
    wealthgen.buy({
      contract,
      address,
      // gasPrice: 0,   ----------------> Do we need gas price?
      value: ethers.utils.parseEther(amountToDeposit),
    });
    // setAmountWithinDeposits
    // setAmountWithinWallet --> or this is handled by useEffect I think
  }

  const showModal = () => setIsModalVisible(true);
  const handleModalAccept = () => setIsModalVisible(false);
  const handleModalCancel = () => setIsModalVisible(false);
  const handleRechargeClick = () => window.open(`https://www.sushi.com/`);

  const reharvestDropdownMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="2" onClick={showModal}>
        Share
      </Menu.Item>
      <Divider style={styles.divider} />
      <Menu.Item key="1" onClick={showModal}>
        Learn Optimizations
      </Menu.Item>
      <Divider style={styles.divider} />
      <Menu.Item key="3" onClick={showModal}>
        Withdraw
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <UserGuideSteps currentStep={currentStep} />

      <div style={styles.box}>
        <Card title="Fortuna Wealth Generator" bordered={false}>
          <div style={styles.layout}>
            <Row gutter={16} style={{ marginTop: -15 }}>
              <Col span={12}>
                {/* TODO: make "Contract" a href to the etherscan url  */}
                <Statistic title="Contract Balance" value={amountWithinContract} />
              </Col>
              <Col span={12}>
                {/* TODO: make "Wallet" a href to their etherscan url  */}
                <Statistic title="Wallet Balance" value={`${amountWithinWallet} ${nativeCurrency}`} precision={2} />

                {web3Modal.cachedProvider ? (
                  <Button style={{ marginTop: 16 }} type="primary" onClick={handleRechargeClick}>
                    Recharge
                  </Button>
                ) : (
                  <Button style={{ marginTop: 16 }} type="primary" key="loginbutton" onClick={loadWeb3Modal}>
                    Connect Wallet
                  </Button>
                )}
              </Col>
            </Row>
            <Divider orientation="left">Your Generators</Divider>

            <div style={styles.group}>
              <Space direction="vertical">
                <Statistic
                  title="Your Generators"
                  value={amountWithinDeposits}
                  prefix={<ThunderboltOutlined />}
                  style={styles.layout}
                />
                <Space direction="horizontal" style={{ marginTop: 10 }}>
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                    step="0.000001"
                    placeholder={`amount of ${nativeCurrency}`}
                    size="large"
                    precision="4"
                    stringMode           
                    value={amountToDeposit}
                    onChange={setAmountToDeposit}
                  />
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => handleHireClick()} //----------------------------------------> ADD TRY CATCH BLOCK this should be working correctly if the prefill gets fixed, prevent invalid input
                  >
                    Hire
                  </Button>
                </Space>
              </Space>

              <Divider orientation="left">Your Rewards</Divider>

              {web3Modal.cachedProvider ? (
                <Progress
                  type="circle"
                  percent={rewardsProgress}
                  format={() => `${amountWithinRewards}`} //${nativeCurrency} // theres a function called openMines
                  style={{ marginBottom: 10 }}
                />
              ) : (
                <Empty description={"No Rewards - Deposit to earn!"} />
              )}

              {web3Modal.cachedProvider ? (
                <div style={styles.btn_group}>
                  <Dropdown.Button
                    type="primary"
                    size={"large"}
                    style={styles.button}
                    trigger={"click"}
                    overlay={reharvestDropdownMenu}
                    onClick={() => handleReinvestClicked()}
                  >
                    {/* contract.harvestRubies(address)   */}
                    <DownloadOutlined />
                    REINVEST
                  </Dropdown.Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Withdraw Modal */}
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleModalAccept} onCancel={handleModalCancel} size="small">
        <p>Are you sure you want to withdraw?</p>
      </Modal>
    </>
  );
}
