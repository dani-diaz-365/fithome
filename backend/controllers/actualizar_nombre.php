<?php
require_once '../config/cors.php';
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$data   = json_decode(file_get_contents('php://input'), true);
$id     = intval($data['id']    ?? 0);
$nombre = trim($data['nombre'] ?? '');

if (!$id || !$nombre) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incorrectos']);
    exit;
}

$stmt = $pdo->prepare('UPDATE usuarios SET nombre = ? WHERE id = ?');
$stmt->execute([$nombre, $id]);

echo json_encode(['mensaje' => 'Nombre actualizado correctamente', 'nombre' => $nombre]);
?>