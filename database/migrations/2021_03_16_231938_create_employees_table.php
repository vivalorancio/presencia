<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('code')->nullable()->unique();
            $table->string('national_id')->nullable()->unique();
            $table->string('email')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->foreignId('incidences_group_id')->nullable();
            $table->foreignId('supervision_group_id')->nullable();
            $table->foreignId('shift_id')->nullable();
            $table->foreignId('department_id')->nullable();
            $table->foreignId('area_id')->nullable();
            $table->foreignId('section_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
