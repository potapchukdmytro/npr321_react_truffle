// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Election {
    struct Candidate {
        string name;
        uint votes;
    }

    address public manager;
    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    bool public electionEnded;

    constructor(string[] memory candidatesNames) {
        manager = msg.sender;
        for(uint i = 0; i < candidatesNames.length; i++) {
            candidates.push(Candidate({ name: candidatesNames[i], votes: 0 }));
        }
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function vote(uint candidateIndex) public {
        require(!electionEnded, "Election completed!");
        require(!hasVoted[msg.sender], "You you already voted!");
        require(candidateIndex < candidates.length, "Invalid index");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].votes++;
    }

    function endElection() public {
        require(msg.sender == manager, "You are not manager!");
        electionEnded = true;
    }

    function getWinner() public view returns(string memory winnerName, uint votes) {
        require(electionEnded, "The elections are still ongoing");
        uint maxVotes = 0;
        uint winnerIndex = 0;

        for(uint i = 0; i < candidates.length; i++) {
            if(candidates[i].votes > maxVotes) {
                maxVotes = candidates[i].votes;
                winnerIndex = i;
            }
        }

        return (candidates[winnerIndex].name, maxVotes);
    }
}