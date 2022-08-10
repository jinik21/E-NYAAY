import CreateIcon from "@mui/icons-material/Create";
import DoneIcon from "@mui/icons-material/Done";
import "./profile.css";

const Profile = () => {
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
                        Lawyer Lawyer
                      </h5>
                      <h6 class="user-email">lawyer@gmail.com</h6>
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
                      <label for="Name">First Name</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="First Name"
                          name="firstname"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          //onChange={this.onedit}
                          value="Lawyer"
                          //disabled={this.state.abled_firstname}
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
                      <label for="Name">Last Name</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last Name"
                          name="lastname"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          //onChange={this.onedit}
                          value="Lawyer"
                          //disabled={this.state.abled_lastname}
                        />
                        {/* <div class="input-group-append">
                          {this.state.abled_lastname === "disabled" ? (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.IsLastnameAbled}
                            >
                              <CreateIcon />
                            </button>
                          ) : (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.onLastnameUpdate}
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
                          value="9898989893"
                          //disabled={this.state.abled_phone}
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
                      <label for="Name">Date of Birth</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          name="dob"
                          aria-describedby="basic-addon2"
                          //onChange={this.onedit}
                          value="date"
                          //disabled={this.state.abled_dob}
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
                      <label for="Name">Address</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          name="address"
                          aria-describedby="basic-addon2"
                          //onChange={this.onedit}
                          value="Address"
                          //disabled={this.state.abled_address}
                        />
                        {/* <div class="input-group-append">
                          {this.state.abled_address === "disabled" ? (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.IsAddressAbled}
                            >
                              <CreateIcon />
                            </button>
                          ) : (
                            <button
                              class="input-group-text"
                              id="basic-addon2"
                              onClick={this.onAddressUpdate}
                            >
                              <DoneIcon />
                            </button>
                          )}
                        </div> */}
                      </div>
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
                          value="City"
                          //disabled={this.state.abled_city}
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
                          value="State"
                          // disabled={this.state.abled_state}
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
                      <label for="Name">Pincode</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          name="pincode"
                          aria-describedby="basic-addon2"
                          // onChange={this.onedit}
                          value="1001001"
                          // disabled={this.state.abled_pincode}
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
                  <div class="row gutters">
                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                      <div class="text-right">
                        <button
                          type="button"
                          name="submit"
                          class="btn btn-primary"
                          // onClick={this.onUpdate}
                        >
                          Click To Confirm
                        </button>
                      </div>
                    </div>
                    {/* {this.state.canChange?(
                        <div>
                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                      <span class="input-group-btn">
                        <span class="btn btn-primary">
                          <input
                            type="file"
                            single
                            onChange={this.handleChange}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                        <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => this.uploadImage(this.state.file.name)}
                        >
                        Upload Photo
                        </button>
                    </div></div>):(<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12"><button onClick={this.IsChange} className="btn btn-primary">Change Photo</button></div>)} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;