const GM = require("godmode-for-test");

const Dai = artifacts.require("Dai");
const GMDai = artifacts.require("GMDai");


// SETUP GMIT
let GODMODE = new GM("development", "ws://localhost:8545");

contract("Dai GodMode Demo", function(accounts) {

  const Alice = accounts[1];
  
  describe("MAINNET FORK ONLY", function(){

    before(async function() {
        await GODMODE.open();      
    });

    after(async function(){
        await GODMODE.close();
    });

    // MAINNET fork only!
    it("GODMODE: mint Dai like FED ", async function(){
        let daiContract = await Dai.at("0x6B175474E89094C44Da98b954EedeAC495271d0F");
        assert.equal(await daiContract.balanceOf(Alice), 0);
        
        await GODMODE.executeAs(daiContract, GMDai, "mint" , Alice, 123456);

        assert.equal(await daiContract.balanceOf(Alice), 123456);
    });    


    // it("GODMODE: set total value", async function(){
    //     let daiContract = await Dai.at("0x6B175474E89094C44Da98b954EedeAC495271d0F");

    //     console.log( (await daiContract.totalSupply()).toString() ) ;        
    //     await GODMODE.executeAs(daiContract, GMDai, "setTotalSupply" , 123456);
    //     console.log( (await daiContract.totalSupply()).toString() ) ;        
    // });

  });
});