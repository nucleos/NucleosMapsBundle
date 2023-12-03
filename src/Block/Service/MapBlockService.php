<?php

declare(strict_types=1);

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\Block\Service;

use Geocoder\Exception\Exception;
use Geocoder\Provider\Provider;
use Geocoder\Query\GeocodeQuery;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerInterface;
use Psr\Log\NullLogger;
use Sonata\BlockBundle\Block\BlockContextInterface;
use Sonata\BlockBundle\Block\Service\AbstractBlockService;
use Sonata\BlockBundle\Block\Service\EditableBlockService;
use Sonata\BlockBundle\Form\Mapper\FormMapper;
use Sonata\BlockBundle\Meta\Metadata;
use Sonata\BlockBundle\Meta\MetadataInterface;
use Sonata\BlockBundle\Model\BlockInterface;
use Sonata\Form\Type\ImmutableArrayType;
use Sonata\Form\Validator\ErrorElement;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Twig\Environment;

final class MapBlockService extends AbstractBlockService implements EditableBlockService, LoggerAwareInterface
{
    private LoggerInterface $logger;

    private Provider $provider;

    public function __construct(Environment $twig, Provider $provider)
    {
        parent::__construct($twig);

        $this->provider = $provider;
        $this->logger   = new NullLogger();
    }

    public function setLogger(LoggerInterface $logger): void
    {
        $this->logger = $logger;
    }

    public function execute(BlockContextInterface $blockContext, ?Response $response = null): Response
    {
        $coordinates = $this->getCoordinates($blockContext);

        if (null === $coordinates) {
            return new Response('', Response::HTTP_NO_CONTENT);
        }

        $parameters = [
            'context'     => $blockContext,
            'settings'    => $blockContext->getSettings(),
            'block'       => $blockContext->getBlock(),
            'coordinates' => $coordinates,
        ];

        return $this->renderResponse($blockContext->getTemplate(), $parameters, $response);
    }

    public function configureCreateForm(FormMapper $form, BlockInterface $block): void
    {
        $this->configureEditForm($form, $block);
    }

    /**
     * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
     */
    public function configureEditForm(FormMapper $form, BlockInterface $block): void
    {
        $form->add('settings', ImmutableArrayType::class, [
            'keys'               => [
                ['title', TextType::class, [
                    'required' => false,
                    'label'    => 'form.label_title',
                ]],
                ['marker_title', TextType::class, [
                    'required' => false,
                    'label'    => 'form.label_marker_title',
                ]],
                ['service', ChoiceType::class, [
                    'required'     => true,
                    'label'        => 'form.label_service',
                    'choices'      => [
                        'googlemaps'    => 'googlemaps',
                        'openstreetmap' => 'openstreetmap',
                    ],
                    'choice_label' => static function (string $value, string $key): string {
                        return 'service.'.$key;
                    },
                ]],
                ['translation_domain', TextType::class, [
                    'label'    => 'form.label_translation_domain',
                    'required' => false,
                ]],
                ['icon', TextType::class, [
                    'label'    => 'form.label_icon',
                    'required' => false,
                ]],
                ['class', TextType::class, [
                    'label'    => 'form.label_class',
                    'required' => false,
                ]],
                ['address', TextType::class, [
                    'label'    => 'form.label_address',
                    'required' => false,
                ]],
                ['longitude', TextType::class, [
                    'label'    => 'form.label_longitude',
                    'required' => false,
                ]],
                ['latitude', TextType::class, [
                    'label'    => 'form.label_latitude',
                    'required' => false,
                ]],
                ['height', IntegerType::class, [
                    'label'    => 'form.label_height',
                    'required' => true,
                ]],
            ],
            'translation_domain' => 'NucleosMapsBundle',
        ]);
    }

    public function configureSettings(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
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
        ]);
    }

    public function validate(ErrorElement $errorElement, BlockInterface $block): void {}

    public function getMetadata(): MetadataInterface
    {
        return new Metadata('nucleos_maps.block.map', null, null, 'NucleosMapsBundle', [
            'class' => 'fa fa-map-o',
        ]);
    }

    public function getName(): string
    {
        return $this->getMetadata()->getTitle();
    }

    /**
     * @return float[]|null
     *
     * @phpstan-return array{float, float}|null
     */
    private function getCoordinates(BlockContextInterface $blockContext): ?array
    {
        $longitude = $blockContext->getSetting('longitude');
        $latitude  = $blockContext->getSetting('latitude');

        if (null !== $longitude && null !== $latitude) {
            return [(float) $latitude, (float) $longitude];
        }

        $address = $blockContext->getSetting('address');

        if (!\is_string($address)) {
            return null;
        }

        return $this->fetchFromAddress($address);
    }

    /**
     * @return float[]|null
     *
     * @phpstan-return array{float, float}|null
     */
    private function fetchFromAddress(string $address): ?array
    {
        try {
            $geo         = $this->provider->geocodeQuery(GeocodeQuery::create($address))->first();
            $coordinates = $geo->getCoordinates();

            if (null === $coordinates) {
                return null;
            }

            return [$coordinates->getLatitude(), $coordinates->getLongitude()];
        } catch (Exception $e) {
            $this->logger->warning(sprintf('Error fetch geo information for %s', $address), [
                'exception' => $e,
            ]);
        }

        return null;
    }
}
