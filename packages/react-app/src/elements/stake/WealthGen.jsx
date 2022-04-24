import { CONTRACT } from "../../constants";
// imports - abi
import ABI from "../../ABI.json";
// import ABI from "../contracts/ABI/ROI.json";
// import ABI from "../../../contracts/ABI/ROI.json";
// imports - ethers
import { ethers } from "ethers";

import {shouldBeStringOrThrow} from './Checks'

// https://stackoverflow.com/questions/24398699/is-it-bad-practice-to-have-a-constructor-function-return-a-promise
export default class WealthGen {

  /**
   * @param {ethers.providers.BaseProvider} signerOrProvider
   * @param {ethers.Contract} contract
   * @param {{gasLimit:number, gasPrice:number}} txPrefs
   */
  constructor({ contract, signerOrProvider, txPrefs }) {
    this._contract = contract;
    this._signerOrProvider = signerOrProvider;
    this._txPrefs = txPrefs;
    // this._txPrefs =
    //   txPrefs ||
    //   {
    //     // TODO: sometimes in Hardhat mode (local dev mode) it crashes if it cannot estimate gas
    //     gasLimit: gasLimit,           // TODO: what is the right gas limit? Where does that come from?
    //     gasPrice: gasPrice,
    //   };
  }

  /** @returns {String} */
  get addressOrFail() {
    return shouldBeStringOrThrow(this.address, 'addressOrFail')
  }

  /** @returns {String|undefined} */
  get address() {
    return (this._signerOrProvider) ? (this._signerOrProvider.getAddress()) : (undefined)
    // return this._signerOrProvider.address; // return this._signerOrProvider.getAddress(); // TODO: or was it getWallet()?
  }

  /** @property {ethers.Contract} contract */
  get contract() {
    return this._contract.connect(this._signerOrProvider);
  }

  /**
   * @param {{gasPrice?:number, gasLimit?:number, value?:BigNumber}} object
   * @returns {Object}
   */
  txPrefs(object = {}) {
    return Object.assign({}, this._txPrefs, object);
  }

  /** @returns {Promise<BigNumber} */
  async getBalance() {
    console.trace(`get balance`)
    return this.contract.getBalance();
  }

  /**
   * spend all your gains
   */
  async reinvest(referralAddress) {
    // supposed to clear the AVAX and increase the Generators
    // A: it does exactly that, increases the miners
    return this.contract.harvestRubies(referralAddress || this.addressOrFail, this.txPrefs());
  }

  async buy({ value }) {
    // no response needed
    const stringValue = value.toString();
    // debugger;
    return this.contract.buyRubies(
      this.addressOrFail,
      // {
      //   value: stringValue,
      // },
      // gasPrice,
      this.txPrefs({
        value: stringValue,
      }),
    );
  }

  async sell() {
    // TODO: why DOESN'T it require the address?
    return this.contract.sellRubies(/* todo? */);
  }

  // amount of generators available
  async amountOfGenerators() {
    // TODO: why does it require the address?
    return this.contract.getMyRubies(this.addressOrFail);
  }

  // amount Of Redeemables
  async amountOfRedeemables() {
    // TODO: why does it require the address?
    return this.contract.getMyMiners(this.addressOrFail);
  }
}
