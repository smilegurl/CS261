
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const modalContent = document.getElementById('modalContent');

    // Clear any previous error messages
    loginErrorMessage.innerHTML = '';

    // Check if fields are empty
    if (username === '' || password === '') {
        loginErrorMessage.innerHTML = 'Please fill out all fields!';
        return;
    }

    // Send data to API
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Application-Key': 'TU9b67283c8256e557176b8d22a6c78aad94657a874f06e5353f152d946163d7b1ef51cb0811a249138d5cfe0186923414',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            // Success - show modal with data
            modalContent.innerHTML = `
                <p>Message: ${data.message}</p>
                <p>Username: ${data.username}</p>
                <p>Display Name (TH): ${data.displayname_th}</p>
                <p>Display Name (EN): ${data.displayname_en}</p>
                <p>Email: ${data.email}</p>
                <p>Department: ${data.department}</p>
                <p>Faculty: ${data.faculty}</p>
            `;
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
        } else {
            // Failure - show error message
            loginErrorMessage.innerHTML = 'Password or Username Invalid!';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loginErrorMessage.innerHTML = 'Error connecting to server. Please try again later.';
    });
});
