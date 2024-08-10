<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $videoFile = $_FILES['video-file'];

    // Код для збереження відео та інформації в базі даних Excel
    // Наприклад, за допомогою бібліотеки PHPExcel або аналогічної

    echo "Video uploaded successfully!";
}
?>
