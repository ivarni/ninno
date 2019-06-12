import { validate } from './validator';

describe('validator', () => {
    it('returns invalid if the length is wrong', () => {
        expect(validate('0905804980')).toBe(false);
    });

    it('returns invalid if the checksum is wrong', () => {
        expect(validate('0905804981')).toBe(false);
        expect(validate('0905804990')).toBe(false);
    });

    it('validates checksum for regular ssn', () => {
        expect(validate('09058049805')).toBe(true);
    });

    it('handles garbage input', () => {
        expect(validate('abcdefghijk')).toBe(false);
    });

    it('handles falsy stuffs', () => {
        ['', null, undefined, 0].forEach(
            stuff => expect(validate(stuff)).toBe(false),
        );
    });
});
