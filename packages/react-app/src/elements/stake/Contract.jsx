
  // https://stackoverflow.com/questions/24398699/is-it-bad-practice-to-have-a-constructor-function-return-a-promise
  export default class Contractinator {
    constructor({ contract }) {
      this.contract = contract;
    } 
    async harvestRubies(address) {
      // supposed to clear the AVAX and increase the Generators
      // A: it does exactly that, increases the miners
    } 
    async buyRubies(value, address) {
      // no response needed
    }
    async sellRubies() {
      // no response needed
    }
    // amount of generators available
    async amountOfGenerators(address) {
      return this.contract.getMyMiners(address)
    } 
    // amount Of Redeemables
    async amountOfRedeemables(address) {
      return this.contract.getMyMiners(address)
    }
  }
