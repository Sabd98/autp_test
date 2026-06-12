<?php

namespace App\Http\OpenAPI;

/**
 * @OA\Info(
 *     title="Portal AUTP API",
 *     version="1.0.0",
 *     description="REST API untuk sistem manajemen klaim asuransi padi Jasindo",
 *     contact={"name": "Sabda Avicenna", "email": "sabdaavicenna@fmri-research.com"}
 * )
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="Local API Server"
 * )
 * @OA\SecurityScheme(
 *     type="http",
 *     description="Login with username and password to get the authentication token",
 *     name="Token based based security",
 *     in="header",
 *     scheme="bearer",
 *     securityScheme="api_key",
 * )
 */
class OpenAPI
{
}
