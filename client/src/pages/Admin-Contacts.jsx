import { useEffect, useState } from "react";
import {useAuth} from "../store/auth";
import {toast} from "react-toastify";

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const {authorizationToken} = useAuth();
    const getContactsData = async() => {
        try {
            const response = await fetch("http://localhost:5001/api/admin/contacts", {
                method:"GET",
                headers:{
                    Authorization : authorizationToken,
                }
            });

            const data = await response.json();
            console.log("Contact Data... ", data);

            if(response.ok)
            {
                setContactData(data);
                console.log("My RESPONSE -> ", response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // DEFINING FUNCTION deleteContactById

    const deleteContactById = async(id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/admin/contacts/delete/${id}`,
            {
                method:"DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            }
            );
        
        if(response.ok)
        {
            getContactsData(); // To get left over data again on page... Iske bina refresh krna pdta
            toast.success("Deleted Successfully!")
        }
        else{
            toast.error("Not Deleted!!");
        }

    }catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getContactsData();
    }, []);

    return (
    <>
        <section className="container admin-users">
        <h1>Admin Contact Data</h1>

        <div className="container admin-users">
        {contactData.map((curContactData, index) => {
            const {username, email, message, _id} = curContactData;
            return(
                <div key={index}>
                    <p>{username}</p>
                    <p>{email}</p>
                    <p>{message}</p>
                    <button className="btn" onClick={()=> deleteContactById(_id)}>delete</button>
                </div>
            );
        })}
        </div>
        </section>
    </>
    );
};