const DappToken = artifacts.require("./DappToken.sol");


contract('DappToken', function(accounts) {
	it('set the totalSupply upon development', function() {
		return DappToken.deployed().then(function(instance) {
			tokenInstance= instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(),1000000,'set the total supply to 1000000');
		});
	});
}) 