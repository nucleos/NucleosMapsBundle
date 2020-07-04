<?php

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use Nucleos\MapsBundle\Block\Service\MapBlockService;
use Symfony\Component\DependencyInjection\Reference;

return static function (ContainerConfigurator $container): void {
    $container->services()

        ->set('nucleos_maps.block.map', MapBlockService::class)
            ->tag('sonata.block')
            ->args([
                new Reference('twig'),
                new Reference('nucleos_maps.geocoder'),
            ])
            ->call('setLogger', [
                new Reference('logger'),
            ])

    ;
};
