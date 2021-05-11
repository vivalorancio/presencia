<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalendarShiftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendar_shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calendar_id')->constrained('calendars')->onDelete('cascade');
            $table->integer('day');
            $table->foreignId('shift_id')->constrained('shifts')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['calendar_id', 'day', 'shift_id'], 'unique_calendar_id_day_shift_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('calendar_shifts');
    }
}
