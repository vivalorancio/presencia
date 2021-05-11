<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id'); //Eliminar marcatges si eliminem empleat??? ->constrained('employees')->onDelete('cascade');
            $table->date('date');
            $table->time('time');
            $table->foreignId('incidence_id')->nullable();
            $table->foreignId('user_id')->nullable(); //Eliminar marcatges si eliminem user??? ->constrained('employees')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['employee_id', 'date', 'time'], 'unique_employee_id_date_time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
