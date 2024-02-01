// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
// pragma solidity ^0.8.13;
pragma solidity >=0.4.22 <0.9.0;

contract Dacademy {
	enum State {
		Purchased,
		Activated,
		Deactivated
	}

	struct Course {
		// storage values
		uint id; // 32 // uint comprises postive(+) values only  
		uint price; // 32
		bytes32 proof; // 32
		address owner; // 20
		State state; // 1
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

	/// Sender is not Course Owner!
	error SenderIsNotCourseOwner();

	/// Only the owner of this Course can transfer ownership!
	error OnlyOwner();

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
		bytes32 courseId,
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
			owner: msg.sender,
			state: State.Purchased
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

	function getCourseCount()
		external
		view
    	returns (uint)
	{
		return totalOwnedCourses;
	}

  function getCourseHashAtIndex(uint index)
    external
    view
    returns (bytes32)
  {
    return ownedCourseHash[index];
  }

  function getCourseByHash(bytes32 courseHash)
    external
    view
    returns (Course memory)
  {
    return ownedCourses[courseHash];
  }
}
