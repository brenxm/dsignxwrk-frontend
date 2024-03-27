import React from "react"

export default function validations () {
    return [
        {
            flag: (usersPwInput)=> usersPwInput.length >= 8,
            description: "Password must be at least 8 characters"
        },
        {
            flag: (usersPwInput)=> /[\D\W]+/.test(usersPwInput),
            description: "Password must contain at least one number or one special character"
        }
    ]
}

export {}