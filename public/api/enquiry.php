<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// The address that receives enquiries. Set this before deploying.
$TO = 'CHANGE_ME@yourdomain.com';
const MAX_PER_WINDOW = 3;
const WINDOW_SECONDS = 600;
const INTERESTS = ['buy' => 'Buying a home', 'landowner' => 'I own a plot', 'commercial' => 'Commercial space'];

function respond(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

function clean(mixed $value, int $max): string {
    $s = preg_replace('/[\r\n]+/', ' ', (string) $value) ?? '';
    return mb_substr(trim($s), 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

// Honeypot: real visitors never fill this field.
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/ssg_rl_' . md5($ip);
$now = time();
$hits = is_file($rateFile) ? array_map('intval', file($rateFile, FILE_IGNORE_NEW_LINES) ?: []) : [];
$hits = array_values(array_filter($hits, fn (int $t): bool => $now - $t < WINDOW_SECONDS));
if (count($hits) >= MAX_PER_WINDOW) {
    respond(429, ['ok' => false, 'error' => 'Too many enquiries. Please try again in a few minutes.']);
}

$name = clean($data['name'] ?? '', 80);
$phone = clean($data['phone'] ?? '', 20);
$interest = clean($data['interest'] ?? '', 20);
$message = mb_substr(trim((string) ($data['message'] ?? '')), 0, 2000);
$plot = clean($data['plot'] ?? '', 300);
$project = clean($data['project'] ?? '', 100);

if (mb_strlen($name) < 2) respond(422, ['ok' => false, 'error' => 'Please enter your name.']);
if (!preg_match('/^[0-9+\-\s()]{7,20}$/', $phone)) respond(422, ['ok' => false, 'error' => 'Please enter a valid phone number.']);
if (!array_key_exists($interest, INTERESTS)) respond(422, ['ok' => false, 'error' => 'Please choose what you are enquiring about.']);
if (mb_strlen($message) < 5) respond(422, ['ok' => false, 'error' => 'Please write a short message.']);
if ($interest === 'landowner' && mb_strlen($plot) < 3) respond(422, ['ok' => false, 'error' => 'Please tell us about the plot.']);

$hits[] = $now;
file_put_contents($rateFile, implode("\n", $hits), LOCK_EX);

$subject = 'Website enquiry: ' . INTERESTS[$interest] . ($project !== '' ? " ($project)" : '');
$body = "Name: $name\nPhone: $phone\nInterest: " . INTERESTS[$interest] . "\n"
    . ($project !== '' ? "Project: $project\n" : '')
    . ($plot !== '' ? "Plot: $plot\n" : '')
    . "\nMessage:\n$message\n";

$host = preg_replace('/[^a-z0-9.\-]/i', '', preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'localhost') ?? 'localhost');
$headers = "From: SS Garden website <noreply@$host>\r\nContent-Type: text/plain; charset=utf-8";

$sent = getenv('SSG_DRY_RUN') ? true : mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'The message could not be sent.']);
}

respond(200, ['ok' => true]);
