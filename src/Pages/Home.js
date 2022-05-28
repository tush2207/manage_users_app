import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserStart,
  filterUserStart,
  loadUsersStart,
  sortUserStart,
} from "../Redux/actions";
import { Link } from "react-router-dom";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBTooltip,
  MDBBtn,
  MDBSpinner,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBDropdownItem,
  
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";

const Home = () => {
  const [sortValue, setSortValue] = useState("");

  const dispatch = useDispatch();
  const { users, loading, error, pageLimit, currentPage, paginationMode } =
    useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart({ start: 0, end: 4, currentPage: 0 }));
  }, []);
  useEffect(() => () => error && toast.error(error), [error]);

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that user?")) {
      dispatch(deleteUserStart(id));
      toast.success("User Deleted Successfully");
    }
  };
  const onFilterChange = (value) => {
    dispatch(filterUserStart(value));
  };

  const sortOption = ["Name", "Email", "Mobile No", "Status"];

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
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">status</th>
              <th scope="col">Action</th>
            </tr>
          </MDBTableHead>

          {users &&
            users.map((data, index) => (
              <MDBTableBody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.mobile_no}</td>
                  <td>{data.status}</td>

                  <td>
                    <MDBBtn
                      className="m-1"
                      tag="a"
                      color="none"
                      onClick={() => handleDelete(data.id)}
                    >
                      <MDBTooltip title="Delete" tag="a">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="1g"
                        />
                      </MDBTooltip>
                    </MDBBtn>

                    <Link to={`./editUser/${data.id}`}>
                      <MDBTooltip title="Edit" tag="a">
                        <MDBIcon
                          fas
                          icon="pen"
                          style={{ color: "#55acee", margin: "10px" }}
                          size="1g"
                        />
                      </MDBTooltip>
                    </Link>
                    <Link to={`./userInfo/${data.id}`}>
                      <MDBTooltip title="View" tag="a">
                        <MDBIcon
                          fas
                          icon="eye"
                          style={{ color: "#55acee", margin: "10px" }}
                          size="1g"
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
            value={sortValue}
            onChange={onSortChange}
          >
            <option>Please select value</option>
            {sortOption.map((data, index) => (
              <option value={data.toLowerCase()} key={index}>
                {data}
              </option>
            ))}
          </select>
        </MDBCol>
        <MDBCol size="4">
          <h5>Filter by status</h5>
          <MDBBtnGroup>
            <MDBBtn color="success" onClick={() => onFilterChange("Active")}>
              Active
            </MDBBtn>
            <MDBBtn
              color="danger"
              onClick={() => onFilterChange("Inactive")}
              style={{ marginLeft: "3px" }}
            >
              Inactive
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
      <br />
    </MDBContainer>
  );
};

export default Home;
