// Залишаємо попередні функції реєстрації, входу та виходу

// Завантаження відео
document.getElementById('uploadForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const videoFile = document.getElementById('video-file').files[0];

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('You need to log in to upload a video.');
        return;
    }

    // Зчитуємо файл відео як Data URL
    const reader = new FileReader();
    reader.onloadend = function() {
        const videoDataUrl = reader.result;

        let videos = JSON.parse(localStorage.getItem('videos')) || [];

        const video = {
            title: title,
            description: description,
            videoDataUrl: videoDataUrl,
            uploader: currentUser.username,
            uploadDate: new Date().toLocaleString()
        };

        videos.push(video);
        localStorage.setItem('videos', JSON.stringify(videos));

        alert('Video uploaded successfully!');
        window.location.href = 'profile.html';
    };

    reader.readAsDataURL(videoFile);
});

// Відображення відео в профілі
window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('username')?.textContent = currentUser.username;

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
        window.location.href = 'login.html';
    }
};

// Вихід з системи
document.getElementById('logout')?.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});
