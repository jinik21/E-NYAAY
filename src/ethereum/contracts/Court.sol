pragma solidity ^0.4.17;

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
        mapping(uint => string) encryptedkeys;
    }

    struct Judge{
        address addr;
        string name;
        string phoneNo;
        string email;
        string regno;
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
    }

    Lawyer[] lawyers;
    Judge[] judges;
    Case[] cases;

    event lawyerRegistered(uint _lawyerId);
    event caseRegistered(uint _caseId);
    event judgeRegistered(uint _judgeId);

    function registerLawyer(string memory _name, string memory _phone, string memory _email, address _addr, string memory _regno) public {
        Lawyer memory l = Lawyer(_addr,_name,_phone,_email,_regno);
        lawyers.push(l);
        emit lawyerRegistered(lawyers.length-1);
    }

    function registerJudge(string memory _name, string memory _phone, string memory _email, address _addr, string memory _regno) public {
        Judge memory j = Judge(_addr,_name,_phone,_email,_regno);
        judges.push(j);
        emit judgeRegistered(judges.length-1);
    }

    function registerCase(uint _lawyer1,uint _lawyer2,uint _judgeId,string memory _party1,string memory _party2,string memory _description) public onlyOwner {
        string[] memory fileHash;
        Case memory c = Case(lawyers[_lawyer1].addr,lawyers[_lawyer2].addr,judges[_judgeId].addr,_party1,_party2,_description,fileHash);
        cases.push(c);
        emit caseRegistered(cases.length-1);
    }

    function uploadEvidence(uint _caseId,string memory fileHash) onlyOwner public {
        require(keccak256(bytes(fileHash)) != "");
        cases[_caseId].filesHashes.push(fileHash);
    }

    function addEncryptedKey(bool _isLawyer,uint _ljId,uint _caseId,string memory _key) onlyOwner public {
        if(_isLawyer){
            lawyers[_ljId].encryptedkeys[_caseId] = _key;
        }else{
            judges[_ljId].encryptedkeys[_caseId] = _key;
        }
    }

    function getEncryptedKey(bool _isLawyer,uint _ljId,uint _caseId) onlyOwner public view returns(string memory) {
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

    // utility functions
    function getEvidenceCount(uint _caseId) public view returns(uint) {
        return cases[_caseId].filesHashes.length;
    }
    function getEvidence(uint _caseId, uint _evidenceNo) public view returns(string memory FileHash) {
        return cases[_caseId].filesHashes[_evidenceNo];
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