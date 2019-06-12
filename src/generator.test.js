import { generate, GENDER } from './generator';
import { validate } from './validator';

describe('generator', () => {
    it('generates fnrs', () => {
        const fnrs = generate(new Date(1990, 1, 1));

        expect(fnrs.length).toBeGreaterThan(0);
    });

    it('generates only valid fnrs', () => {
        const fnrs = generate(new Date(1990, 1, 1));

        fnrs.forEach(fnr =>
            expect(validate(fnr)).toBe(true),
        );
    });

    it('does not stray from 000-499 century indicator for 1900-1999', () => {
        const fnrs = generate(new Date(1939, 3, 4));

        fnrs.forEach((fnr) => {
            const indicator = Number(fnr.substring(6, 9));

            expect(indicator).toBeLessThan(500);
        });
    });

    it('does not stray from 500-749 century indicator for 1854-1899', () => {
        const fnrs = generate(new Date(1860, 6, 7));

        fnrs.forEach((fnr) => {
            const indicator = Number(fnr.substring(6, 9));

            expect(indicator).toBeLessThanOrEqual(750);
            expect(indicator).toBeGreaterThanOrEqual(500);
        });
    });

    it('does not stray from 500-999 century indicator for 2000-2039', () => {
        const fnrs = generate(new Date(2037, 11, 12));

        fnrs.forEach((fnr) => {
            const indicator = Number(fnr.substring(6, 9));

            expect(indicator).toBeLessThanOrEqual(1000);
            expect(indicator).toBeGreaterThanOrEqual(500);
        });
    });

    it('does not stray from 900-999 century indicator for 1940-1999', () => {
        const fnrs = generate(new Date(1948, 11, 12));

        fnrs.forEach((fnr) => {
            const indicator = Number(fnr.substring(6, 9));

            expect(indicator).toBeLessThanOrEqual(999);
            expect(indicator).toBeGreaterThanOrEqual(900);
        });
    });

    it('uses correct date', () => {
        const fnrs = generate(new Date(1980, 4, 9));

        fnrs.forEach((fnr) => {
            const date = fnr.substring(2, 4);

            expect(date).toBe('05');
        });
    });

    describe('Filtering', () => {
        it('throws on an unrecognized filters', () => {
            expect(
                () => generate(new Date(), { foo: 'bar', baz: 'zot' })
            ).toThrow('Invalid filter key(s): foo, baz');
        });

        describe('on gender', () => {
            it('filters on gender F', () => {
                const { F } = GENDER;
                const fnrs = generate(new Date(2019, 5, 12), { gender: F });

                expect(fnrs.length).toBeGreaterThan(0);

                fnrs.forEach(fnr => {
                    const genderMarker = fnr.substring(8, 9);
                    expect(genderMarker % 2).toBe(0);
                });
            });

            it('filters on gender M', () => {
                const { M } = GENDER;
                const fnrs = generate(new Date(2019, 5, 12), { gender: M });

                expect(fnrs.length).toBeGreaterThan(0);

                fnrs.forEach(fnr => {
                    const genderMarker = fnr.substring(8, 9);
                    expect(genderMarker % 2).not.toBe(0);
                });
            });
        });
    });
});
