module.exports = {
    registrationFormItems: [
        // username
        {
            icon: 'bi bi-person',
            input: {
                type: 'text',
                id: 'username',
                name: 'username',
                placeholder: 'Username'
            },
            label: {
                for: 'username'
            },
            feedbackId: 'username-feedback',
            feedbackPlaceholder: ''
},

        // email
        {
            icon: 'bi bi-envelope',
            input: {
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'Email'
            },
            label: {
                for: 'email'
            },
            feedbackId: 'email-feedback',
            feedbackPlaceholder: ''
        },

        // password
        {
            icon: 'bi bi-key',
            input: {
                type: 'password',
                id: 'password',
                name: 'password',
                placeholder: 'Password'
            },
            label: {
                for: 'password'
            },
            feedbackId: 'password-feedback',
            feedbackPlaceholder: ''
        },

        // repeat password
        {
            icon: 'bi bi-lock',
            input: {
                type: 'password',
                id: 'repeat-password',
                name: 'repeat-password',
                placeholder: 'Repeat password'
            },
            label: {
                for: 'repeat-password'
            },
            feedbackId: 'repeat-password-feedback',
            feedbackPlaceholder: ''
        }
    ],

    loginFormItems: [
        {
            icon: 'bi bi-person',
            input: {
                type: 'text',
                id: 'username',
                name: 'username',
                placeholder: 'Username'
            },
            label: {
                for: 'username'
            },
            feedbackId: 'username-feedback',
            feedbackPlaceholder: ''
        },

        // password
        {
            icon: 'bi bi-key',
            input: {
                type: 'password',
                id: 'password',
                name: 'password',
                placeholder: 'Password'
            },
            label: {
                for: 'password'
            },
            feedbackId: 'password-feedback',
            feedbackPlaceholder: ''
        },
    ]
}
