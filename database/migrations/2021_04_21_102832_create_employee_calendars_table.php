<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeeCalendarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_calendars', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
            $table->foreignId('employee_id')->onDelete('cascade');
            $table->foreignId('calendar_id')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['year', 'employee_id'], 'unique_year_employee_id');
            $table->unique(['employee_id', 'calendar_id'], 'unique_employee_id_calendar_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_calendars');
    }
}
