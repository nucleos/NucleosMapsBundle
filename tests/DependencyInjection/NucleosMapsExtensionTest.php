<?php

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\Tests\DependencyInjection;

use Matthias\SymfonyDependencyInjectionTest\PhpUnit\AbstractExtensionTestCase;
use Nucleos\MapsBundle\Block\Service\MapBlockService;
use Nucleos\MapsBundle\DependencyInjection\NucleosMapsExtension;

class NucleosMapsExtensionTest extends AbstractExtensionTestCase
{
    public function testLoadDefault(): void
    {
        $this->setParameter('kernel.bundles', []);
        $this->load();

        $this->assertContainerBuilderHasService('nucleos_maps.block.map', MapBlockService::class);
    }

    protected function getContainerExtensions(): array
    {
        return [
            new NucleosMapsExtension(),
        ];
    }
}
