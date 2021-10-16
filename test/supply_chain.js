const SupplyChain = artifacts.require("SupplyChain");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SupplyChain", function (accounts) {
  it("should create a Participant", async () => {
    let instance = await SupplyChain.deployed();

    let participantId = await instance.addParticipant("A","passA","0xF094290f1b0D446783b93Eb9FB07eE507D0cd288","Manufacturer");
    let participant = await instance.participants(0);
    assert.equal(participant[0], "A");
    assert.equal(participant[2], "Manufacturer");

    participantId = await instance.addParticipant("B","passB","0x29eA05590225dd62Cd16553814341C5858Fe52f7","Supplier");
    participant = await instance.participants(1);
    assert.equal(participant[0], "B");
    assert.equal(participant[2], "Supplier");

    participantId = await instance.addParticipant("C","passC","0x71D53e3048931Ac596ebbB71e3A8d53D42023dBa","Consumer");
    participant = await instance.participants(2);
    assert.equal(participant[0], "C");
    assert.equal(participant[2], "Consumer");
  });

  it("should return Participant details", async () => {
    let instance = await SupplyChain.deployed();
    let participantDetails = await instance.getParticipant(0);
    assert.equal(participantDetails[0], "A");
    
    instance = await SupplyChain.deployed();
    participantDetails = await instance.getParticipant(1);
    assert.equal(participantDetails[0], "B");
    
    instance = await SupplyChain.deployed();
    participantDetails = await instance.getParticipant(2);
    assert.equal(participantDetails[0], "C");
  });

  it("should transfer products", async () => {
    let instance = await SupplyChain.deployed();

    let manufacturer = await instance.addParticipant("A","passA","0xF094290f1b0D446783b93Eb9FB07eE507D0cd288","Manufacturer");
    let supplier = await instance.addParticipant("B","passB","0x29eA05590225dd62Cd16553814341C5858Fe52f7","Supplier");
    let consumer = await instance.addParticipant("C","passC","0x71D53e3048931Ac596ebbB71e3A8d53D42023dBa","Consumer");
    
    let product = await instance.addProduct(0, "ABC", "100", "123", 11);

    let ft = await instance.newOwner(0, 1, 0, {from: "0xF094290f1b0D446783b93Eb9FB07eE507D0cd288"});
    let st = await instance.newOwner(1, 2, 0, {from: "0x29eA05590225dd62Cd16553814341C5858Fe52f7"});

    let provenance = await instance.getProvenance(0);
    
    assert.equal(provenance.length, 2);
  });
});
