const CryptoGreetings = artifacts.require("CryptoGreetings");
const Election = artifacts.require("Election");
const Lottery = artifacts.require("Lottery");

module.exports = function(deployer) {
  deployer.deploy(CryptoGreetings);
  deployer.deploy(Lottery);

  const candidates = ['Lincoln', 'F. D. Roosevelt', 'Washington', 'T. Roosevelt'];
  deployer.deploy(Election, candidates);
};
