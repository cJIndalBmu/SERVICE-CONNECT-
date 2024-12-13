import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const[services, setServices] = useState("");
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken); // Login Pe Set it..
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;
    console.log("Token Value ", token);
    console.log("isLoggedIn Value ", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5001/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if(response.ok)
            {
                const data = await response.json();
                console.log("Our data ",data);
                setUser(data.userData);
                setIsLoading(false); // Data Milne ke baad..
                console.log("What we want ",data.userData);
            }
            else{
                console.error("Error fetching data");
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getServiceData = async() => {
        try {
            const response = await fetch("http://localhost:5001/api/data/service", {
                method: "GET",
            });

            if(response.ok)
            {
                const res = await response.json();
                console.log(res);
                console.log("Our Interest...",res.data);
                setServices(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userAuthentication();
        getServiceData();
    }, []);

    return(
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside Provider");
    }

    return authContextValue;
}

// import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem("token") || "");
//     const [user, setUser] = useState("");

//     const storeTokenInLS = (serverToken) => {
//         setToken(serverToken);
//         localStorage.setItem("token", serverToken);
//     };

//     const isLoggedIn = !!token;

//     const LogoutUser = () => {
//         setToken("");
//         localStorage.removeItem("token");
//     };

//     const userAuthentication = async () => {
//         if (!token) return;

//         try {
//             const response = await fetch("http://localhost:/api/auth/user", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log("Our data ",data);
//                 setUser(data.userData);
//                 console.log("What we want ",data.userData);

//             } else {
//                 console.error("Error fetching data");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         userAuthentication();
//     }, [token]);

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const authContextValue = useContext(AuthContext);
//     if (!authContextValue) {
//         throw new Error("useAuth used outside Provider");
//     }
//     return authContextValue;
// };
