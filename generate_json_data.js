const fs = require('fs');
const loki = require('lokijs');

let fn = process.argv[2];
content = fs.readFileSync(fn).toString('utf-8')


let fn_decessi = process.argv[3];
let content_decessi = fs.readFileSync(fn_decessi).toString('utf-8');

console.error("Data contagi file: " + fn);
console.error("Data decessi/guarigioni file: " + fn_decessi);

//console.log(content)
lines = content.split("\n");
lines_decessi = content_decessi.split("\n");

var db = new loki('sandbox.db');
var records = db.addCollection('records');
var locations = db.addCollection('locations');;
var days = [];

// FORMAT FOR NG CHARTS
// [
//   {
//     "name": "Toscana nord ovest",
//     "series": [
//       {
//         "name": "01/03/2020",
//         "value": 3
//       },
//       {
//         "name": "02/03/2020",
//         "value": 45
//       },
//       {
//         "name": "03/03/2020",
//         "value": 123
//       },
//       {
//         "name": "04/03/2020",
//         "value": 233
//       },
//       {
//         "name": "05/03/2020",
//         "value": 340
//       },
//       {
//         "name": "06/03/2020",
//         "value": 456
//       },
//     ]
//   }
// ]


// FORMAT FOR CHARTJS
//
// {
//   "labels" : [ ],
//   "serie1" : {
//     "name" : string,
//     "series" : {
//         "name": string,
//         "value": number
// }    
//   }
// }
//

function mkRecord (d, a, c, nc, dec, gv, gc) {
	return {
		"day" : d,
		"area" : a,
		"comune" : c,
		"nuovi_contagi" : Number.parseInt(nc),
		"decessi" : dec || 0,
		"guarigioni_virali" : gv || 0,
		"guarigioni_cliniche": gc || 0
	};
}

function updateDecessiGuarigioni(r, d, gv, gc) {
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

var getDaysArray = function(start, end) {
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
};

for (var i = 0; i < lines.length; i++) {

	record = lines[i].split(",");

	if(record.length < 4) continue;

	current_day = record[0].trim();
	area = record[1].trim();
	comune = record[2].trim();
	nuovi_contagi = record[3].trim();

	var my_new_rec = mkRecord(current_day, area, comune, nuovi_contagi); 
	records.insert(my_new_rec);

	if(locations.find({'comune': comune}).length == 0) {
		locations.insert({'comune': comune, 'area': area});
	}

	if(!days.find(eq(current_day))) days.push(current_day);
}

console.error("Added records # ", records.count());

// Data;Area;Comune;Decessi;Guarigioni Virali;Guarigioni cliniche;;

for (var i = 0; i < lines_decessi.length; i++) {
	var row = lines_decessi[i].split(",");

	if(row.length < 4) {continue;}

	current_day = row[0].trim();
	area = row[1].trim();
	comune = row[2].trim();
	decessi = (row[3]) ? row[3].trim(): 0;
	gv = (row[4]) ? row[4].trim(): 0;
	gc =(row[5]) ? row[5].trim(): 0;

	var rec = records.find({'day': current_day, 'area': area, 'comune' : comune});

	if (rec.length > 0) {
		updateDecessiGuarigioni(rec, decessi, gv, gc);
	} else if (rec.length > 1) {
		throw new Error("REC len > 1: ", rec);
	} else {
		var new_rec = mkRecord(current_day, area, comune, 1, decessi, gv, gc); 
		records.insert(new_rec);
	}
}

days.sort();
var allDays = getDaysArray(new Date(days[0]), new Date(days.slice(-1)[0]));

var allLocations = locations.find();
var cc = 0;
for (var i = 0; i < allDays.length; i++) {	 
	for(var j = 0; j < allLocations.length; j++){
		if (records.find({'day': allDays[i], 'comune':  allLocations[j]["comune"]}).length == 0 ){
			records.insert(mkRecord(
				allDays[i], 
				allLocations[j]["area"],
				allLocations[j]["comune"],
				0
			));
			cc++;
		}		
	}
}

console.error("LOG: Added "+cc+" syntetic records");
console.error("Locations number: " + locations.data.length)

function createSeries(name, query){
	
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
		var queryResults = records.find(
			fullQuery
		);
		contagi = 0;
		decessi_giornalieri = 0;
		guariti_clinici_giornalieri = 0;

		for (var j = 0; j < queryResults.length; j++) {
			contagi += Number.parseInt(queryResults[j]["nuovi_contagi"]);
			decessi_giornalieri += Number.parseInt(queryResults[j]["decessi"]);
			guariti_clinici_giornalieri += Number.parseInt(queryResults[j]["guarigioni_cliniche"]);
		}
		
		if(totals.length == 0) {
			tassi.push({
				'name': allDays[i],
				'value': 100
			});
		} else {
			var previous_tot = totals.slice(-1)[0].value;
			var incr_perc = ((contagi * 100) / previous_tot).toFixed(2);
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

var serieToscana = createSeries("", {});

var all_data = {
	'toscana' : makeObjectWithSeries(serieToscana),
	'aree' : [],
	'comuni': [],
	'tasso-crescita' : [serieToscana[2]]
}

var aree = locations.mapReduce(getArea, getUnique);
for (var i = 0; i < aree.length; i++) {
	if(aree[i] == 'Toscana') continue;
	var areaSerie =  createSeries(aree[i]+" ", {'area' : aree[i]});
	all_data['aree'].push(areaSerie[1]);
}

var comuni = locations.mapReduce(getArea, getUnique);
for (var i = 0; i < aree.length; i++) {
	if(comuni[i] == 'Toscana') continue;
	var comuneSerie =  createSeries(comuni[i]+" ", {'comune' : comuni[i]});
	all_data['comuni'].push(comuneSerie);
}

console.log(JSON.stringify(all_data));