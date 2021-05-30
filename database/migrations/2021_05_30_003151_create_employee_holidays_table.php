<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeeHolidaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_holidays', function (Blueprint $table) {
            $table->id();
            $table->date('day');
            $table->foreignId('employee_holiday_period_id')->constrained('employee_holiday_periods')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['day', 'employee_holiday_period_id'], 'unique_day_employee_holiday_period_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_holidays');
    }
}
