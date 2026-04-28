<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../config/cors.php';
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id   = intval($data['id']  ?? 0);
$plan = trim($data['plan'] ?? '');

$planesValidos = ['gratuito', 'premium', 'entrenador'];

if (!$id || !in_array($plan, $planesValidos)) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incorrectos']);
    exit;
}

$stmt = $pdo->prepare('UPDATE usuarios SET plan = ? WHERE id = ?');
$stmt->execute([$plan, $id]);

echo json_encode(['mensaje' => 'Plan actualizado correctamente', 'plan' => $plan]);
?>