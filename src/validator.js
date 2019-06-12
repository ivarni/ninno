const K1_FACTORS = [3, 7, 6, 1, 8, 9, 4, 5, 2];
const K2_FACTORS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

const getChecksumDigit = (fnr, factors) => {
    const sum = 11 - (Array
        .from(fnr.substring(0, factors.length))
        .reduce((_sum, digit, i) => _sum + (Number(digit) * factors[i]), 0) % 11);
    return (sum === 11 ? 0 : sum);
};

export const getChecksumDigits = fnr => {
    const k1 = getChecksumDigit(fnr, K1_FACTORS);
    return [k1, getChecksumDigit(fnr + k1, K2_FACTORS)];
}

export const validate = (fnr) => {
    if (!fnr || fnr.length !== 11) {
        return false;
    }

    if (Number(fnr.charAt(9)) !== getChecksumDigit(fnr, K1_FACTORS)) {
        return false;
    }

    if (Number(fnr.charAt(10)) !== getChecksumDigit(fnr, K2_FACTORS)) {
        return false;
    }

    return true;
};
