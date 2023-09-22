// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

contract Dacademy {
	struct Course {
		uint id;
		uint price;  
		bytes32 proof; 
		address owner;
	} 

	address payable private owner;
	bool public isStopped = false;
	uint private totalOwnedCourses;
	mapping(bytes32 => Course) private ownedCourses;
	mapping(uint => bytes32) private ownedCourseHash;
	

	constructor() {
		setContractOwner(msg.sender);
	}

	/// Course is not created!
  	error CourseIsNotCreated();

	/// Course already has an Owner!
  	error CourseHasOwner();

	modifier onlyOwner () {
		require(owner == msg.sender);
		_;
	}

	modifier onlyWhenNotStopped () {
		require(!isStopped);
		_;
	}

	modifier onlyWhenStopped () {
		require(isStopped);
		_;
	}

	function setContractOwner(address newOwner) private {
		owner = payable(newOwner);
	}

	function stopContract()
    	external
    	onlyOwner()
  	{
    	isStopped = true;
  	}

  	function resumeContract()
    	external
   	 	onlyOwner()
  	{
    	isStopped = false;
  	}

	function purchaseCourse(
		bytes16 courseId,
    	bytes32 proof
	) 
		external 
		payable 
		onlyWhenNotStopped 
	{
		bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
		if(hasCourseOwnership(courseHash)) {
			revert CourseHasOwner();
		}

		uint id = totalOwnedCourses++;
		ownedCourseHash[id] = courseHash;
		ownedCourses[courseHash] =  Course({
			id: id,
			price: msg.value,
			proof: proof,
			owner: msg.sender
			// state: State.Purchased
		});

	}

	function transferCourseOwnership() 
		external 
		payable 
	{
	}

	function hasCourseOwnership(bytes32 courseHash)
		private
		view
		returns(bool)
	{
		return ownedCourses[courseHash].owner == msg.sender;
	}
}
