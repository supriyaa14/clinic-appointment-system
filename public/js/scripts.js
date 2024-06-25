document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signupBtn');
    const signupModal = document.getElementById('signupModal');
    const closeModal = document.getElementsByClassName('close-btn')[0];
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    signupBtn.onclick = function() {
        signupModal.style.display = 'block';
    }

    closeModal.onclick = function() {
        signupModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    }

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(signupForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            alert('Signup successful. Check your email for the default password.');
            signupModal.style.display = 'none';
        } else {
            alert('Signup failed. Please try again.');
        }
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            localStorage.setItem('token', result.token);
            window.location.href = '/home.html';
        } else {
            alert('Login failed. Please check your credentials.');
        }
    });
});
