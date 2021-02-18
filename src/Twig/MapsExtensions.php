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
                    data-controller="'.trim(($options['controller'] ?? '').' nucleos--maps-bundle--googlemaps').'"
                    data-nucleos--maps-bundle--googlemaps-latitude-value="'.$latitude.'"
                    data-nucleos--maps-bundle--googlemaps-longitude-value="'.$longitude.'"
                    data-nucleos--maps-bundle--googlemaps-zoom-value="'.$options['zoom'].'"
                    data-nucleos--maps-bundle--googlemaps-height-value="'.$options['height'].'"
                    data-nucleos--maps-bundle--googlemaps-title-value="'.$options['title'].'"
                    data-nucleos--maps-bundle--googlemaps-apikey-value="'.$options['apiKey'].'"
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
                    data-controller="'.trim(($options['controller'] ?? '').' nucleos--maps-bundle--openstreetmap').'"
                    data-nucleos--maps-bundle--openstreetmap-latitude-value="'.$latitude.'"
                    data-nucleos--maps-bundle--openstreetmap-longitude-value="'.$longitude.'"
                    data-nucleos--maps-bundle--openstreetmap-zoom-value="'.$options['zoom'].'"
                    data-nucleos--maps-bundle--openstreetmap-height-value="'.$options['height'].'"
                    data-nucleos--maps-bundle--openstreetmap-title-value="'.$options['title'].'"
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
