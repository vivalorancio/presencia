<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'username' => $this->faker->name,
            'password' => '$2y$10$6bkIyqJnSj2XIcodRs/7DO5ldl4C7evbvMRYZyWkcUT0P1FnXAakO', // 1
            'employee_id' => null,
            'is_admin' => false
        ];
    }
}
