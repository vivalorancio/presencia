<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShiftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->string('code', 3)->unique();
            $table->string('description');
            $table->string('colour');
            $table->time('start_time');
            $table->time('end_time');
            $table->time('expected_time');
            $table->time('recess_time')->nullable();
            $table->boolean('is_holiday')->default(false);
            //$table->time('grace_time')->nullable();
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
        Schema::dropIfExists('shifts');
    }
}
