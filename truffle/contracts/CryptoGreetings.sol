// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CryptoGreetings {
    struct Greeting {
        address sender;
        string message;
        uint256 timestamp;
    }

    address public owner;
    Greeting[] public greetings;

    event NewGreeting(address indexed sender, string message, uint256 timestamp);
    event MoneyRecived(address indexed sender, uint256 amoun);

    constructor() {
        owner = msg.sender;
    }

    function getGreetings() public view returns (Greeting[] memory) {
        return  greetings;
    }

    function sendGreeting(string memory _message) public payable {
        require(bytes(_message).length > 0, "Message cannot be empty");

        greetings.push(Greeting(msg.sender, _message, block.timestamp));
        emit NewGreeting(msg.sender, _message, block.timestamp);

        if(msg.value > 0) {
            payable(owner).transfer(msg.value);
            emit MoneyRecived(msg.sender, msg.value);
        }
    }
}