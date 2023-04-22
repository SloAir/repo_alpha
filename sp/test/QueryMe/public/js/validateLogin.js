function usernameExists(username) {
    const usernameInput = document.getElementById('username');

    usernameInput.onblur = () => {
        const username = usernameInput.value;
        const feedbackMessage = document.getElementById('username-feedback');

        $.ajax({
            type: 'POST',
            url: '/users/validate_username',
            data: { username: username },
            success: (res) => {
                console.log(username);
                if(username !== "") {
                    if(!res.exists) {
                        feedbackMessage.innerHTML = "Username does not exist.";
                        feedbackMessage.classList.add('text-danger');
                    }
                    else {
                        feedbackMessage.innerHTML = "&zwnj;";
                    }
                }
                else {
                    feedbackMessage.innerHTML = "&zwnj;";
                }
            }
        });
    }
}

function validateLogin() {
    const username = document.getElementById('username');
    usernameExists(username.value);
}