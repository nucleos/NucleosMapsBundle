<?php

declare(strict_types=1);

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\Tests\Block\Service;

use Geocoder\Location;
use Geocoder\Model\AddressCollection;
use Geocoder\Model\Coordinates;
use Geocoder\Provider\Provider;
use Nucleos\MapsBundle\Block\Service\MapBlockService;
use PHPUnit\Framework\MockObject\MockObject;
use Sonata\BlockBundle\Block\BlockContext;
use Sonata\BlockBundle\Model\Block;
use Sonata\BlockBundle\Test\BlockServiceTestCase;
use Symfony\Component\HttpFoundation\Response;

final class MapBlockServiceTest extends BlockServiceTestCase
{
    private MockObject&Provider $provider;

    protected function setUp(): void
    {
        parent::setUp();

        $this->provider          = $this->createMock(Provider::class);
    }

    public function testDefaultSettings(): void
    {
        $blockService = new MapBlockService($this->twig, $this->provider);
        $blockContext = $this->getBlockContext($blockService);

        $this->assertSettings([
            'title'              => null,
            'marker_title'       => null,
            'translation_domain' => null,
            'icon'               => 'fa fa-map-o',
            'class'              => null,
            'service'            => 'openstreetmap',
            'address'            => null,
            'longitude'          => null,
            'latitude'           => null,
            'height'             => 250,
            'template'           => '@NucleosMaps/Block/block_map.html.twig',
        ], $blockContext);
    }

    public function testExecute(): void
    {
        $location = $this->createMock(Location::class);
        $location->method('getCoordinates')
            ->willReturn(new Coordinates(0, 0))
        ;

        $this->provider->method('geocodeQuery')
            ->willReturn(new AddressCollection([
                $location,
            ]))
        ;

        $block = new Block();

        $blockContext = new BlockContext($block, [
            'title'              => null,
            'marker_title'       => null,
            'translation_domain' => null,
            'icon'               => 'fa fa-map-o',
            'class'              => null,
            'service'            => 'googlemaps',
            'address'            => 'Berlin',
            'longitude'          => null,
            'latitude'           => null,
            'height'             => 100,
            'template'           => '@NucleosMaps/Block/block_map.html.twig',
        ]);

        $response = new Response();

        $this->twig->expects(self::once())->method('render')
            ->with(
                '@NucleosMaps/Block/block_map.html.twig',
                [
                    'context'      => $blockContext,
                    'settings'     => $blockContext->getSettings(),
                    'block'        => $blockContext->getBlock(),
                    'coordinates'  => [0, 0],
                ]
            )
            ->willReturn('TWIG_CONTENT')
        ;

        $blockService = new MapBlockService($this->twig, $this->provider);

        self::assertSame($response, $blockService->execute($blockContext, $response));
        self::assertSame('TWIG_CONTENT', $response->getContent());
    }
}
