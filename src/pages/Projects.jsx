function Projects() {
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
          />
        </div>

        {/* Category + Budget */}

        <div className="row">

          <div className="form-group flex-1">
            <label>CONTRACT CATEGORY</label>

            <select>
              <option>DeFi / DEX</option>
              <option>NFT Marketplace</option>
              <option>DAO</option>
              <option>Gaming</option>
              <option>Infrastructure</option>
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
              />

              <select className="currency">
                <option>USDC</option>
                <option>USDT</option>
                <option>ETH</option>
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
          />
        </div>

        {/* Github */}

        <div className="form-group">
          <label>GITHUB REPOSITORY LINK</label>

          <input
            type="url"
            placeholder="github.com/my-startup/repo"
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

          <button className="deploy-btn">
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