import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {

    // use State hook to store...

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    // Handling Input...

    const handleInput = (e) => {
        //console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value, // Only changes this out of 4.. The dynamic variable
        });
    };

    // Handling Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Refresh
        console.log(user);

        try {
            const response = await fetch("http://localhost:5001/api/auth/register",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            console.log("Response data -- ", response);
            const res_data = await response.json();
            console.log("Opening Response res_data..", res_data);

            if(response.ok)
            {
                // const res_data = await response.json();
                storeTokenInLS(res_data.token);
                setUser({username: "", email: "", phone: "", password: ""});
                toast.success("Registration Successful!");
                navigate("/login");
            }
            else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }

        } catch (error) {
            console.log("Register Data Process Error ", error);
        }
    };

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/register.png" alt="Registration" width="500" height="500"/>
                        </div>

                        {/* Tackling Registration Form... */}

                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                </div>

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
                                    <label htmlFor="phone">phone</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        placeholder="phone"
                                        id="phone"
                                        required
                                        autoComplete="off"
                                        value={user.phone}
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
                                <button type="submit" className="btn btn-submit">Register Now</button>

                                
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
};