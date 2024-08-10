// Завантаження відео в Local Storage
function addSampleVideos() {
    let videos = [
        {
            title: "Sample Video 1",
            description: "This is a sample video description.",
            videoDataUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            coverDataUrl: "",
            uploadDate: new Date().toLocaleString()
        },
        {
            title: "Sample Video 2",
            description: "This is another sample video description.",
            videoDataUrl: "https://www.w3schools.com/html/movie.mp4",
            coverDataUrl: "",
            uploadDate: new Date().toLocaleString()
        }
    ];

    localStorage.setItem('videos', JSON.stringify(videos));
}

// Відображення відео на сторінці
function displayVideos() {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = ""; // Очищуємо перед відображенням

    videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            ${video.coverDataUrl ? `<img src="${video.coverDataUrl}" alt="${video.title} Cover" class="video-cover">` : ''}
            <video width="320" height="240" controls>
                <source src="${video.videoDataUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p>Uploaded on: ${video.uploadDate}</p>
            <button onclick="loadVideoForUpdate(${index})">Update</button>
        `;
        videoList.appendChild(videoItem);
    });
}

// Завантаження відео для оновлення
function loadVideoForUpdate(index) {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    const video = videos[index];

    document.getElementById('title').value = video.title;
    document.getElementById('description').value = video.description;

    // Зберігаємо індекс оновлюваного відео в локальній змінній
    localStorage.setItem('updateIndex', index);
}

// Оновлення відео
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const videoFile = document.getElementById('video-file').files[0];
    const coverFile = document.getElementById('cover-file').files[0];

    const updateIndex = localStorage.getItem('updateIndex');
    let videos = JSON.parse(localStorage.getItem('videos')) || [];

    const reader = new FileReader();
    reader.onloadend = function() {
        const videoDataUrl = videoFile ? reader.result : videos[updateIndex].videoDataUrl;

        const coverReader = new FileReader();
        coverReader.onloadend = function() {
            const coverDataUrl = coverFile ? coverReader.result : videos[updateIndex].coverDataUrl;

            videos[updateIndex] = {
                title: title,
                description: description,
                videoDataUrl: videoDataUrl,
                coverDataUrl: coverDataUrl,
                uploadDate: videos[updateIndex].uploadDate // Зберігаємо дату завантаження
            };

            localStorage.setItem('videos', JSON.stringify(videos));
            alert('Video updated successfully!');
            displayVideos();
        };

        if (coverFile) {
            coverReader.readAsDataURL(coverFile);
        } else {
            coverReader.onloadend();
        }
    };

    if (videoFile) {
        reader.readAsDataURL(videoFile);
    } else {
        reader.onloadend();
    }
});

// Перевірка наявності відео у Local Storage, якщо немає, додати приклади
if (!localStorage.getItem('videos')) {
    addSampleVideos();
}

// Відображення відео на сторінці при завантаженні
window.onload = function() {
    displayVideos();
};
