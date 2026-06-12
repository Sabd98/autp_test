<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user');

        return [
            'username' => 'required|string|max:100|unique:users,username,' . $userId,
            'name' => 'required|string|max:255',
            'password' => 'nullable|string|min:6|confirmed',
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
