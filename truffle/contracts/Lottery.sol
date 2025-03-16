// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Lottery {

address payable[] public members;
address payable public winner;
address public manager;
address public lastWinner;

    constructor() {
        manager=msg.sender;
    }

    function join() payable public returns(bool) {
        require(msg.value==1 ether, "Please pay 1 ETH for join!");
        members.push(payable(msg.sender));
        return true;
    }

    function getBalance() public view returns (uint) {
        // require(manager==msg.sender, "You cannot show balance!");
        return address(this).balance;
    }

    function random() public view returns(uint) {
        return uint(keccak256(
            abi.encodePacked(
                block.timestamp,
                block.number,
                msg.sender
            )
        )) % members.length;
    }

    function roll() public {
        require(manager==msg.sender, "You cannot roll the drum! You are not manager!");
        uint index = random();
        winner = members[index];
        lastWinner = winner;
        payable(manager).transfer(getBalance() * 1 / 100);
        winner.transfer(getBalance());
        members = new address payable[](0);
    }

    function getWinner() public view returns (address) {
        return  lastWinner;
    }
}