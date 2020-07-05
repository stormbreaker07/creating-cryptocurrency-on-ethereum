const DappToken = artifacts.require("./DappToken.sol");


contract('DappToken', function(accounts) {
	
	var tokenInstance;

	it('initialize the contract with correct values' , function() {
		return DappToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name) {
			assert.equal(name , 'DApp Token' , 'correct name')
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'DAPP' ,'correct symbol')
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard , 'DApp token v1.0' , 'correct standard')
		})
	})

	it('set the totalSupply upon development', function() {
		return DappToken.deployed().then(function(instance) {
			tokenInstance= instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(),1000000,'set the total supply to 1000000');
			return tokenInstance.balanceOf(accounts[0]);	
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber() , 1000000 , 'it allocates inital supply to admin account')
		});
	});


	it('transfer token ownership', function() {
		return DappToken.deployed().then(function(instance) {
			tokenInstance = instance;
		return tokenInstance.transfer.call(accounts[1], 99999999999999999999999);
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0 , 'error message must contain revert');
			return tokenInstance.transfer(accounts[1],250000 , {from: accounts[0] });
		}).then(function(receipt) {
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(),250000 , 'add amount to recieving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance) {
			assert.equal(balance.toNumber() , 750000 , 'deduct the amount from sending account');
		})
	});

}) 