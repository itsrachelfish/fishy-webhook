<?php

require "config.php";

// A sample message being sent to fishy
$message = json_encode(array
(
    'command' => "message",
    'data' => "Hello, this is a message from PHP!"
));

echo "Generating hash...\n";

// The hashing algorithm you want to use
// Can be anything supported on your system, run `openssl list-message-digest-algorithms` to see what's available
$algo = 'sha512';

// Generate a HMAC hash to verify the message being sent
$hash = hash_hmac($algo, $message, WEBHOOK_PASSWORD);

$data = array
(
    'hash' => $algo . '=' . $hash,
    'payload' => $message
);

echo "Sending data...\n";

// Send data to the url provided in the config file
file_get_contents(WEBHOOK_URL . '?' . http_build_query($data));

echo "Webhook delivered!\n";

?>
