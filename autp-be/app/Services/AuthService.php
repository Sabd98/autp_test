<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function login(string $username, string $password): array
    {
        $user = User::findByUsername($username);

        if (!$user || !Hash::check($password, $user->password)) {
            throw new \InvalidArgumentException('Invalid credentials');
        }

        $token = Auth::guard('api')->login($user);

        return [
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
            ],
        ];
    }

    public function logout(): void
    {
        Auth::guard('api')->logout();
    }
}
