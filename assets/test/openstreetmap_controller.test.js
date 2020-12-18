'use strict';

import { Application, Controller } from 'stimulus';
import { getByTestId, waitFor } from '@testing-library/dom';
import { clearDOM, mountDOM } from '@symfony/stimulus-testing';
import OpenStreetMapController from '../src/openstreetmap_controller'; // Controller used to check the actual controller was properly booted

// Controller used to check the actual controller was properly booted
class CheckController extends Controller {
    connect() {
        this.element.addEventListener('openstreetmap:connect', () => {
            this.element.classList.add('connected');
        });
    }
}

const startStimulus = () => {
    const application = Application.start();
    application.register('check', CheckController);
    application.register('openstreetmap', OpenStreetMapController);
    return application;
};

describe('OpenStreetMapController', () => {
    let container;

    beforeEach(() => {
        container = mountDOM(`
            <span
                data-testid="container"
                data-controller="check openstreetmap"
                data-openstreetmap='{"title":"Some title","address":"Buxtehude, Germany", "center": { "longitude": 9.42, "latitude": 53.27 }}'>
            </div>
        `);
    });

    afterEach(() => {
        clearDOM();
    });

    it('connect', async () => {
        expect(getByTestId(container, 'container')).not.toHaveClass('connected');

        startStimulus();
        await waitFor(() => expect(getByTestId(container, 'container')).toHaveClass('connected'));
    });
});
