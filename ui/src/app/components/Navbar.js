import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <div className="">
        <a className="navbar-brand" href="#">
          <img
            src="images/f82da84b-dac7-4549-bda1-a9993d363077.svg"
            alt="Logo"
            width="50"
            height="50"
          />
        </a>
      </div>
      <div className="container">
        <div className="d-flex flex-row gap-5">
          <a className="nav-link" href="/">
            Work
          </a>
          <a className="nav-link" href="/">
            My Work
          </a>
          <a className="nav-link" href="/">
            Billing
          </a>
          <a className="nav-link" href="/">
            Lab
          </a>
          <a className="nav-link" href="/">
            Analysis
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
