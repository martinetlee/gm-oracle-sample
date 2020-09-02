const GM = require("godmode-for-test");

const OSM = artifacts.require("OSM");
const GMOSM = artifacts.require("GMOSM");

// SETUP GMIT
let GODMODE = new GM("development", "ws://localhost:8545");

contract("OSM GodMode Demo", function(accounts) {
  const Alice = accounts[1];

  describe("MAINNET FORK ONLY", function() {
    before(async function() {
      await GODMODE.open();
    });

    after(async function() {
      await GODMODE.close();
    });

    // MAINNET fork only!
    it("GODMODE: OSM read and write", async function() {
      // console.log(await osmContract.read({from: Alice})); // this will fail

      // This will succeed, but bytes32 is not very nice to read.
      //await GODMODE.executeAs(osmContract, GMOSM, "kiss", Alice, {from: Alice});
      //console.log(await osmContract.read({from: Alice}));

      let osmContract = await OSM.at(
        "0x81FE72B5A8d1A857d176C3E7d5Bd2679A9B85763"
      );

      var tx = await GODMODE.executeAs(osmContract, GMOSM, "readCurVal", {
        from: Alice,
      });

      //console.log(tx.logs[0].args.ret.toString());

      await GODMODE.executeAs(osmContract, GMOSM, "setCurVal", 50000000, {
        from: Alice,
      });

      var tx = await GODMODE.executeAs(osmContract, GMOSM, "readCurVal", {
        from: Alice,
      });
      console.log(tx.logs[0].args.ret.toString());
    });
  });
});
