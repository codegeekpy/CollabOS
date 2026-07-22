import lock from "../assets/lock.png"
import security from "../assets/security.png"
import cpu from "../assets/cpu.png"
function Statecards(){

    return(<div className="State-cards">
    <div className="card-container">
        <div className="logo"><img className="logo-img" src={lock}></img></div>
        <div className="card-title"><p>Milestone Escrow Vaults</p></div>
        <div ><p>
        Budgets are staked directly inside custom 
        EVM Smart Contracts. 
        Contributors can visually verify lockups 
        before typing a line of code.
        </p></div>
    </div>

     <div className="card-container">
        <div className="logo"><img className="logo-img" src={security}></img></div>
        <div className="card-title"><p>Reputation Identity (SBT)</p></div>
        <div ><p>
      Verification consensus builds portable, 
      soulbound contributor profiles representing accurate algorithmic ranks.
        </p></div>
    </div>

     <div className="card-container">
        <div className="logo"><img className="logo-img" src={cpu}></img></div>
        <div className="card-title"><p>Automated Settlements</p></div>
        <div ><p>
        When peer validators vote to approve a submission, 
        our smart vaults automatically release escrowed USDC directly to the wallet on file.
        </p></div>
    </div>

    </div>);

}export default Statecards;