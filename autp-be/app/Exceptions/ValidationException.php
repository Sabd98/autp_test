<?php

namespace App\Exceptions;

use Exception;

class ValidationException extends Exception
{
    public function __construct(
        public array $errors = [],
        string $message = 'Validation failed',
        int $code = 422
    ) {
        parent::__construct($message, $code);
    }
}
