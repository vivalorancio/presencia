<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\UserSelfRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(AuthorizeAdminRequest $request)
    {
        $users = User::paginate(25);
        return UserResource::collection($users);
    }

    public function store(UserStoreRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        return User::create($validated);
    }

    public function show(UserSelfRequest $request, $id)
    {
        return User::findOrFail($id);
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        $user = User::findOrFail($id);
        $user->update($validated);
        $user->save();
        return $user;
    }


    public function destroy(AuthorizeAdminRequest $request, $id)
    {
        User::findOrFail($id)->delete();
    }
}
