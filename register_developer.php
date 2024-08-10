<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Код для збереження користувача в базі даних Excel
    // Наприклад, за допомогою бібліотеки PHPExcel або аналогічної

    echo "Registration successful!";
}
?>
