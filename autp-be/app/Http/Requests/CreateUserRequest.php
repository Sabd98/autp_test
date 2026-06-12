<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => 'required|string|max:100|unique:users,username',
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:6|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'username.unique' => 'Username already exists',
            'password.confirmed' => 'Password confirmation does not match',
        ];
    }
}
