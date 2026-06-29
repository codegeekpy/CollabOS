import React,{useState} from "react";
import { useNavigate } from "react-router-dom";



function Projects({projects,setProjects}) {
  const navigate = useNavigate();
  function projectCard(){
      let Project_name = document.querySelector(".Project-name").value;
      let Contract_category = document.querySelector(".Contract").value;
      let budget_cal = document.querySelector(".budget").value;
      let currency_selected = document.querySelector(".currency").value;
      let pDescription = document.querySelector(".Project-description").value;
      let gitUrl = document.querySelector(".git-url").value;
      console.log(String(Project_name));
      console.log(String(Contract_category));
      console.log(String(budget_cal));
      console.log(String(currency_selected));
      console.log(String(pDescription));
      console.log(String(gitUrl));

      const project={name:Project_name,
        contract:Contract_category,
        budget:budget_cal,
        currency:currency_selected,
        description :pDescription,
        url:gitUrl
      };
      setProjects(p=>([...p,project]));
      navigate("/ProjectList");
  }
  return (
    <div className="project-page">

      <div className="project-header">
        <h1>Launch Project Smart Escrow</h1>
        <p>
          Deploy a custom milestone agreement. Fund escrow budget directly into
          locked vaults.
        </p>
      </div>

      <div className="project-card">

        {/* Startup Name */}

        <div className="form-group">
          <label>
            STARTUP PROTOCOL NAME <span>*</span>
          </label>

          <input
            type="text"
      
            placeholder="e.g., Solis Carbon Protocol"
            className="Project-name"
          />
        </div>

        {/* Category + Budget */}

        <div className="row">

          <div className="form-group flex-1">
            <label>CONTRACT CATEGORY</label>

            <select className="Contract">
              <option value="DeFi / DEX">DeFi / DEX</option>
              <option value="NFT Marketplace">NFT Marketplace</option>
              <option value="DAO">DAO</option>
              <option value="Gaming">Gaming</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>

          <div className="form-group flex-1">
            <label>
              BUDGET STAKES <span>*</span>
            </label>

            <div className="budget-row">

              <input
                type="number"
                defaultValue="25000"
                className="budget"
              />

              <select className="currency">
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
              </select>

            </div>
          </div>

        </div>

        {/* Description */}

        <div className="form-group">
          <label>
            PROTOCOL DESCRIPTION <span>*</span>
          </label>

          <textarea
            rows="6"
            placeholder="Explain the mission, core features, and architectural goals of the proposed platform. Include details about multi-sig parameters..."
          className="Project-description"
         />
        </div>

        {/* Github */}

        <div className="form-group">
          <label>GITHUB REPOSITORY LINK</label>

          <input
            type="text"
            placeholder="github.com/my-startup/repo"
            className="git-url"
          />
        </div>

        {/* Info Box */}

        <div className="info-box">
          Deployment takes approx. 3–4 blocks on-chain. The staked budget will
          be loaded immediately to the smart escrow index upon creation
          approving verification access.
        </div>
 
        {/* Buttons */}

        <div className="button-row">

          <button className="deploy-btn" onClick={()=>projectCard()}>
            Deploy &amp; Lock Escrow
          </button>

          <button className="cancel-btn">
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default Projects;