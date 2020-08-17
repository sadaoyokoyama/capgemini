<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Account;
use Faker\Generator as Faker;

$factory->define(Account::class, function (Faker $faker) {
    return [
        'number' => $faker->unique()->numerify('#####'),
        'password' => '$2y$10$qLU1Y7iU3xuzDFyZY/EY9uFYney2J9VZP7uOf4ZS7uMBxbSHypIH6'
    ];
});
