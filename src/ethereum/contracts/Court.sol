// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Court{
    address public owner;
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    struct Lawyer{
        address addr;
        string name;
        string phoneNo;
        string email;
        string regno;
        string pubkey;
        mapping(uint => string) encryptedkeys;
    }

    struct Judge{
        address addr;
        string name;
        string phoneNo;
        string email;
        string regno;
        string pubkey;
        mapping(uint => string) encryptedkeys;
    }

    struct Case{
        address lawyer1;
        address lawyer2;
        address judge;
        string party1;
        string party2;
        string description;
        string[] filesHashes;
        string[] fileTypes;
    }

    Lawyer[] public lawyers;
    Judge[] public judges;
    Case[] public cases;

    event lawyerRegistered(uint _lawyerId);
    event caseRegistered(uint _caseId);
    event judgeRegistered(uint _judgeId);

    function registerLawyer(string memory _name, string memory _phone, string memory _email, address _addr, string memory _regno, string memory _pubkey) public {
        Lawyer memory l = Lawyer(_addr,_name,_phone,_email,_regno,_pubkey);
        lawyers.push(l);
        emit lawyerRegistered(lawyers.length-1);
    }

    function registerJudge(string memory _name, string memory _phone, string memory _email, address _addr, string memory _regno, string memory _pubkey) public onlyOwner {
        Judge memory j = Judge(_addr,_name,_phone,_email,_regno,_pubkey);
        judges.push(j);
        emit judgeRegistered(judges.length-1);
    }

    function registerCase(uint _lawyer1,uint _lawyer2,uint _judgeId,string memory _party1,string memory _party2,string memory _description) public onlyOwner {
        string[] memory fileHash;
        string[] memory fileType;
        Case memory c = Case(lawyers[_lawyer1].addr,lawyers[_lawyer2].addr,judges[_judgeId].addr,_party1,_party2,_description,fileHash,fileType);
        cases.push(c);
        emit caseRegistered(cases.length-1);
    }

    // evidence functions
    function uploadEvidence(uint _caseId,string memory _fileHash,string memory _fileType) onlyOwner public {
        require(keccak256(abi.encodePacked(_fileHash)) != keccak256(bytes("")) && keccak256(abi.encodePacked(_fileType)) != keccak256(bytes("")));
        cases[_caseId].filesHashes.push(_fileHash);
        cases[_caseId].fileTypes.push(_fileType);
    }
    function getEvidenceCount(uint _caseId) public view returns(uint) {
        return cases[_caseId].filesHashes.length;
    }
    function getEvidence(uint _caseId, uint _evidenceNo) public view returns(string memory FileHash,string memory FileType) {
        return (cases[_caseId].filesHashes[_evidenceNo],cases[_caseId].fileTypes[_evidenceNo]);
    }

    // keys functions
    function addEncryptedKey(bool _isLawyer,uint _ljId,uint _caseId,string memory _key) onlyOwner public {
        if(_isLawyer){
            lawyers[_ljId].encryptedkeys[_caseId] = _key;
        }else{
            judges[_ljId].encryptedkeys[_caseId] = _key;
        }
    }

    function getEncryptedKey(bool _isLawyer,uint _ljId,uint _caseId) public view returns(string memory) {
        if(_isLawyer){
            return lawyers[_ljId].encryptedkeys[_caseId];
        }else{
            return judges[_ljId].encryptedkeys[_caseId];
        }
    }

    function getLawyerInfo(uint _lawyerId) public view returns (
        address addr, string memory name, string memory phoneNo, string memory email, string memory regno
    ) {
        Lawyer memory l = lawyers[_lawyerId];
        return (
            l.addr,
            l.name,
            l.phoneNo,
            l.email,
            l.regno
        );
    }

    function getJudgeInfo(uint _judgeId) public view returns (
        address addr, string memory name, string memory phoneNo, string memory email, string memory regno
    ) {
        Judge memory j = judges[_judgeId];
        return (
            j.addr,
            j.name,
            j.phoneNo,
            j.email,
            j.regno
        );
    }

    function getCaseAddresses(uint _caseId) public view returns(address judge, address lawyer1, address lawyer2) {
        return(cases[_caseId].judge, cases[_caseId].lawyer1, cases[_caseId].lawyer2);
    }

    
    function getLawyersCount() public view returns (uint) {
        return lawyers.length;
    }

    function getJudgesCount() public view returns (uint) {
        return judges.length;
    }

    function getCasesCount() public view returns (uint) {
        return cases.length;
    }
}