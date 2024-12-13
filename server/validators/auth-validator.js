const {z} = require("zod");

const loginSchema = z.object({
        email: z
        .string({required_error: "Email is required"})
        .trim()
        .email({message:"Invalid Email"})
        .min(3,{message:"Email should atleast be 3 characters"})
        .max(255,{message:"Email should max be 255 characters"}),
        
        password: z
        .string({required_error: "Password is required"})
        .min(8,{message:"Password should atleast be 10 characters"})
        .max(1000,{message:"Password should max be 20 characters"}),  
});

const signupSchema = loginSchema.extend({
    username: z
            .string({required_error: "Name is required"})
            .trim()
            .min(3,{message:"Name should atleast be 3 characters"})
            .max(255,{message:"Name should max be 255 characters"}),


//     email: z
//         //     .string({required_error: "Email is required"})
//         //     .trim()
//         //     .email({message:"Invalid Email"})
//         //     .min(3,{message:"Email should atleast be 3 characters"})
//         //     .max(255,{message:"Email should max be 255 characters"}),
            
    phone: z
            .string({required_error: "Phone is required"})
            .trim()
            .min(10,{message:"Phone Number should atleast be 3 characters"})
            .max(20,{message:"Phone Number should max be 20 characters"}),
            
//     password: z
//             .string({required_error: "Password is required"})
//             .min(8,{message:"Password should atleast be 10 characters"})
//             .max(1000,{message:"Password should max be 20 characters"}),             
});

module.exports = signupSchema, loginSchema;