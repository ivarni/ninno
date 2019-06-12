import {
    getChecksumDigits
} from './validator';

const getDay = date => date.getDate();
const getMonth = date => date.getMonth() + 1;
const getYear = date => date.getFullYear();

const range = (a, b) =>
    Array.from(Array(b - a), (_, i) => i + a);

export const GENDER = {
    F: 'Female',
    M: 'Male',
};

export const generate = (date, filters = {}) => {
    const year = getYear(date);

    const dayString = String(getDay(date)).padStart(2, '0');
    const monthString = String(getMonth(date)).padStart(2, '0');
    const dateString = dayString + monthString + String(year).substring(2, 4);

    let rangeStart = 0;
    let rangeStop = 1000;
    let skip = [];

    if (year >= 1940 && year < 2000) {
        rangeStart = 900;
        rangeStop = 1000;
    } else if (year <= 1999 && year > 1900) {
        rangeStart = 0;
        rangeStop = 499;
    } else if (year >= 1854 && year < 1900) {
        rangeStart = 500;
        rangeStop = 750;
    } else if (year >= 2000) {
        rangeStart = 500;
        rangeStop = 1000;
        skip = range(500, 751).concat(range(900, 1000));
    }

    const {
        gender,
        ...rest
    } = filters;

    if (Object.keys(rest).length > 0) {
        throw new Error(`Invalid filter key(s): ${Object.keys(rest).join(', ')}`)
    }

    const _filters = [
        fnr => fnr !== null,
        gender
            ? fnr => (fnr.substring(8, 9) % 2 === 0) ? gender === GENDER.F : gender === GENDER.M
            : () => true,
    ];

    return range(rangeStart, rangeStop)
        .filter(i => !skip.includes(i))
        .map(i => {
            const fnr = dateString + String(i).padStart(3, '0');
            const [k1, k2] = getChecksumDigits(fnr);
            if (k1 === 10 || k2 === 10) {
                return null;
            }
            return fnr + k1 + k2;
        })
        .filter(fnr => _filters.every(f => f(fnr)))
}