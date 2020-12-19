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
use Nucleos\MapsBundle\Twig\MapsExtensions;

class NucleosMapsExtensionTest extends AbstractExtensionTestCase
{
    public function testLoadDefault(): void
    {
        $this->setParameter('kernel.bundles', []);
        $this->load([
            'geocoder' => [
                'service' => 'some_service',
            ],
        ]);

        $this->assertContainerBuilderHasService('nucleos_maps.block.map', MapBlockService::class);
        $this->assertContainerBuilderHasService(MapsExtensions::class);
    }

    protected function getContainerExtensions(): array
    {
        return [
            new NucleosMapsExtension(),
        ];
    }
}
