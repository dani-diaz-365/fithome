<?php
require_once '../config/cors.php';
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$nombre   = trim($data['nombre'] ?? '');
$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

// Validaciones
if (!$nombre || !$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos son obligatorios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email no válido']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['error' => 'La contraseña debe tener al menos 6 caracteres']);
    exit;
}

// Comprobar si el email ya existe
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['error' => 'El email ya está registrado']);
    exit;
}

// Guardar usuario
$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)');
$stmt->execute([$nombre, $email, $hash]);

http_response_code(201);
echo json_encode([
    'mensaje' => 'Usuario registrado correctamente',
    'id'      => $pdo->lastInsertId(),
    'nombre'  => $nombre,
    'email'   => $email,
    'plan'    => 'gratuito'
]);