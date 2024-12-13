import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  };

export const Contact = () => {

    // const[contact, setContact] = useState({
    //     username: "",
    //     email: "",
    //     message: "",
    // });

    const[contact, setContact] = useState(defaultContactFormData);

    //const [data, setData] = useState(defaultContactFormData);
    const {user} = useAuth();
    console.log("frontend user ", user.email);
    const [userData, setUserData] = useState(true);
    

    if(userData && user)
    {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        setUserData(false);
    }

    const handleInput = (e) => {
        const name  = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]:value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contact);

        try {
            const response = await fetch("http://localhost:5001/api/form/contact",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            console.log("Response obtained in contact form..", response);

            if(response.ok)
            {
                setContact(defaultContactFormData);
                const responseData = await response.json();
                alert(responseData);
                console.log("Our Response Data contact form (MSG FROM BACKEND)...", responseData);
            }
            else{
                console.error("API ERROR: ", response.status, response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Contact Us</h1>
                </div>

                {/* Main Part Of Contact Page */}

                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="/images/support.png" alt="Ready to help.." />
                    </div>

                    {/* Actual Content */}
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                               <label htmlFor="username">Username</label>
                               <input 
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={contact.username}
                                    onChange={handleInput}
                                    required
                                /> 
                            </div>

                            <div>
                               <label htmlFor="email">email</label>
                               <input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange = {handleInput}
                                    required
                                /> 
                            </div>

                            <div>
                                <label htmlFor="message">message</label>
                                <textarea name="message" 
                                id="message" 
                                cols="30" 
                                rows="6" 
                                autoComplete="off" 
                                value = {contact.message} 
                                onChange = {handleInput} 
                                required
                                >
                                </textarea>
                            </div>

                            <div>
                                <button type="submit">submit</button>
                            </div>

                        </form>
                    </section>
                </div>

                <section className="mb-3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.5577014541964!2d77.1066245740853!3d28.432599993134296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f568d91b2dd%3A0xac093359bcc8d008!2sSuncity%20Hts%2C%20Suncity%2C%20Sector%2054%2C%20Gurugram%2C%20Haiderpur%2C%20Haryana%20122003!5e0!3m2!1sen!2sin!4v1721430054848!5m2!1sen!2sin" 
                    width="100%" 
                    height="450" 
                     
                    loading="lazy" 
                    
                    ></iframe>
                </section>
            </section>
        </>
    )
};


// Correction...

// import { useState, useEffect } from "react";
// import { useAuth } from "../store/auth";

// const defaultContactFormData = {
//     username: "",
//     email: "",
//     message: "",
// };

// export const Contact = () => {
//     const [data, setData] = useState(defaultContactFormData);
//     const { user } = useAuth();
//     const [isDataSet, setIsDataSet] = useState(false);

//     useEffect(() => {
//         if (user && !isDataSet) {
//             setData({
//                 username: user.username,
//                 email: user.email,
//                 message: "",
//             });
//             setIsDataSet(true);
//         }
//     }, [user, isDataSet]);

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(data);
//     };

//     return (
//         <section className="section-contact">
//             <div className="contact-content container">
//                 <h1 className="main-heading">Contact Us</h1>
//             </div>
//             <div className="container grid grid-two-cols">
//                 <div className="contact-img">
//                     <img src="/images/support.png" alt="Ready to help.." />
//                 </div>
//                 <section className="section-form">
//                     <form onSubmit={handleSubmit}>
//                         <div>
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 id="username"
//                                 autoComplete="off"
//                                 value={data.username}
//                                 onChange={handleInput}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 autoComplete="off"
//                                 value={data.email}
//                                 onChange={handleInput}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="message">Message</label>
//                             <textarea
//                                 name="message"
//                                 id="message"
//                                 cols="30"
//                                 rows="6"
//                                 autoComplete="off"
//                                 value={data.message}
//                                 onChange={handleInput}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <button type="submit">Submit</button>
//                         </div>
//                     </form>
//                 </section>
//             </div>
//             <section className="mb-3">
//                 <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.5577014541964!2d77.1066245740853!3d28.432599993134296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f568d91b2dd%3A0xac093359bcc8d008!2sSuncity%20Hts%2C%20Suncity%2C%20Sector%2054%2C%20Gurugram%2C%20Haiderpur%2C%20Haryana%20122003!5e0!3m2!1sen!2sin!4v1721430054848!5m2!1sen!2sin"
//                     width="100%"
//                     height="450"
//                     loading="lazy"
//                 ></iframe>
//             </section>
//         </section>
//     );
// };
