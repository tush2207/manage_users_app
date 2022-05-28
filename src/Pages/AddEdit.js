import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../Redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  mobile_no: "",
  status: "",
};

const option = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { users } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log("id=>", id);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((data) => data.id === Number(id));
      setFormValue({ ...singleUser });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const navigate = useNavigate();

  const { name, email, mobile_no, status } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && mobile_no) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User added Successfully");
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated Successfully");
        setTimeout(() => navigate("/"), 500);
      }
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onDowpdown = (e) => {
    setFormValue({ ...formValue, status: e.target.value });
  };
  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">
        {!editMode ? "Add User Detail" : "Update User Detail"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alighContent: "center",
        }}
      >
        <MDBInput
          value={name || ""}
          name="name"
          type="text"
          onChange={onInputChange}
          required
          label="Name"
          validation="Please provide a name"
          invalid
        />
        <br />
        <MDBInput
          value={email || ""}
          name="email"
          type="text"
          onChange={onInputChange}
          required
          label="Email"
          validation="Please provide a email"
          invalid
        />
        <br />

        <MDBInput
          value={mobile_no || ""}
          name="mobile_no"
          type="number"
          onChange={onInputChange}
          required
          label="Mobile no"
          validation="Please provide a mobile no"
          invalid
        />
        <br />
        <select
          style={{ width: "100%", borderadius: "4px", height: "35px" }}
          onChange={onDowpdown}
        >
          <option>Please select status</option>
          {option.map((option) => (
            <option
              value={option.label || ""}
              selected={option.label === status ? true : false}
            >
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {!editMode ? "Add" : "Update"}
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Goback
          </MDBBtn>

          <br />
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEdit;
