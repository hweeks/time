# time

## install

To install the package, clone this repo and run:

    npm i

## test

> this works for everyone except windows

To run the tests:

    npm test

This will run the linter, then the tests, then get our coverage.

If you want to run this on windows, globally install `eslint`, `nyc`, `mocha` and run:

    eslint src/
    nyc mocha src/
