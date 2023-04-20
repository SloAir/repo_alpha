function validateUsernameInput(username) {
    const regex = new RegExp(/^[a-zA-Z0-9-_]{3,32}$/);

    if(username === "") {
        return [false, "&zwnj;"];
    }

    if(username.length < 3) {
        return [false, "Username should be at least 3 characters long."];
    }

    if(username.length > 32) {
        return [false, "Username should not be longer than 32 characters."];
    }

    if(!regex.test(username)) {
        return [false, "Username should not contain special symbols."];
    }

    return [true, "&zwnj;"];
}

function validateEmailInput(email) {
    const regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    if(email === "") {
        return [false, "&zwnj;"];
    }

    if(!regex.test(email)) {
        return [false, "Invalid email input."];
    }

    return [true, "&zwnj;"];
}

function validateUsername() {
    const usernameInput = document.getElementById('username');

    usernameInput.onblur = () => {
        const username = usernameInput.value;
        const feedbackMessage = document.getElementById('username-feedback');

        removeTextClasses(feedbackMessage);

        $.ajax({
            type: 'POST',
            url: '/users/validate_username',
            data: { username: username },
            success: (res) => {
                const [status, msg] = validateUsernameInput(username);
                if(status === true) {
                    if(!res.exists) {
                        feedbackMessage.innerHTML = "Username is available.";
                        feedbackMessage.classList.add('text-success');
                    }
                    else {
                        feedbackMessage.innerHTML = "Username already taken.";
                        feedbackMessage.classList.add('text-danger');
                    }
                }
                else {
                    feedbackMessage.innerHTML = msg;
                    feedbackMessage.classList.add('text-danger');
                }
            }
        });
    };
}

function validateEmail() {
    const emailInput = document.getElementById('email');

    emailInput.onblur = () => {
        const email = emailInput.value;
        const feedbackMessage = document.getElementById('email-feedback');

        removeTextClasses(feedbackMessage);

        $.ajax({
            type: 'POST',
            url: '/users/validate_email',
            data: { email: email },
            success: (res) => {
                const [status, msg] = validateEmailInput(email);
                if(status === true) {
                    if(!res.exists) {
                        feedbackMessage.innerHTML = 'Email is available.';
                        feedbackMessage.classList.add('text-success');
                    }
                    else {
                        feedbackMessage.innerHTML = 'Email already exists.';
                        feedbackMessage.classList.add('text-danger');
                    }
                }
                else {
                    feedbackMessage.innerHTML = msg;
                    feedbackMessage.classList.add('text-danger');
                }
            }
        });
    };
}

function passwordsMatch(password, repeatedPassword) {
    return password === repeatedPassword;
}

function validatePasswordInput(password) {
    const regex = new RegExp(/[^ ]{8,}/)

    if(password.length < 8) {
        return "Password should be at least 8 characters long.";
    }

    if(!regex.test(password)) {
        return "Password should not contain any spaces.";
    }

    return true;
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const repeatPasswordInput = document.getElementById('repeat-password');

    passwordInput.addEventListener('keyup', () => {
        const password = passwordInput.value;
        const feedbackMessage = document.getElementById('password-feedback');

        removeTextClasses(feedbackMessage);

        if(validatePasswordInput(password) === true) {
            feedbackMessage.innerHTML = "&zwnj;";
        }
        else {
            if(password !== "") {
                feedbackMessage.innerHTML = validatePasswordInput(password);
                feedbackMessage.classList.add('text-danger');
            }
            else {
                feedbackMessage.innerHTML = "&zwnj;";
            }
        }
    });

    repeatPasswordInput.addEventListener('keyup', () => {
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;
        const feedbackMessage = document.getElementById('repeat-password-feedback');

        removeTextClasses(feedbackMessage);

        if(passwordsMatch(password, repeatPassword)) {
            feedbackMessage.innerHTML = "&zwnj;";
        }
        else {
            if(repeatPassword === "") {
                feedbackMessage.innerHTML = "&zwnj;";
            }
            else {
                feedbackMessage.innerHTML = "Passwords do not match.";
                feedbackMessage.classList.add('text-danger');
            }
        }
    });
}

function removeTextClasses(feedbackMessage) {
    if(feedbackMessage.classList.contains('text-success')) {
        feedbackMessage.classList.remove('text-success');
    }
    if(feedbackMessage.classList.contains('text-danger')) {
        feedbackMessage.classList.remove('text-danger');
    }
}

function validateRegistrationForm() {
    validateUsername();
    validateEmail();
    validatePassword();

    const registrationForm = document.getElementById('registration-form');
    const registerButton = document.getElementById('register-btn');

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatedPassword = document.getElementById('repeat-password');

    registrationForm.addEventListener('input', () => {
        if(validateUsernameInput(username.value) && validatePasswordInput(password.value) && passwordsMatch(password.value, repeatedPassword.value)) {
            registerButton.disabled = false;
        }
        else {
            registerButton.disabled = true;
        }
    });
}
