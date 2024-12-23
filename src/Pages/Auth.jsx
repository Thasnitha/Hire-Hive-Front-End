
import React, { useContext, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/allAPI";
import Spinner from 'react-bootstrap/Spinner';
import { tokenContext } from "../context/TokenAuth";

const Auth = ({ insideRegister }) => {
  const{authorisedUser,setAuthorisedUser}=useContext(tokenContext)
  const[islogin,setIslogin]=useState(false)

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    FullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });


  const register = async (e) => {
    e.preventDefault();

    // Debug userInput values
    console.log("User Input at Register:", userInput);

    // Check if all fields are filled
    if (userInput.FullName && userInput.email && userInput.phoneNumber && userInput.password && userInput.role) {
      try {
        const result = await registerAPI(userInput);

        if (result.status === 201) {
          alert(`Welcome ${result.data?.FullName}, Please log in to access the Hire Hive and start exploring oppurtunities`);
          navigate("/login");
          setUserInput({ FullName: "", email: "", phoneNumber: "", password: "", role: "" }); // Reset fields
        } else {
          if (result.response?.status === 409) {
            alert(result.response.data);
            setUserInput({ FullName: "", email: "", phoneNumber: "", password: "", role: "" }); // Reset fields
          }
        }
      } catch (err) {
        console.error("Registration Error:", err);
      }
    } else {
      alert("Please fill the form completely!!!");
    }
  };

const login = async (e) => {
  e.preventDefault();
  
  if (userInput.email && userInput.password && userInput.role) { // Ensure role is present in the login payload
      try {
          console.log("User Input at Login:", userInput); // Log user input to check role value

          // Check if the role matches the role in the database
          const result = await loginAPI(userInput);
          console.log(result);
          

          if (result.status === 200) {
              // Check if the role from the response matches the user's input
              if (result.data.user.role !== userInput.role) {
                  alert("Role mismatch! Please ensure you are logging in with the correct role.");
                  return

              }

              sessionStorage.setItem("user", JSON.stringify(result.data.user));
              sessionStorage.setItem("token", result.data.token);
              setIslogin(true);
              setAuthorisedUser(true)

              setTimeout(() => {
                  // Redirect based on role
                  if (userInput.role === "student") {
                      navigate("/"); // Navigate to the home page
                  } else if (userInput.role === "recruiter") {
                      navigate("/admin/companies"); // Navigate to the admin page
                  }

                  setUserInput({ FullName: "", email: "", password: "", role: "" }); // Reset all fields
                  setIslogin(false);
              }, 2000);
          } else {
              if (result.response?.status === 404) {
                  alert(result.response.data);
              }
          }
      } catch (err) {
          console.error("Login Error:", err);
      }
  } else {
      alert("Please fill the form completely!!!");
  }
};







  return (
    <div style={{ minHeight: "100vh", width: "100%" }} className="d-flex justify-content-center align-items-center">
      <div className="container w-75">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                className="img-fluid"
                src="https://www.webclickindia.com/images/pageitems/job-portal-development.png"
                alt="Hire Hive"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="my-2">
                <i className="fa-brands fa-hive"></i>Hire <span className="">Hive</span>
              </h1>
              <h5>Sign {insideRegister ? "Up" : "In"} to your Account</h5>

              <Form>
                {insideRegister && (
                  <>
                    <FloatingLabel controlId="floatingInputFullName" label="Full Name" className="mb-3">
                      <Form.Control
                        value={userInput.FullName}
                        onChange={(e) => setUserInput({ ...userInput, FullName: e.target.value })}
                        type="text"
                        placeholder="Full Name"
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number" className="mb-3">
                      <Form.Control
                        value={userInput.phoneNumber}
                        onChange={(e) => setUserInput({ ...userInput, phoneNumber: e.target.value })}
                        type="text"
                        placeholder="Phone Number"
                      />
                    </FloatingLabel>
                  </>
                )}

                {/* <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control
                    value={userInput.email}
                    onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                    type="email"
                    placeholder="Email"
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                  <Form.Control
                    value={userInput.password}
                    onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>

                {insideRegister && (
                  <div className="mt-3">
                    <Form.Check
                      checked={userInput.role === "student"}
                      value="student"
                      inline
                      label="Student"
                      name="userType"
                      type="radio"
                      id="student-radio"
                      onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
                    />
                    <Form.Check
                      checked={userInput.role === "recruiter"}
                      value="recruiter"
                      inline
                      label="Recruiter"
                      name="userType"
                      type="radio"
                      id="recruiter-radio"
                      onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
                    />
                  </div>
                )} */}
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
  <Form.Control
    value={userInput.email}
    onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
    type="email"
    placeholder="Email"
  />
</FloatingLabel>

<FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
  <Form.Control
    value={userInput.password}
    onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
    type="password"
    placeholder="Password"
  />
</FloatingLabel>

  <div className="mt-3">
    <Form.Check
      checked={userInput.role === "student"}
      value="student"
      inline
      label="Student"
      name="userType"
      type="radio"
      id="student-radio"
      onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
    />
    <Form.Check
      checked={userInput.role === "recruiter"}
      value="recruiter"
      inline
      label="Recruiter"
      name="userType"
      type="radio"
      id="recruiter-radio"
      onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
    />
  </div>


                {insideRegister ? (
                  <div>
                    <button onClick={register} style={{ width: "500px", marginTop: "30px" }} className="btn btn-info mb-2">
                      REGISTER
                    </button>
                    <p>
                      Already have an account? <Link to={"/login"}>Login</Link>
                    </p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <button onClick={login} style={{ width: "500px", marginTop: "30px" }} className="btn btn-info mb-2  ">
                      LOGIN
                      {
                        islogin &&  <Spinner  className='ms-2 size-1' animation="border" variant="light" />
                        
                      }
                    </button>
                    <p>
                      Don't have an account? <Link to={"/register"}>Register</Link>
                    </p>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
