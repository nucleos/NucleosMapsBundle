<?php

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\Tests\DependencyInjection;

use Nucleos\MapsBundle\DependencyInjection\Configuration;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Config\Definition\Processor;

final class ConfigurationTest extends TestCase
{
    public function testOptions(): void
    {
        $processor = new Processor();

        $config = $processor->processConfiguration(new Configuration(), [[
            'geocoder' => [
                'service' => 'some_service',
            ],
        ]]);

        $expected = [
            'geocoder' => [
                'service' => 'some_service',
            ],
        ];

        static::assertSame($expected, $config);
    }
}
