import { CONTRACT } from "../../constants";
// imports - abi
import ABI from "../../ABI.json";
// imports - ethers
import { ethers } from "ethers";

// https://stackoverflow.com/questions/24398699/is-it-bad-practice-to-have-a-constructor-function-return-a-promise
export default class WealthGen {
  constructor(signerOrProvider, txPrefs) {
    this._signerOrProvider = signerOrProvider;
    this._txPrefs =
      txPrefs ||
      {
        // TODO: sometimes in Hardhat mode (local dev mode) it crashes if it cannot estimate gas
        // gasPrice: 454545354,
      };
  }

  // WARNING: not thread-safe.
  connect(signerOrProvider) {
    this._signerOrProvider = signerOrProvider;
    return this;
  }

  txPrefs(object = {}) {
    return Object.assign({}, this._txPrefs, object);
  }

  async reinvest(contract, address) {
    // supposed to clear the AVAX and increase the Generators
    // A: it does exactly that, increases the miners
    return contract.harvestRubies(
      address,
      this.txPrefs({
        value: ethers.utils.BigNumber("2458345"),
      }),
    );
  }

  async buy({contract, address, value}) {
    // no response needed
    return contract.buyRubies(
      address,
      this.txPrefs({
        value,
      }),
    );
  }

  async sell(contract) {
    // no response needed
    return contract.sellRubies(/* todo? */);
  }

  // amount of generators available
  async amountOfGenerators(contract, address) {
    return contract.getMyMiners(address);
  }

  // amount Of Redeemables
  async amountOfRedeemables(contract, address) {
    return contract.getMyMiners(address);
  }
}
