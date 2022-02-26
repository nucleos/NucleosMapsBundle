<?php

declare(strict_types=1);

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$files = array_filter([
    __DIR__.'/autoload.php',
    __DIR__.'/autoload.php.dist',
], 'file_exists');
if ([] !== $files) {
    require_once current($files);
}

// try to get Symfony's PHPunit Bridge
$files = array_filter([
    __DIR__.'/../vendor/symfony/symfony/src/Symfony/Bridge/PhpUnit/bootstrap.php',
    __DIR__.'/../vendor/symfony/phpunit-bridge/bootstrap.php',
    __DIR__.'/../../../../vendor/symfony/symfony/src/Symfony/Bridge/PhpUnit/bootstrap.php',
    __DIR__.'/../../../../vendor/symfony/phpunit-bridge/bootstrap.php',
], 'file_exists');
if ([] !== $files) {
    require_once current($files);
}
