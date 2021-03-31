<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('username', 'password'))) {
            return response(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        if ($user->is_blocked) {
            return response(['message' => 'Blocked user'], Response::HTTP_UNAUTHORIZED);
        }

        $token =  $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token, 60 * 24);
        return response($user)->withCookie($cookie);
    }

    public function user()
    {
        return Auth::user();
    }

    public function logout(Request $request)
    {
        $cookie = Cookie::forget('jwt');

        return response(['message' => 'success'])->withCookie($cookie);
    }
}
