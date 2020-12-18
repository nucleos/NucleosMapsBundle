<?php

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

final class MapsExtensions extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('nucleos_maps_googlemap', [$this, 'renderGoogleMap'], ['is_safe' => ['html']]),
            new TwigFunction('nucleos_maps_openstreetmap', [$this, 'renderOpenStreetMap'], ['is_safe' => ['html']]),
        ];
    }

    /**
     * @param float|string         $latitude
     * @param float|string         $longitude
     * @param array<string, mixed> $options
     *
     * @phpstan-param array{height?: int, title?: string, zoom?: int, controller?: string, apiKey?: string, attr?: array<string, mixed>} $options
     */
    public function renderGoogleMap($latitude, $longitude, array $options = []): string
    {
        $options = array_merge([
            'height'     => 200,
            'title'      => '',
            'zoom'       => 13,
            'controller' => '',
            'apiKey'     => (string) ($_ENV['GOOGLE_API_KEY'] ?? ''),
            'attr'       => [],
        ], $options);

        return '<div
                    data-controller="'.trim($options['controller'].' @nucleos/maps-bundle/googlemaps').'"
                    data-googlemaps-latitude="'.$latitude.'"
                    data-googlemaps-longitude="'.$longitude.'"
                    data-googlemaps-zoom="'.$options['zoom'].'"
                    data-googlemaps-height="'.$options['height'].'"
                    data-googlemaps-title="'.$options['title'].'"
                    data-googlemaps-apikey="'.$options['apiKey'].'"
                    '.$this->extractAttributes($options['attr']).'></div>';
    }

    /**
     * @param float|string         $latitude
     * @param float|string         $longitude
     * @param array<string, mixed> $options
     *
     * @phpstan-param array{height?: int, title?: string, zoom?: int, controller?: string, attr?: array<string, mixed>} $options
     */
    public function renderOpenStreetMap($latitude, $longitude, array $options = []): string
    {
        $options = array_merge([
            'height'     => 200,
            'title'      => '',
            'zoom'       => 13,
            'controller' => '',
            'attr'       => [],
        ], $options);

        return '<div
                    data-controller="'.trim($options['controller'].' @nucleos/maps-bundle/openstreetmap').'"
                    data-openstreetmap-latitude="'.$latitude.'"
                    data-openstreetmap-longitude="'.$longitude.'"
                    data-openstreetmap-zoom="'.$options['zoom'].'"
                    data-openstreetmap-height="'.$options['height'].'"
                    data-openstreetmap-title="'.$options['title'].'"
                    '.$this->extractAttributes($options['attr']).'></div>';
    }

    /**
     * @param array<string, mixed> $attributes
     *
     * @SuppressWarnings(PHPMD.CyclomaticComplexity)
     */
    private function extractAttributes(array $attributes = []): string
    {
        $html = '';

        foreach ($attributes as $name => $value) {
            if ('data-controller' === $name) {
                continue;
            }

            if (true === $value) {
                $html .= $name.'="'.$name.'" ';
            } elseif (false !== $value) {
                $html .= $name.'="'.(string) $value.'" ';
            }
        }

        return trim($html);
    }
}
