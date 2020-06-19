MapsBundle
==============
[![Latest Stable Version](https://poser.pugx.org/nucleos/maps-bundle/v/stable)](https://packagist.org/packages/nucleos/maps-bundle)
[![Latest Unstable Version](https://poser.pugx.org/nucleos/maps-bundle/v/unstable)](https://packagist.org/packages/nucleos/maps-bundle)
[![License](https://poser.pugx.org/nucleos/maps-bundle/license)](LICENSE.md)

[![Total Downloads](https://poser.pugx.org/nucleos/maps-bundle/downloads)](https://packagist.org/packages/nucleos/maps-bundle)
[![Monthly Downloads](https://poser.pugx.org/nucleos/maps-bundle/d/monthly)](https://packagist.org/packages/nucleos/maps-bundle)
[![Daily Downloads](https://poser.pugx.org/nucleos/maps-bundle/d/daily)](https://packagist.org/packages/nucleos/maps-bundle)

[![Continuous Integration](https://github.com/nucleos/NucleosMapsBundle/workflows/Continuous%20Integration/badge.svg)](https://github.com/nucleos/NucleosMapsBundle/actions)
[![Code Coverage](https://codecov.io/gh/nucleos/NucleosMapsBundle/branch/main/graph/badge.svg)](https://codecov.io/gh/nucleos/NucleosMapsBundle)

This bundle provides simple map rendering in symfony application.

## Installation

Open a command console, enter your project directory and execute the following command to download the latest stable version of this bundle:

```
composer require nucleos/maps-bundle
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

### Assets

It is recommended to use [webpack](https://webpack.js.org/) / [webpack-encore](https://github.com/symfony/webpack-encore)
to include the `widget.js` file in your page. These file is located in the `assets` folder.

## Usage

```twig
{# template.twig #}

{{ sonata_block_render({ 'type': 'nucleos_maps.block.map' }, {
    'address': 'Hamburg',
    'service': 'openstreetmap'
}) }}
```

## License

This bundle is under the [MIT license](LICENSE.md).
