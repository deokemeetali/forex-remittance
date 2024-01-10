import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";

function SortDropdown() {
  return (
    <NavDropdown
      title="Sort by"
      id="navbarDarkDropdownMenuLink"
      menuVariant="dark"
      menuAlign="right" // Aligns the dropdown to the right
    >
      <NavDropdown.Item href="#">Weekly</NavDropdown.Item>
      <NavDropdown.Item href="#">Monthly</NavDropdown.Item>
      <NavDropdown.Item href="#">Yearly</NavDropdown.Item>
    </NavDropdown>
  );
}

export default SortDropdown;