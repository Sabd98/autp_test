<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function profile(): JsonResponse
    {
        try {
            $user = Auth::guard('api')->user();
            return $this->successResponse(new UserResource($user), 'Profile retrieved');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to fetch profile', 500);
        }
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        try {
            $user = Auth::guard('api')->user();
            $data = $request->validated();
            $updatedUser = $this->userService->updateProfile($user, $data);
            return $this->successResponse(new UserResource($updatedUser), 'Profile updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update profile', 500);
        }
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        try {
            $user = Auth::guard('api')->user();
            $this->userService->resetPassword(
                $user,
                $request->validated('currentPassword'),
                $request->validated('newPassword')
            );
            return $this->successResponse(null, 'Password reset successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->errorResponse($e->getMessage(), 422);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to reset password', 500);
        }
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $filters = [
                'search' => $request->query('search'),
                'page' => (int) $request->query('page', 1),
                'pageSize' => (int) $request->query('pageSize', 10),
            ];

            $result = $this->userService->getAll($filters);

            return response()->json([
                'data' => UserResource::collection($result['data']),
                'meta' => $result['meta'],
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to fetch users', 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $user = $this->userService->findById($id);
            return $this->successResponse(new UserResource($user));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException) {
            return $this->notFoundResponse('User not found');
        }
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $user = $this->userService->create($data);
            return $this->createdResponse(new UserResource($user), 'User created successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create user', 500);
        }
    }

    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        try {
            $user = $this->userService->findById($id);
            $data = $request->validated();
            $updatedUser = $this->userService->update($user, $data);
            return $this->successResponse(new UserResource($updatedUser), 'User updated successfully');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException) {
            return $this->notFoundResponse('User not found');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update user', 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $user = $this->userService->findById($id);
            $this->userService->delete($user);
            return $this->noContentResponse();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException) {
            return $this->notFoundResponse('User not found');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete user', 500);
        }
    }
}
