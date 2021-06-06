<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Employee::factory(50)->create();

        // Usuari administrador sense empleat.
        DB::table('users')->insert([
            'username' => 'service',
            'password' => Hash::make('Pr3s3nc14S3rv1c3!'),
            'employee_id' => null,
            'is_admin' => true,
            'is_blocked' => false

        ]);
        DB::table('users')->insert([
            'username' => 'a',
            'password' => Hash::make('1'),
            'employee_id' => null,
            'is_admin' => true,
            'is_blocked' => false

        ]);
        DB::table('users')->insert([
            'username' => 'b',
            'password' => Hash::make('1'),
            'employee_id' => 1,
            'is_admin' => false,
            'is_blocked' => false

        ]);
        DB::table('users')->insert([
            'username' => 'c',
            'password' => Hash::make('1'),
            'employee_id' => 2,
            'is_admin' => true,
            'is_blocked' => false

        ]);
        DB::table('users')->insert([
            'username' => 'd',
            'password' => Hash::make('1'),
            'employee_id' => 3,
            'is_admin' => false,
            'is_blocked' => true

        ]);
    }
}
