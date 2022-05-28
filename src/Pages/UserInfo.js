import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";

const UserInfo = () => {
  const { users } = useSelector((state) => state.data);
  const { id } = useParams();
  const navigate = useNavigate();
  const singleUser = users.find((data) => data.id === Number(id));
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        className="row"
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
        }}
      >
        <p className="col-md-12 fs-3">User Detail</p>
        <hr />
        <p className="col-md-6 fw-bold">ID:</p>
        <p className="col-md-6">{singleUser.id}</p>
        <p className="col-md-6 fw-bold">NAME:</p>
        <p className="col-md-6">{singleUser.name}</p>
        <p className="col-md-6 fw-bold">EMAIL:</p>
        <p className="col-md-6">{singleUser.email}</p>
        <p className="col-md-6 fw-bold">MOBILE NO:</p>
        <p className="col-md-6">{singleUser.mobile_no}</p>
      </div>

      <MDBBtn onClick={() => navigate("/")} color="danger">
        Goback
      </MDBBtn>
    </div>
  );
};

export default UserInfo;
