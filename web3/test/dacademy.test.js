const Dacademy = artifacts.require('Dacademy');

// Mocha - testing framework
// Chai - assertion JS library

contract('Dacademy', (accounts) => {
  const courseId = '0x00000000000000000000000000003130';
  const proof =
    '0x0000000000000000000000000000313000000000000000000000000000003130';
  const value = '900000000';
  let _contract = null;
  let contractOwner = null;
  let buyer = null;
  let courseHash = null;

  before(async () => {
    _contract = await Dacademy.deployed();
    contractOwner = accounts[0];
    buyer = accounts[1];
  });

  describe('Purchase Course', () => {
    before(async () => {
      await _contract.purchaseCourse(courseId, proof, {
        from: buyer,
        value,
      });
    });

    it('should not allow repurchasing already owned course', async () => {
      try {
        _contract.purchaseCourse(courseId, proof, {
          from: buyer,
          value,
        });
        assert(false)
      } catch (error) {
        assert(error)
      }
    });
  });
});
