import logo from "../assets/blockchain.png";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="Navbar-container">
      <div className="logo">
        <img src={logo} alt="CollabOS Logo" className="logo-img" />
        <span className="title">CollabOS</span>
      </div>

      <div className="Nav-elements">
        <ul>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/Dashboard">Dashboard</Link></li>
          <li><Link to ="/VerifyWork">Verify Work</Link></li>
          <li><Link to="/Escrows">Escrows</Link></li>
        </ul>
      </div>

      <div className="nav-right">
        <button className="sync-btn">On-Chain Sync</button>
        <button className="wallet-btn">0x7a2d...73ef</button>
      </div>
    </nav>
  );
}

export default Navbar;