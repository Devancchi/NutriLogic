<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Posyandu;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posyandu = Posyandu::first();

        // Admin (opsional)
        User::create([
            'name'     => 'Admin NutriLogic',
            'email'    => 'a@a.com',
            'password' => Hash::make('a'),
            'role'     => 'admin',
        ]);

        // Kader
        User::create([
            'name'        => 'Kader Siti',
            'email'       => 'b@b.com',
            'password'    => Hash::make('b'),
            'role'        => 'kader',
            'posyandu_id' => $posyandu->id,
        ]);

        // Ibu
        User::create([
            'name'     => 'Ibu Ani',
            'email'    => 'c@c.com',
            'password' => Hash::make('c'),
            'role'     => 'ibu',
        ]);
    }
}
