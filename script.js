// Функція для перевірки, чи користувач увійшов у систему
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        document.getElementById('profileLink').style.display = 'inline';
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'none';
        document.getElementById('logout').style.display = 'inline';
    } else {
        document.getElementById('profileLink').style.display = 'none';
        document.getElementById('loginLink').style.display = 'inline';
        document.getElementById('registerLink').style.display = 'inline';
        document.getElementById('logout').style.display = 'none';
    }
}

// Виклик функції перевірки статусу входу при завантаженні сторінки
window.onload = function() {
    checkLoginStatus();

    // Якщо на сторінці профілю або завантаження відео
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('username')?.textContent = currentUser.username;

        // Відображення відео користувача (якщо є)
        let videos = JSON.parse(localStorage.getItem('videos')) || [];
        const userVideos = videos.filter(video => video.uploader === currentUser.username);

        const videoList = document.createElement('ul');
        userVideos.forEach(video => {
            const videoItem = document.createElement('li');
            videoItem.innerHTML = `
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <video width="320" height="240" controls>
                    <source src="${video.videoDataUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p>Uploaded on: ${video.uploadDate}</p>
            `;
            videoList.appendChild(videoItem);
        });

        document.getElementById('profile')?.appendChild(videoList);
    } else if (window.location.pathname.includes('profile.html') || window.location.pathname.includes('upload_video.html')) {
        window.location.href = 'https://stasan-minecraft.github.io/netflip.github.io/login.html';
    }
};

// Вихід з системи
document.getElementById('logout')?.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'https://stasan-minecraft.github.io/netflip.github.io/login.html';
});
