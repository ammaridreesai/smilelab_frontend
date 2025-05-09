import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3">
      <ul className="list-unstyled">
        <li className="mt-4">
          <a href="/" className="nav-link">
            New Orders
          </a>
        </li>
        <li className="mt-4">
          <a href="/" className="nav-link">
            Work in progress
          </a>
        </li>
        <li className="mt-4">
          <a href="/" className="nav-link">
            Outsourced
          </a>
        </li>
        <li className="mt-4">
          <a href="/" className="nav-link">
            Scaners
          </a>
        </li>
        <li className="mt-4">
          <a href="/" className="nav-link">
            Scheduling
          </a>
        </li>
        <li className="mt-4">
          <a href="/" className="nav-link">
            Ready/in clinic
          </a>
        </li>
        <li className="mt-4">
          <a href="/" className="nav-link">
            Message/Items
          </a>
        </li>
        <li className="mt-4">
          <a href="/" className="nav-link">
            Shipments
          </a>
        </li>
        <li className="mt-4">
          <a href="/" className="nav-link">
            All work
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
