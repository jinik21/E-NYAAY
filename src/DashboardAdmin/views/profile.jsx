import CreateIcon from "@mui/icons-material/Create";
import DoneIcon from "@mui/icons-material/Done";
import "./profile.css";
import React, { useEffect, useState } from "react";

const ProfileAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [bar, setBar] = useState("");
  const [city, setCity] = useState("");
  const [state, setstate] = useState("");
  const [nocases, setnocases] = useState(0);
  useEffect(() => {
    const func = async () => {
      const token = user.token;
      console.log(token);
      let data = await fetch(
        "http://localhost:3001/admin/profile",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          }
        }
      );
      data = await data.json();
      console.log(data);
      setFullName(data.name);
      setPhone(data.phone);
      setBar(data.barNo);
      setCity(data.city);
      setstate(data.state);
      setnocases(data.cases.length);
    };
    func();
  }, []);
  return (
    <div>
        <div class="container" style={{ paddingTop: "40px" }}>
          <div class="row gutters">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div class="card h-100">
                <div class="card-body">
                  <div class="account-settings">
                    <div class="user-profile">
                      <div class="user-avatar">
                        <img 
                            src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" 
                            alt="pic"
                            style={{"height": "200px"}} />
                      </div>
                      <h5 class="user-name" style={{"alignContent": "space-evenly"}}>
                        {fullname}
                      </h5>
                      <h6 class="user-email">{user.email}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div class="card h-100">
                <div class="card-body">
                  <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 class="mb-2 text-primary">Personal Details</h6>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <label for="Name">Full Name</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="First Name"
                          name="firstname"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          //onChange={this.onedit}
                          value={fullname}
                          disabled={true}
                        />
                        {/* <div class="input-group-append">
                          {this.state.abled_firstname === "disabled" ? (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              // onClick={this.IsFirstnameAbled}
                            >
                              <CreateIcon />
                            </button>
                          ) : (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              // onClick={this.onFirstnameUpdate}
                            >
                              <DoneIcon />
                            </button>
                          )}
                        </div> */}
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <label for="Name">Phone</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Recipient's username"
                          name="phone"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          //onChange={this.onedit}
                          value={phone}
                          disabled={true}
                        />
                        {/* <div class="input-group-append">
                          {this.state.abled_phone === "disabled" ? (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.IsPhoneAbled}
                            >
                              <CreateIcon />
                            </button>
                          ) : (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.onPhoneUpdate}
                            >
                              <DoneIcon />
                            </button>
                          )}
                        </div> */}
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <label for="Name">Bar Registration Number</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          name="dob"
                          aria-describedby="basic-addon2"
                          //onChange={this.onedit}
                          value={bar}
                          disabled={true}
                        />
                        {/* <div class="input-group-append">
                          {this.state.abled_dob === "disabled" ? (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.IsDOBAbled}
                            >
                              <CreateIcon />
                            </button>
                          ) : (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.onDOBUpdate}
                            >
                              <DoneIcon />
                            </button>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 class="mt-3 mb-2 text-primary">Location</h6>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <label for="Name">City</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          name="city"
                          aria-describedby="basic-addon2"
                          //onChange={this.onedit}
                          value={city}
                          disabled={true}
                        />
                        {/* <div class="input-group-append">
                          {this.state.abled_city === "disabled" ? (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.IsCityAbled}
                            >
                              <CreateIcon />
                            </button>
                          ) : (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.onCityUpdate}
                            >
                              <DoneIcon />
                            </button>
                          )}
                        </div> */}
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <label for="Name">State</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          name="state"
                          aria-describedby="basic-addon2"
                          // onChange={this.onedit}
                          value={state}
                          disabled={true}
                        />
                        {/* <div class="input-group-append">
                          {this.state.abled_state === "disabled" ? (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.IsStateAbled}
                            >
                              <CreateIcon />
                            </button>
                          ) : (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.onStateUpdate}
                            >
                              <DoneIcon />
                            </button>
                          )}
                        </div> */}
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <label class="mt-3 mb-2 text-primary" for="Name">Number of Cases</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          name="nocases"
                          aria-describedby="basic-addon2"
                          // onChange={this.onedit}
                          value={nocases}
                          disabled={true}
                        />
                        {/* <div class="input-group-append">
                          {this.state.abled_pincode === "disabled" ? (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.IsPincodeAbled}
                            >
                              <CreateIcon />
                            </button>
                          ) : (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.onPincodeUpdate}
                            >
                              <DoneIcon />
                            </button>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfileAdmin;