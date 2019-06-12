# ninno

(National Identification Numbers, Norway)

## Installation

```bash
npm install --save ninno
```

## Usage

To get an array of identification numbers for a given birthdate.

```javascript
import { generate } from 'ninno';

const fnrs = generate(new Date(2019, 1, 1));
```

To filter on male/female

```javascript
import { generate, GENDER } from 'ninno';

const fnrs = generate(new Date(), { gender: GENDER.F }); // Female
const fnrs = generate(new Date(), { gender: GENDER.M }); // Male
```

To validate an identification number

```javascript
import { validate } from 'ninno';

const valid = validate('12061975193');
```
