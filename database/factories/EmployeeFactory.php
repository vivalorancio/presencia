<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName . ' ' . $this->faker->lastName,
            'code' => $this->faker->randomNumber(8, true),
            'national_id' => strtoupper($this->faker->randomNumber(8, true) . $this->faker->randomLetter),
            'email' => $this->faker->email,
            'start_date' => $this->faker->date('Y-m-d', 'now'),
            'end_date' => null,
            'supervision_group_id' => null,
            'shift_id' => null
        ];
    }
}
