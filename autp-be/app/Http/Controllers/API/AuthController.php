<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private AuthService $authService) {}

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $data = $this->authService->login(
                $request->validated('username'),
                $request->validated('password')
            );
            return $this->successResponse($data, 'Login successful');
        } catch (\InvalidArgumentException $e) {
            return $this->errorResponse($e->getMessage(), 401);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred during login', 500);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $this->authService->logout();
            return $this->successResponse(null, 'Logged out successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Logout failed', 500);
        }
    }
}
