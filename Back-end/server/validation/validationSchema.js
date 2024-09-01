const createUserValidationSchema = {
    userName : {
        notEmpty : {
            errorMessage : "Username cannot be empty",
        },
        isString : {
            errorMessage : "username must be a String"
        },

    },
    password : {
        notEmpty : {
            errorMessage : "Password cannot be empty",
        }
    }
};
module.exports ={createUserValidationSchema};
