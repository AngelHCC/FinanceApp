
// API Base URL
const apiBaseUrl = 'http://localhost:3000';

// Register User
function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(apiBaseUrl + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Registration failed');
        if (data.message === 'User registered successfully') {
            window.location.href = 'index.html'; // Redirect to login page after registration
        }
    });
}

// Login User
function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(apiBaseUrl + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            window.location.href = 'dashboard.html'; // Navigate to dashboard on successful login
        } else {
            alert('Invalid credentials');
        }
    });
}
