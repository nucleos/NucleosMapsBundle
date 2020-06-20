<?php

declare(strict_types=1);

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

final class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('nucleos_maps');

        $rootNode = $treeBuilder->getRootNode();

        \assert($rootNode instanceof ArrayNodeDefinition);

        $rootNode->append($this->getGeocoderNode());

        return $treeBuilder;
    }

    private function getGeocoderNode(): ArrayNodeDefinition
    {
        $node = (new TreeBuilder('geocoder'))->getRootNode();

        $node
            ->isRequired()
            ->children()
                ->scalarNode('service')->isRequired()->cannotBeEmpty()->end()
            ->end()
        ;

        return $node;
    }
}
