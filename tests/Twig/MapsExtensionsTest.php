<?php

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\Tests\Twig;

use Nucleos\MapsBundle\Twig\MapsExtensions;
use PHPUnit\Framework\TestCase;

final class MapsExtensionsTest extends TestCase
{
    private MapsExtensions $extension;

    protected function setUp(): void
    {
        $this->extension = new MapsExtensions();
    }

    public function testRenderGoogleMap(): void
    {
        static::assertSame(
            '<div
                    data-controller="nucleos--maps-bundle--googlemaps"
                    data-nucleos--maps-bundle--googlemaps-latitude-value="12"
                    data-nucleos--maps-bundle--googlemaps-longitude-value="23"
                    data-nucleos--maps-bundle--googlemaps-zoom-value="13"
                    data-nucleos--maps-bundle--googlemaps-height-value="200"
                    data-nucleos--maps-bundle--googlemaps-title-value=""
                    data-nucleos--maps-bundle--googlemaps-apikey-value=""
                    ></div>',
            $this->extension->renderGoogleMap(12, 23)
        );
    }

    public function testRenderGoogleMapWithOptapiKeyions(): void
    {
        static::assertSame(
            '<div
                    data-controller="mycontroller nucleos--maps-bundle--googlemaps"
                    data-nucleos--maps-bundle--googlemaps-latitude-value="12"
                    data-nucleos--maps-bundle--googlemaps-longitude-value="23"
                    data-nucleos--maps-bundle--googlemaps-zoom-value="5"
                    data-nucleos--maps-bundle--googlemaps-height-value="200"
                    data-nucleos--maps-bundle--googlemaps-title-value="Some title"
                    data-nucleos--maps-bundle--googlemaps-apikey-value="MY_KEY"
                    class="myclass"></div>',
            $this->extension->renderGoogleMap(
                12,
                23,
                [
                    'height'     => 200,
                    'title'      => 'Some title',
                    'zoom'       => 5,
                    'controller' => 'mycontroller',
                    'apiKey'     => 'MY_KEY',
                    'attr'       => [
                        'class' => 'myclass',
                    ],
                ]
            )
        );
    }

    public function testRenderOpenStreetMap(): void
    {
        static::assertSame(
            '<div
                    data-controller="nucleos--maps-bundle--openstreetmap"
                    data-nucleos--maps-bundle--openstreetmap-latitude-value="12"
                    data-nucleos--maps-bundle--openstreetmap-longitude-value="23"
                    data-nucleos--maps-bundle--openstreetmap-zoom-value="13"
                    data-nucleos--maps-bundle--openstreetmap-height-value="200"
                    data-nucleos--maps-bundle--openstreetmap-title-value=""
                    ></div>',
            $this->extension->renderOpenStreetMap(12, 23)
        );
    }

    public function testRenderOpenStreetMapWithOptions(): void
    {
        static::assertSame(
            '<div
                    data-controller="mycontroller nucleos--maps-bundle--openstreetmap"
                    data-nucleos--maps-bundle--openstreetmap-latitude-value="12"
                    data-nucleos--maps-bundle--openstreetmap-longitude-value="23"
                    data-nucleos--maps-bundle--openstreetmap-zoom-value="5"
                    data-nucleos--maps-bundle--openstreetmap-height-value="200"
                    data-nucleos--maps-bundle--openstreetmap-title-value="Some title"
                    class="myclass"></div>',
            $this->extension->renderOpenStreetMap(
                12,
                23,
                [
                    'height'     => 200,
                    'title'      => 'Some title',
                    'zoom'       => 5,
                    'controller' => 'mycontroller',
                    'attr'       => [
                        'class' => 'myclass',
                    ],
                ]
            )
        );
    }
}
