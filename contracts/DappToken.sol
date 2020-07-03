pragma solidity >=0.4.21 <0.7.0;



contract DappToken {

	// constructor 
	// set the token number of token
	// read the total number of token
	uint256 public totalSupply;

  constructor() public {
  	totalSupply = 1000000;
    
  }
}
