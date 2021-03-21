<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return User::create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password')),
            'employee_id' => $request->input('employee_id'),
            'is_blocked' => $request->input('is_blocked') ?: false,
            'is_admin' => $request->input('is_admin') ?: false,
        ]);
    }

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

        $cookie = cookie('jwt', $token, 2);
        return response(['message' => 'success'])->withCookie($cookie);
    }

    public function user()
    {
        $user = Auth::user();

        $employee = Employee::find($user->employee_id);

        return ['user' => $user, 'employee' => $employee];
    }

    public function logout(Request $request)
    {
        $cookie = Cookie::forget('jwt');

        return response(['message' => 'success'])->withCookie($cookie);
    }
}
