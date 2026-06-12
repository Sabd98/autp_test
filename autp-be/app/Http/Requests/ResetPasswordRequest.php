<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'currentPassword' => 'required|string|min:6',
            'newPassword' => 'required|string|min:6|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'currentPassword.required' => 'Current password is required',
            'newPassword.required' => 'New password is required',
            'newPassword.min' => 'New password must be at least 6 characters',
            'newPassword.confirmed' => 'Password confirmation does not match',
        ];
    }
}
