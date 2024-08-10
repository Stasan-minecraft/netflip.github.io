// Реєстрація користувача
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Перевірка, чи користувач вже існує
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already exists!');
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    window.location.href = 'login.html';
});

// Вхід користувача
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful!');
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'profile.html';
    } else {
        alert('Invalid username or password!');
    }
});

// Відображення профілю користувача
window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('username')?.textContent = currentUser.username;
    } else if (window.location.pathname.includes('profile.html') || window.location.pathname.includes('upload_video.html')) {
        window.location.href = 'login.html';
    }
};

// Вихід з системи
document.getElementById('logout')?.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});
