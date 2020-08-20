NucleosMapsBundle
=================
[![Latest Stable Version](https://poser.pugx.org/nucleos/maps-bundle/v/stable)](https://packagist.org/packages/nucleos/maps-bundle)
[![Latest Unstable Version](https://poser.pugx.org/nucleos/maps-bundle/v/unstable)](https://packagist.org/packages/nucleos/maps-bundle)
[![License](https://poser.pugx.org/nucleos/maps-bundle/license)](LICENSE.md)

[![Total Downloads](https://poser.pugx.org/nucleos/maps-bundle/downloads)](https://packagist.org/packages/nucleos/maps-bundle)
[![Monthly Downloads](https://poser.pugx.org/nucleos/maps-bundle/d/monthly)](https://packagist.org/packages/nucleos/maps-bundle)
[![Daily Downloads](https://poser.pugx.org/nucleos/maps-bundle/d/daily)](https://packagist.org/packages/nucleos/maps-bundle)

[![Continuous Integration](https://github.com/nucleos/NucleosMapsBundle/workflows/Continuous%20Integration/badge.svg)](https://github.com/nucleos/NucleosMapsBundle/actions)
[![Code Coverage](https://codecov.io/gh/nucleos/NucleosMapsBundle/branch/main/graph/badge.svg)](https://codecov.io/gh/nucleos/NucleosMapsBundle)
[![Type Coverage](https://shepherd.dev/github/nucleos/maps-bundle/coverage.svg)](https://shepherd.dev/github/nucleos/maps-bundle)

This bundle provides simple map rendering in symfony application.

## Installation

Open a command console, enter your project directory and execute the following command to download the latest stable version of this bundle:

```
composer require nucleos/maps-bundle

composer require geocoder-php/nominatim-provider # if you want OpenStreetMaps Geocoder
```

### Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles in `config/bundles.php` file of your project:

```php
// config/bundles.php

return [
    // ...
    Nucleos\MapsBundle\NucleosMapsBundle::class => ['all' => true],
];
```

### Configure the Bundle

Create a configuration file called `nucleos_maps.yaml` and define geocoders:

```yaml
# config/packages/nucleos_maps.yaml

bazinga_geocoder:
  providers:
    nominatim:
        factory: Bazinga\GeocoderBundle\ProviderFactory\NominatimFactory
        cache: 'cache.geocoder' # PSR16 Cache pool
        cache_lifetime: 3600
        cache_precision: 4

nucleos_maps:
    geocoder:
        service: 'bazinga_geocoder.provider.nominatim'
```

## Usage

If you want dynamic address resultion:

```twig
{# template.twig #}

{{ sonata_block_render({ 'type': 'nucleos_maps.block.map' }, {
    'address': 'Hamburg',
    'service': 'openstreetmap'
}) }}
```

If you know the exact coordinates:

```twig
{# template.twig #}

{{ sonata_block_render({ 'type': 'nucleos_maps.block.map' }, {
    'longitude': '9.993682',
    'latitude': '53.551086',
    'service': 'openstreetmap'
}) }}
```

### Assets

It is recommended to use [webpack](https://webpack.js.org/) / [webpack-encore](https://github.com/symfony/webpack-encore)
to include the `widget.js` file in your page. These file is located in the `assets` folder.

## License

This bundle is under the [MIT license](LICENSE.md).
