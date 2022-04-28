// imports - react
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
// imports - custom hooks
import {
  useBalance,
  usePoller,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,

} from "eth-hooks";
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
import { Transactor, Web3ModalSetup } from "../../helpers/index";
// our stuff starts here
import { shouldBeStringOrThrow } from "./Checks";
// import - CONTRACT
import WealthGen from "./WealthGen";
// imports - styles js
import styles from "../styles";
//
import { CONTRACT } from "../../constants";
// imports - abi
import ABI from "../../ABI.json";
import UserGuideSteps from "./UserGuideSteps";
const { Step } = Steps;

// TODO: put this somewhere global so we have "one definition" for "humanized"
// const toHumanizedValue = raw => parseFloat(ethers.utils.formatEther(raw)).toFixed(3);
const toHumanizedValue = raw => parseFloat(ethers.utils.formatEther(raw)).toFixed(3);
// const toHumanizedValue = raw => parseFloat(ethers.utils.formatEther(String.valueOf(raw || 0))).toFixed(3);

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
  gasPrice,
}) {
  // TODO: create a useEffect that will automatically change the native currency. Problem?: nativecurrency prolly wont change because its not bound to targetnetwork but rather initialized only once
  const nativeCurrency = shouldBeStringOrThrow(targetNetwork.nativeCurrency); // ------> giving off shit ton of errors

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [signerOrProvider, setSignerOrProvider] = useState(userSigner || localProvider);
  const [wealthgen, setWealthGen] = useState(new WealthGen({
    contract: new ethers.Contract(CONTRACT, ABI, signerOrProvider),
    signerOrProvider,
    txPrefs: {
      gasPrice,
      gasLimit: 10,
    },    
  }));

  useEffect(() => setSignerOrProvider(userSigner || localProvider), [userSigner, localProvider]);

  useEffect(() => {
    setWealthGen(
      new WealthGen({
        contract: new ethers.Contract(CONTRACT, ABI, signerOrProvider),
        signerOrProvider,
        txPrefs: {
          gasPrice,
          gasLimit: 100000,       // <---- TODO: figure out a better way
        },
      }),
    );
  }, [CONTRACT, ABI, signerOrProvider, gasPrice]);

  // Humanized amounts - they are the ones rendered on the screen
  const [amountWithinWallet, setAmountWithinWallet] = useState(0);
  const [amountWithinContract, setAmountWithinContract] = useState(0);
  const [amountWithinGenerators, setAmountWithinGenerators] = useState(0);
  const [amountWithinRewards, setAmountWithinRewards] = useState(0);

  const [amountToDeposit, setAmountToDeposit] = useState(0);

  useOnBlock(localProvider, async () => {
    // If you want to call a function on a new block
    // console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
    // setAmountWithinContract(toHumanizedValue(await contract.getBalance()))
    setAmountWithinContract(await wealthgen.getBalance());
  });

  // useEffect(async () => 
  //   setAmountWithinRewards(await wealthgen.rubyRewards(address)
  // ), [amountWithinRewards]);

  // Rewards
  const [rewardMax, setRewardsMax] = useState(0);
  const [rewardsCurrent, setRewardsCurrent] = useState(0);
  const [rewardsProgress, setRewardsProgress] = useState(0);

  // Raw amounts
  const balanceOfRewards = ethers.BigNumber.from("0");
  const balanceOfDeposits = ethers.BigNumber.from("0");
  const balanceOfWallet = useBalance(localProvider, address);

  const [currentBalance, setCurrentBalance] = useState(0);

  // TODO: when you type a # and click "Hire" it should just add that much to rewards (but not do an actual tx)

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState("");

  // useEffect(async () => {
  //   const __address__ = address
  //   if (!__address__) {
  //     setAmountWithinGenerators(0)
  //   } else {
  //     setAmountWithinGenerators(await wealthgen.amountOfGenerators(contract, address))
  //   }
  // }, [address, amountWithinWallet])

  useEffect(() => setAmountWithinWallet(toHumanizedValue(balanceOfWallet)), [balanceOfWallet]);
  useEffect(() => setAmountWithinGenerators(toHumanizedValue(balanceOfDeposits)), [balanceOfDeposits]);
  // useEffect(() => setAmountToDeposit(amountToDeposit), [amountToDeposit]);

  useEffect(() => setAmountWithinRewards(amountWithinGenerators * 1.02), [amountWithinGenerators]);
  useEffect(() => setRewardsProgress(amountWithinRewards / rewardMax), [amountWithinRewards]); //---> its not amountWithinRewards its contract.getRewards or something


  // useEffect(() => {
  //     const id = setInterval(() => {
  //       let balance = await contract.getBalance()
  //       setAmountWithinContract(balance.toString())
  // }, 10000)}, [])

  // export default function useGasPrice(targetNetwork, speed) {
  //   const [gasPrice, setGasPrice] = useState();
  //   const loadGasPrice = async () => {
  //     if (targetNetwork.hasOwnProperty("gasPrice")) {
  //       setGasPrice(targetNetwork.gasPrice);
  //     } else {
  //         axios
  //           .get("https://ethgasstation.info/json/ethgasAPI.json")
  //           .then(response => {
  //             const newGasPrice = response.data[speed || "fast"] * 100000000;
  //             if (newGasPrice !== gasPrice) {
  //               setGasPrice(newGasPrice);
  //             }
  //           })
  //           .catch(error => console.log(error));
  //     }
  //   };

  //   usePoller(loadGasPrice, 39999);
  //   return gasPrice;
  // }

  // usePoller(async () => {
  //   if (props.provider && typeof props.provider.getNetwork === "function") {
  //     try {
  //       const newNetwork = await props.provider.getNetwork();
  //       setNetwork(newNetwork);
  //       if (newNetwork.chainId > 0) {
  //         setStatus("success");
  //       } else {
  //         setStatus("warning");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       setStatus("processing");
  //     }
  //     try {
  //       const newSigner = await props.provider.getSigner();
  //       setSigner(newSigner);
  //       const newAddress = await newSigner.getAddress();
  //       setAddress(newAddress);
  //       // eslint-disable-next-line no-empty
  //     } catch (e) {}
  //   }
  // }, 1377);

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

  // maxRewards = amountWithinGenerators * 0.02;
  // progress = amountWithinGenerators / maxRewards;
  //-> but i guess this should be contract.getMyMiners or .getRubiesSinceLastHarvest

  function handleMenuClick(e) {
    console.log("click", e);
  }

  async function handleReinvestClicked(address) {
    // TODO: show a progress bar
    
    // The transactor wraps transactions and provides notificiations
    // const tx = Transactor(userSigner, gasPrice);

    wealthgen.reinvest();
    // setAmountWithinDeposits
    // setAmountWithinWallet --> or this is handled by useEffect I think
  }

  // prevent invalid input

  async function handleHireClick() {
    if (amountToDeposit > amountWithinWallet || amountToDeposit === 0) {
      console.log("You have insufficient Funds")
      setStatus("error")
    } else {
      console.log("Sure, buy, do with your money whatever you want")
      setStatus("")
      // wealthgen.buy({
      //   value: ethers.utils.parseEther(amountToDeposit),
      // });
    }
    
    // setAmountWithinDeposits
    // setAmountWithinWallet --> or this is handled by useEffect I think
  }

  // contract stuff

  // const contractConfig = useContractConfig();
  // const readContracts = useContractLoader(localProvider, contractConfig);
  // const purpose = useContractReader(readContracts, "YourContract", "purpose");

  const showModal = () => setIsModalVisible(true);
  const handleModalAccept = () => setIsModalVisible(false);
  const handleModalCancel = () => setIsModalVisible(false);
  const handleRechargeClick = () => window.open(`https://www.sushi.com/`);
  // const handleContractClick = () => window.open(`${blockExplorer}/address/${CONTRACT}`);


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

  // const balanceOfContract = async () => {
  //   await localProvider.getBalance('0x31A226acD218fe1FD2E6b26767E670e868b6E65f');
  // }
  const balanceOfContract = useBalance(localProvider, '0x31A226acD218fe1FD2E6b26767E670e868b6E65f'); // -> ruby
  // const balanceOfContract = useBalance(localProvider, '0x33b651376918f0d341947b36D02472E19b7e3243'); // -> ours

  // TODO create minimum ammount for deposit and check if user is trying to deposit more than he has in the wallet

  return (
    <>
      {/* <UserGuideSteps address={address} balanceOfWallet={balanceOfWallet} balanceOfDeposits={balanceOfDeposits} /> */}

      <Space>
        {/* size="small" */}
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

      <div style={styles.box}>
        <Card title="Fortuna Wealth Generator" bordered={false}>
          <div style={styles.layout}>
            <Row gutter={16} style={{ marginTop: -15 }}>
              <Col span={12}>
                {/* TODO: make "Contract" a href to the etherscan url  */}
                <Statistic
                  title="Contract Balance"
                  // value={`${toHumanizedValue(amountWithinContract)} ${nativeCurrency}`}
                  value={`${toHumanizedValue(balanceOfContract)} ${nativeCurrency}`}
                  precision={2}
                  style={{ cursor: "pointer" }}
                />
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
                  value={amountWithinGenerators}
                  prefix={<ThunderboltOutlined />}
                  style={styles.layout}
                />
                <Space direction="horizontal" style={{ marginTop: 10 }}>
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                    step="0.0001"
                    placeholder={`amount of ${nativeCurrency}`}
                    size="large"
                    precision="4"
                    stringMode
                    value={amountToDeposit}
                    onChange={setAmountToDeposit}
                    status={status}
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
                    disabled={amountWithinRewards === 0? (true) : (false)}
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
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleModalAccept}
        onCancel={handleModalCancel}
        size="small"
      >
        <p>Are you sure you want to withdraw?</p>
      </Modal>
    </>
  );
}
