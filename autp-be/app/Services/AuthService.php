<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function login(string $username, string $password): array
    {
        $user = User::where('username', $username)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            throw new \Exception('Invalid credentials');
        }

        $token = Auth::guard('api')->login($user);

        return [
            'token' => $token,
            'user' => [
                'name' => $user->name,
            ],
        ];
    }

    public function logout(): void
    {
        Auth::guard('api')->logout();
    }
}
