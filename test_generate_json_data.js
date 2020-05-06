
var gen = require('./generate_lib.js');
var assert = require('assert');

describe("Generate JSON dataset", function(){
    
    it("gets Provincia From Area", function (){
    	assert.equal("Lucca",gen.getProvinciaFromArea("Piana di Lucca"));
    });

    it("parse Contagi empty lines", function(){
    	var line = "";
    	var expected = null;
    	assert.equal(expected, gen.parseContagiLine(line));
    });

	it("parse Contagi valid lines", function(){
    	var line = "2020-02-02,Garfagnana,Castelnuovo,50";
    	var expected = {
			"day" : "2020-02-02",
			"area" : "Garfagnana",
			"proncia": "Lucca",
			"comune" : "Castelnuovo",
			"nuovi_contagi" : 50,
			"decessi" : 0,
			"guarigioni_virali" : 0,
			"guarigioni_cliniche": 0,
		};
    	assert.deepEqual(expected, gen.parseContagiLine(line));
    });    

});
