<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Код для перевірки даних користувача в базі даних Excel
    // Наприклад, за допомогою бібліотеки PHPExcel або аналогічної

    // Якщо дані вірні, перенаправлення на profile.html
    echo "Login successful!";
}
?>
