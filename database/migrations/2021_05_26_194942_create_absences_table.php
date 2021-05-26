<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbsencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id'); //Eliminar absentisme si eliminem empleat??? ->constrained('employees')->onDelete('cascade');
            $table->date('date');
            $table->foreignId('incidence_id');
            $table->foreignId('user_id');
            $table->timestamps();

            $table->unique(['employee_id', 'date'], 'unique_employee_id_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('absences');
    }
}
