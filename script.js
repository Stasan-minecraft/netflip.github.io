// Завантаження відео в Local Storage
function addSampleVideos() {
    let videos = [
        {
            title: "Sample Video 1",
            description: "This is a sample video description.",
            videoDataUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            uploadDate: new Date().toLocaleString()
        },
        {
            title: "Sample Video 2",
            description: "This is another sample video description.",
            videoDataUrl: "https://www.w3schools.com/html/movie.mp4",
            uploadDate: new Date().toLocaleString()
        }
    ];

    localStorage.setItem('videos', JSON.stringify(videos));
}

// Відображення відео на сторінці
function displayVideos() {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    
    const videoList = document.getElementById('video-list');
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
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
}

// Перевірка наявності відео у Local Storage, якщо немає, додати приклади
if (!localStorage.getItem('videos')) {
    addSampleVideos();
}

// Відображення відео на сторінці при завантаженні
window.onload = function() {
    displayVideos();
};
