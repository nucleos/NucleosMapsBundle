<?php

declare(strict_types=1);

/*
 * (c) Christian Gripp <mail@core23.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nucleos\MapsBundle\Tests\Block;

use Nucleos\MapsBundle\Tests\App\AppKernel;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;

final class BundleIntegrationTest extends TestCase
{
    public function testStartup(): void
    {
        $client = new KernelBrowser(new AppKernel());

        $client->request('GET', '/test');

        static::assertSame(200, $client->getResponse()->getStatusCode());
    }
}
