pragma solidity >=0.4.21 <0.7.0;



contract DappToken {

	// constructor 
	// set the token number of token
	// read the total number of token
	uint256 public totalSupply;
	string public name = 'DApp Token';
	string public symbol = 'DAPP';
	string public standard = 'DApp token v1.0';

	mapping (address => uint256) public balanceOf;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
		); 
	

  constructor(uint256 _initialSupply) public {
  	balanceOf[msg.sender] = _initialSupply;
  	totalSupply = _initialSupply;
  }

 //transfer function   

function transfer (address _to, uint256 _value) public returns(bool success) {
	//eception if amount is not enough
	require(balanceOf[msg.sender] >= _value);
	balanceOf[msg.sender] -= _value;
	balanceOf[_to] += _value;
	//transfer event
	Transfer(msg.sender , _to , _value);
	//retrun a boolean
}



}
