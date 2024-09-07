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
const createNotificationValidationSchema = {
    notiType : {
        notEmpty : {
            errorMessage : "Content cannot be empty",
        },
    },
};
const createCommentValidationSchema = {
    content : {
        notEmpty : {
            errorMessage : "Content cannot be empty",
        },
    },
};
module.exports ={createUserValidationSchema,createNotificationValidationSchema,createCommentValidationSchema };
