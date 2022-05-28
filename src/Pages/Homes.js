import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserStart,
  filterUserStart,
  loadUsersStart,
  sortUserStart,
} from "../Redux/actions";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCol,
  MDBContainer,
  MDBDropdownItem,
  MDBIcon,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error, pageLimit, currentPage, paginationMode } =
    useSelector((state) => state.data);
  const [sortValue, setSortValue] = useState("");
  const sortOption = ["Name", "Email", "Phone", "Address", "Status"];

  useEffect(() => {
    dispatch(loadUsersStart({ start: 0, end: 4, currentPage: 0 }));
  }, []);

  useEffect(() => error && toast.error(error), [error]);

  const handleDelete = (id)=> {
    if (window.confirm("Are you sure you want to delete the user?")) {
      dispatch(deleteUserStart(id));
      toast.success("User deleted Successfully");
    }
  };

  const onFilterChange = (value) => {
    dispatch(filterUserStart(value));
  };

  const onSortChange = (e) => {
    let sortValue = e.target.value
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    if (sortOption.includes(sortValue)) {
      setSortValue(e.target.value);
      dispatch(sortUserStart(e.target.value));
    } else {
      dispatch(loadUsersStart());
      setSortValue("");
    }
  };

  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                dispatch(loadUsersStart({ start: 4, end: 8, currentPage: 1 }))
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && users.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                dispatch(
                  loadUsersStart({
                    start: (currentPage - 1) * 4,
                    end: currentPage * 4,
                    currentPage: -1,
                  })
                )
              }
            >
              Prev
            </MDBBtn>

            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBDropdownItem>
            <MDBBtn
              onClick={() =>
                dispatch(
                  loadUsersStart({
                    start: (currentPage + 1) * 4,
                    end: (currentPage + 2) * 4,
                    currentPage: 1,
                  })
                )
              }
            >
              Next
            </MDBBtn>
          </MDBDropdownItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBDropdownItem>
            <MDBBtn
              onClick={() =>
                dispatch(
                  loadUsersStart({
                    start: (currentPage - 1) * 4,
                    end: (currentPage + 2) * 8,
                    currentPage: -1,
                  })
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBDropdownItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return (
    <MDBContainer>
      <div className="container" style={{ marginTop: "150px" }}>
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </MDBTableHead>
          {users &&
            users.map((item, index) => (
              <MDBTableBody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.status}</td>
                  <td>
                    <MDBBtn
                      className="m-1"
                      tag="a"
                      color="none"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MDBTooltip title="Delete" tag="a">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </MDBBtn>{" "}
                    <Link to={`./editUser/${item.id}`}>
                      <MDBTooltip title="Edit" tag="a">
                        <MDBIcon
                          fas
                          icon="pen"
                          style={{ color: "#55acee", marginBottom: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>{" "}
                    <Link to={`./userInfo/${item.id}`}>
                      <MDBTooltip title="View" tag="a">
                        <MDBIcon
                          fas
                          icon="eye"
                          style={{ color: "#3b5998", marginBottom: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>
                  </td>
                </tr>
              </MDBTableBody>
            ))}
        </MDBTable>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "200px",
            alignContent: "center",
          }}
        >
          {paginationMode ? (
            <div
              style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "200px",
                alignContent: "center",
              }}
            >
              {renderPagination()}
            </div>
          ) : null}
        </div>
      </div>
      <MDBRow>
        <MDBCol size="8">
          <h5>Sort by:</h5>
          <select
            style={{ width: "50%", borderRadius: "2px", height: "35px" }}
            onChange={onSortChange}
            value={sortValue}
          >
            <option>Please Select Value</option>
            {sortOption.map((item, index) => (
              <option value={item.toLowerCase()} key={index}>
                {item}
              </option>
            ))}
          </select>
        </MDBCol>
        <MDBCol size="4">
          <h5>Filter by Status:</h5>
          <MDBBtnGroup>
            <MDBBtn color="success" onClick={() => onFilterChange("Active")}>
              Active
            </MDBBtn>
            <MDBBtn color="danger" onClick={() => onFilterChange("Inactive")}>
              Inactive
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;