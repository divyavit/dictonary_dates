const assert = require('assert')
const server = require('./Server');


it('corretly calculates for test case 1', () => { 
    let ans = server.findOutput([ { key: '2020-06-02', value: 100 }, { key: '2020-06-04', value: 114 } ])
    let actual_output = [ { key: '2020-06-02', value: 100 },{ key: '2020-06-03', value: 107 }, { key: '2020-06-04', value: 114 } ];
    assert.equal(JSON.stringify(ans),JSON.stringify(actual_output));
})

it('corretly calculates for test case 2', () => { 
    let ans = server.findOutput([ { key: '2020-06-01', value: 100 }, { key: '2020-06-04', value: 115 } ])
    let actual_output = [ { key: '2020-06-01', value: 100 },{ key: '2020-06-02', value: 105 }, { key: '2020-06-03', value: 110 } ,{ key: '2020-06-04', value: 115 } ];
    assert.equal(JSON.stringify(ans),JSON.stringify(actual_output));
})

it('corretly calculates for test case 3', () => { 
    let ans = server.findOutput([ { key: '2020-06-10', value: 10 }, { key: '2020-06-11', value: 20 }, { key: '2020-06-13', value: 10 }  ])
    let actual_output = [ { key: '2020-06-10', value: 10 },{ key: '2020-06-11', value: 20 }, { key: '2020-06-12', value: 15 } ,{ key: '2020-06-13', value: 10 } ];
    assert.equal(JSON.stringify(ans),JSON.stringify(actual_output));
})