<?php

use Illuminate\Support\Str;

return [

    'connections' => [
    
    'sqlsrv' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST', 'JKT-IT220\MSSQLSERVER01'),
        'database' => env('DB_DATABASE', 'InternalSupportSB'),
        'username' => env('DB_USERNAME', 'Renaldo'),
        'password' => env('DB_PASSWORD', 'katmai'),
        'port' => env('DB_PORT', '1433'),
        'charset' => 'utf8',
        'prefix' => '',
        'options'   => [
            //PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30 // Batas waktu query
            //PDO::ATTR_PERSISTENT => true
        ],
    ],
    
    'sqlsrv_194' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST_194'),
        'instance' => env('DB_INSTANCE'),
        'port' => env('DB_PORT_194'),
        'database' => env('DB_DATABASE_194'),
        'username' => env('DB_USERNAME_194'),
        'password' => env('DB_PASSWORD_194'),
        'charset' => 'utf8',
        'prefix' => '',
    ],

    'sqlsrv_196_1' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST_196_1'),
        'instance' => env('DB_INSTANCE_196_1'),
        'port' => env('DB_PORT_196_1'),
        'database' => env('DB_DATABASE_196_1'),
        'username' => env('DB_USERNAME_196_1'),
        'password' => env('DB_PASSWORD_196_1'),
        'charset' => 'utf8',
        'prefix' => '',
    ],

    'sqlsrv_195' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST_195'),
        'instance' => env('DB_INSTANCE_195'),
        'port' => env('DB_PORT_195'),
        'database' => env('DB_DATABASE_195'),
        'username' => env('DB_USERNAME_195'),
        'password' => env('DB_PASSWORD_195'),
        'charset' => 'utf8',
        'prefix' => '',
    ],

    'sqlsrv_196_2' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST_196_2'),
        'instance' => env('DB_INSTANCE_196_2'),
        'port' => env('DB_PORT_196_2'),
        'database' => env('DB_DATABASE_196_2'),
        'username' => env('DB_USERNAME_196_2'),
        'password' => env('DB_PASSWORD_196_2'),
        'charset' => 'utf8',
        'prefix' => '',
    ],

    'sqlsrv_199' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST_199'),
        'instance' => env('DB_INSTANCE_199'),
        'port' => env('DB_PORT_199'),
        'database' => env('DB_DATABASE_199'),
        'username' => env('DB_USERNAME_199'),
        'password' => env('DB_PASSWORD_199'),
        'charset' => 'utf8',
        'prefix' => '',
    ],

    'sqlsrv_58' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST_58'),
        'instance' => env('DB_INSTANCE_58'),
        'port' => env('DB_PORT_58'),
        'database' => env('DB_DATABASE_58'),
        'username' => env('DB_USERNAME_58'),
        'password' => env('DB_PASSWORD_58'),
        'charset' => 'utf8',
        'prefix' => '',
    ],

    'sqlsrv_58_2005' => [
        'driver' => 'sqlsrv',
        'host' => env('DB_HOST_58_2005'),
        'instance' => env('DB_INSTANCE_58_2005'),
        'port' => env('DB_PORT_58_2005'),
        'database' => env('DB_DATABASE_58_2005'),
        'username' => env('DB_USERNAME_58_2005'),
        'password' => env('DB_PASSWORD_58_2005'),
        'charset' => 'utf8',
        'prefix' => '',
    ],

],
];
