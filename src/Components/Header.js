import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBBtn,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadUsersStart, searchUserStart } from "../Redux/actions";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUserStart(searchTerm));
    setSearchTerm("");
  };
  return (
    <div>
      <MDBNavbar expand="lg" light bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon="book-open" />
            </span>
            Contact
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-white"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/addUser" className="text-white">
                    AddEdit
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="userInfo/:id" className="text-white">
                    UserInfo
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/About" className="text-white">
                    About
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Search Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MDBBtn color="dark" type="submit ">
                Search
              </MDBBtn>
            </form>
            <MDBBtn
              color="info"
              className="mx-2"
              style={{ marginLeft: "4px" }}
              onClick={() => loadUsersStart()}
            >
              Reset
            </MDBBtn>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Header;
