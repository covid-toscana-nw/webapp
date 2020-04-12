const fs = require('fs');
const loki = require('lokijs');

let fn = process.argv[2];
content = fs.readFileSync(fn).toString('utf-8')

//console.log(content)
lines = content.split("\n")

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

function mkRecord (d,a,c,nc) {
	return {
		"day" : d,
		"area" : a,
		"comune" : c,
		"nuovi_contagi" : Number.parseInt(nc)
	};
}

function eq(a) {
	return function (x) {
		return x == a;
	}
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

	current_day = record[0];
	area = record[1];
	comune = record[2];
	nuovi_contagi = record[3];

	records.insert(mkRecord(current_day, area, comune, nuovi_contagi));

	if(locations.find({'comune': comune}).length == 0) {
		locations.insert({'comune': comune, 'area': area});
	}

	if(!days.find(eq(current_day))) days.push(current_day);
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
	var tot = 0;
	for (var i = 0; i < allDays.length; i++) {
		// console.log(allDays[i]);
		var fullQuery = Object.assign({'day': allDays[i] }, query);
		// console.log(fullQuery);
		var queryResults = records.find(
			fullQuery
			// Object.assign({'day': '2020-03-03'},{'area': 'Elba'})
		);
		// console.error("Aggregate "+queryResults.length+" records");
		contagi = 0;
		for (var j = 0; j < queryResults.length; j++) {
			contagi = contagi + Number.parseInt(queryResults[j]["nuovi_contagi"]);
			// console.log(queryResults[j]["nuovi_contagi"]);
		}
		
		if(totals.length == 0) {
			tassi.push({
				'name': allDays[i],
				'value': 100
			});
		} else {
			var previous_tot = totals.slice(-1)[0].value;
			tassi.push({
				'name': allDays[i],
				'value': ((contagi * 100) / previous_tot).toFixed(2)
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
	}
	return [
		{ "name": "Nuovi contagi " + name, "series": increments } , 
		{ "name" : "Totale contagi "+  name , "series": totals },
		{ "name" : "Tasso crescita "+name, "series": tassi }
	]
}

function getUnique (arr) {
	return [...new Set(arr)];
}

function getArea (obj) {
	return obj["area"];
}

// console.log();
// console.log(createSeries("Toscana", {}));
// console.log(createSeries("Piana Lucca", {'area': 'Piana di Lucca'}));

//console.log(records.find({'day': '2020-03-03'}).length)
//console.log(records.find(Object.assign({'day': '2020-03-03'},{'area': 'Michele'})).length)

var serieToscana = createSeries("toscana", {});

var all_data = {
	'toscana' : [serieToscana[0], serieToscana[1]],
	'aree' : [],
	'tasso-crescita' : [serieToscana[2]]
}

var aree = locations.mapReduce(getArea, getUnique);
for (var i = 0; i < aree.length; i++) {
	var serie =  createSeries(aree[i], {'area' : aree[i]});
	all_data['aree'].push(serie[0]);
	all_data['aree'].push(serie[1]);
}

console.log(JSON.stringify(all_data));

function generate_chartjs_data () {
	console.log(JSON.stringify({
		"toscana": {
			"days" : days,
			"incr" : incr,
			"tot" : tot,
			"rate" : rate
		}
	}));
}