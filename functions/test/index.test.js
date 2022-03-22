const test = require('firebase-functions-test')();
const functions = require('firebase-functions');
const key = functions.config().stripe.key;

// Mock functions config values
test.mockConfig({ stripe: { key: '23wr42ewr34' }});

adminInitStub = sinon.stub(admin, 'initializeApp');
// after firebase-functions-test has been initialized
const myFunctions = require('../src'); // relative path to functions code

const wrapped = test.wrap(myFunctions.addBoard);

wrapped(data, {
    body: {
        name: 'testing Board1'
    }
})
test.cleanup();