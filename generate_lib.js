function getProvinciaFromArea(area) {
	var provincie = {
		"Alta Val di Cecina Val d'Era" : "Pisa",
		"Apuane": "Massa-Carrara",
		"Bassa Val di Cecina Val di Cornia": "Livorno",
		"Elba" : "Livorno",
		"Garfagnana": "Lucca",
		"Lunigiana": "Massa-Carrara",
		"Piana di Lucca": "Lucca",
		"Valle del Serchio": "Lucca",
		"Versilia": "Lucca",
		"Zona Livornese": "Livorno",
		"Zona Pisana": "Pisa"
	};

	return provincie[area];
}

function mkRecord (d, a, c, nc, dec, gv, gc) {
	return {
		"day" : d,
		"area" : a,
		"proncia": getProvinciaFromArea(a),
		"comune" : c,
		"nuovi_contagi" : Number.parseInt(nc),
		"decessi" : dec || 0,
		"guarigioni_virali" : gv || 0,
		"guarigioni_cliniche": gc || 0,
	};
}

function parseContagiLine(line){

	split = line.split(",");

	if(split.length < 4) return null;

	return mkRecord(
		split[0].trim(), 
		split[1].trim(), 
		split[2].trim(), 
		split[3].trim()
	);
}

function updateDecessiGuarigioni(records, r, d, gv, gc) {
	r['decessi'] = d;
	r['guarigioni_virali'] = gv;
	r['guarigioni_cliniche'] = gc;
	records.update(r);
}

function eq(a) {
	return function (x) {
		return x == a;
	}
}

function getUnique (arr) {
	return [...new Set(arr)];
}

function getArea (obj) {
	return obj["area"];
}

function getComune (obj) {
	return obj["comune"];
}

function getProvincia (obj) {
	return obj["provincia"];
}

function createSeries(name, query, allDays, records){
	
	var increments = [];
	var totals = [];
	var tassi = [];

	var decessi = [];
	var decessi_totali = [];
	var guariti_clinici = [];
	var guariti_clinici_totali = [];
	var attualmente_positivi = [];

	var tot = 0;
	var acc_decessi = 0;
	var acc_guariti_clinici = 0;
	
	for (var i = 0; i < allDays.length; i++) {
		var fullQuery = Object.assign({'day': allDays[i] }, query);
		var queryResults = records.find(fullQuery)
		contagi = 0;
		decessi_giornalieri = 0;
		guariti_clinici_giornalieri = 0;

		if(name == ""){
//			console.error("Day ", allDays[i], " found ", queryResults.length, " records");
		}

		for (var j = 0; j < queryResults.length; j++) {
			if(name == "" && allDays[i] == "2020-03-03"){
				console.error("Day ", allDays[i], " contagi ", queryResults[j]["nuovi_contagi"], " a" ,
					queryResults[j]["comune"]);
			}

			contagi += Number.parseInt(queryResults[j]["nuovi_contagi"]);
			decessi_giornalieri += Number.parseInt(queryResults[j]["decessi"]);
			guariti_clinici_giornalieri += Number.parseInt(queryResults[j]["guarigioni_cliniche"]);
		}
		
		if(attualmente_positivi.length == 0) {
			tassi.push({
				'name': allDays[i],
				'value': 100
			});
		} else {
			var previous_att_pos = attualmente_positivi.slice(-1)[0].value;
			var incr_perc = ((contagi * 100) / previous_att_pos).toFixed(2);
			tassi.push({
				'name': allDays[i],
				'value': (incr_perc < 100) ? incr_perc : 100
			});
		}

		tot = tot + contagi;
		increments.push({
			'name': allDays[i], 
			'value' : contagi,
			'tot': tot
		});
		totals.push({
			'name': allDays[i], 
			'value': tot
		});

		acc_decessi += decessi_giornalieri;
		decessi.push({
			'name': allDays[i],
			'value': decessi_giornalieri
		});
		decessi_totali.push({
			'name': allDays[i],
			'value': acc_decessi
		});

		acc_guariti_clinici += guariti_clinici_giornalieri;
		guariti_clinici.push({
			'name': allDays[i],
			'value': guariti_clinici_giornalieri
		});
		guariti_clinici_totali.push({
			'name': allDays[i],
			'value': acc_guariti_clinici
		});

		attualmente_positivi.push({
			'name': allDays[i],
			'value': tot - ( acc_decessi + acc_guariti_clinici )
		});
	}
	return [
		{ "name":  name + "Nuovi Contagi", "series": increments } , // 0
		{ "name" : name +  "Totale Positivi" , "series": totals }, // 1
		{ "name" :  name + "Incremento Percentuale", "series": tassi }, // 2
		{ "name" :  name + "Nuovi Decessi", "series": decessi }, // 3
		{ "name" :  name + "Totale Decessi", "series": decessi_totali }, // 4
		{ "name" :  name + "Nuovi Guariti Clinici", "series": guariti_clinici }, // 5
		{ "name" :  name + "Totale Guariti Clinici", "series": guariti_clinici_totali }, // 6
		{ "name" :  name + "Attualmente Positivi", "series": attualmente_positivi } // 7
	]
}

function getDaysArray (start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
    	var nd = new Date(dt);
        var di = [
        	nd.getFullYear(), 
        	(nd.getMonth()+1).toLocaleString(undefined, {minimumIntegerDigits: 2}), 
        	(nd.getDate()).toLocaleString(undefined, {minimumIntegerDigits: 2})
        ];
        arr.push(di.join("-"));
    }
    return arr;
}

function makeObjectWithSeries (serie) {
	return {
		"contagi-giornalieri": serie[0], 
		"contagi-totali": serie[1], 
		"decessi-giornalieri": serie[3], 
		"decessi-totali": serie[4],
		"guariti-clinici-giornalieri": serie[5], 
		"guariti-clinici-totali": serie[6], 
		"positivi-attuali": serie[7]	
	};
}

exports.getProvinciaFromArea = getProvinciaFromArea;
exports.parseContagiLine = parseContagiLine;
exports.updateDecessiGuarigioni = updateDecessiGuarigioni;
exports.eq = eq;
exports.mkRecord = mkRecord;
exports.getDaysArray = getDaysArray;
exports.createSeries = createSeries;
exports.makeObjectWithSeries = makeObjectWithSeries;
exports.getArea = getArea;
exports.getComune = getComune;
exports.getUnique = getUnique;
exports.getProvincia = getProvincia;