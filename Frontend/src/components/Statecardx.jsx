import lock from "../assets/lock.png"
import security from "../assets/security.png"
import cpu from "../assets/cpu.png"

function Statecardx(){

  return(<div className="State-cards" >
    <div className="card-container" style={{background:"None"}}>
        <div className="circle" style={{background:"rgba(227, 221, 112, 0.08)",border:"1.5px solid rgba(227, 221, 112, 0.4)",boxShadow:"0 0 15px rgba(227, 221, 112, 0.25)"}}>1</div>
        <div className="card-title"><p>Create & Stake</p></div>
        <div ><p>
        Founders upload project parameters, link GitHub repos, and stake stablecoin budgets in secure smart vaults.
        </p></div>
    </div>

     <div className="card-container" style={{background:"None"}}>
        <div className="circle" style={{background:"rgba(101, 237, 96, 0.08)",border:"1.5px solid rgba(101, 237, 96, 0.4)",boxShadow:"0 0 15px rgba(101, 237, 96, 0.25)"}}>2</div>
        <div className="card-title"><p>Contribute Work</p></div>
        <div ><p>
     Contributors browse active lists, claim items, complete code milestones, and link their target pull requests.
        </p></div>
    </div>

     <div className="card-container" style={{background:"None"}}>
        <div className="circle" style={{background:"rgba(139,92,246,0.08)",border:"1.5px solid rgba(139,92,246, 0.4)",boxShadow:"0 0 15px rgba(139,92,246,0.25)"}}>3</div>
        <div className="card-title"><p>Approve & Cash Out</p></div>
        <div ><p>
       DAO validator committees vote on PR submissions. When milestones are approved, cryptocurrency transfers instantly.
        </p></div>
    </div>

    </div>);

}export default Statecardx;