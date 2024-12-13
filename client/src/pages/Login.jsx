import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5001/api/auth/login";

export const Login = () => {

    const [user, setUser] = useState({
        email:"",
        password:"",
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch (URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            console.log("Login Data from login page...", response);
            const res_data = await response.json();
            console.log("res_data from Login", res_data);

            if(response.ok)
            {
                //const res_data = await response.json();
                storeTokenInLS(res_data.token);
                setUser({email: "", password:""});
                toast.success("Login Successful!")
                navigate("/");
            }
            else
            {   
                toast.error(res_data.message);
                console.log(res_data.message);
            }

        } catch (error) {
            alert(error);
            console.log("Login Page Error => ",error);
        }
    };

    return (
    <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.png" alt="Login Form" width="500" height="500"/>
                        </div>

                        {/* Tackling Registration Form... */}

                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Login form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>

                                <div>
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password">password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                </div>

                                <br />
                                <button type="submit" className="btn btn-submit">Login Now</button>

                                
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
    );
};