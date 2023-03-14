// Test libraries
import { createPage, setup } from '@nuxt/test-utils-edge';
import { describe, expect, it } from 'vitest';

// Tests
describe(
    'Description of my test',
    async() => {

        await setup(
            {
                browser: true,
                fixture: '../src',
            }
        );

        it(
            'My test',
            async() => {

                const page = await createPage( '/' )
                    , html = await page.innerHTML( 'body' )
                ;

                expect( html ).toContain( 'Something' );

            }
        );

    }
);
