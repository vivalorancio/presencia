<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIncidencesGroupIncidencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incidences_group_incidences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('incidences_group_id')->onDelete('cascade');
            $table->foreignId('incidence_id')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['incidences_group_id', 'incidence_id'], 'unique_incidences_group_id_incidence_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incidences_group_incidences');
    }
}
