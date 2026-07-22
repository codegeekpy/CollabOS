import { useNavigate } from "react-router-dom";
import Statecards from "./Statecards";
import Statecardx from "./Statecardx";
function Header(){
    const navigate = useNavigate();
    return(<div className="Header-container" style={{padding:"100px"}}>
        <div className="capsule">Live & Audited</div>
        <p className="Text-plain">
            Build Projects. <span>Automate Payments.</span> Trust the Blockchain.
        </p>
        <div className="Description-text">
            <p>The decentralized project management platform for the modern workforce. Founders stake milestone budgets, contributors code, smart contract validators verify, and payments release instantly.
</p>
        </div>
        <div className="Buttons-Header">
            <button onClick={()=>navigate("/projects")}>launch APP Console</button>
            <button onClick={()=>navigate("/ProjectList")}>explore Active tasks</button>
        </div>

        <div className="Body-container" style={{paddingTop:"50px"}}>
            <div className="Text-plain"><p>Protocol-level Confidence</p></div>
            
            <div className="Description-text"><p>No manual invoicing. Fully deterministic escrow agreements secured by multi-signature vaults.</p></div>
            
        </div>
        <div className="Cards"><Statecards/></div>
        <div className="second-header">
          <div className="title" style={{fontSize:"2.5rem"}}>How CollabOS Operates</div>
          
          <div style={{padding:"20px"}}><Statecardx /></div>
        </div>
        <div>
        <div className="Header-end" >
           <div  className="title" style={{fontSize:"1.5rem",padding:"20px"}}><h1>Ready to Decentralize Your Workflow?</h1></div> 
           <div className="Description-text"><p>Empower your startup with frictionless payment rails or launch your contributor profile today.</p></div> 
             <div className="Buttons-Header">
            <button onClick={()=>navigate("/projects")}>launch APP Console</button>
            <button onClick={()=>navigate("/ProjectList")}>explore Active tasks</button>
        </div>

        </div>
      </div>
    </div>);

}export default Header;