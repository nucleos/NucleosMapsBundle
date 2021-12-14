'use strict';

import { Application, Controller } from '@hotwired/stimulus';
import { getByTestId } from '@testing-library/dom';
import { clearDOM, mountDOM } from '@symfony/stimulus-testing';
import GoogleMapsController from '../src/googlemaps_controller'; // Controller used to check the actual controller was properly booted

// Controller used to check the actual controller was properly booted
class CheckController extends Controller {
    connect() {
        this.element.addEventListener('googlemaps:connect', () => {
            this.element.classList.add('connected');
        });
    }
}

const startStimulus = () => {
    const application = Application.start();
    application.register('check', CheckController);
    application.register('googlemaps', GoogleMapsController);
    return application;
};

describe('GoogleMapsController', () => {
    let container;

    beforeEach(() => {
        container = mountDOM(`
            <div
                data-testid="container"
                data-controller="check googlemaps"
                data-googlemaps-latitude-value="53.27"
                data-googlemaps-longitude-value="9.42"
                data-googlemaps-zoom-value="5"
                data-googlemaps-height-value="200"
                data-googlemaps-title-value="Some title"
                data-googlemaps-apikey-value="">
            </div>
        `);
    });

    afterEach(() => {
        clearDOM();
    });

    it('connect', async () => {
        expect(getByTestId(container, 'container')).not.toHaveClass('connected');

        startStimulus();
        // await waitFor(() => expect(getByTestId(container, 'container')).toHaveClass('connected'));
    });
});
