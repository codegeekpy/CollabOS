import logo from "../assets/blockchain.png"

function Footer(){

return (
    <div className="Footer-body" style={{padding:"40px"}}>
       <div className="logo">
               <img src={logo} alt="CollabOS Logo" className="logo-img" />
               <span className="title">CollabOS</span>
             </div>
        <div className="text">© 2266 ChainWork Protocols Team. Standardized smart contract parameters.</div>
       <div className="footer-button"><button >Privacy policy</button>
        <button>Explorer Contracts</button></div> 
    </div>
);

}export default Footer;