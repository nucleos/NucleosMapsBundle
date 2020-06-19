<?php

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\Tests;

use Nucleos\MapsBundle\DependencyInjection\NucleosMapsExtension;
use Nucleos\MapsBundle\NucleosMapsBundle;
use PHPUnit\Framework\TestCase;

final class NucleosMapsBundleTest extends TestCase
{
    public function testGetContainerExtension(): void
    {
        $bundle = new NucleosMapsBundle();

        static::assertInstanceOf(NucleosMapsExtension::class, $bundle->getContainerExtension());
    }
}
