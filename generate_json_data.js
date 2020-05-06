// FORMAT FOR NG CHARTS
// [
//   {
//     "name": "Toscana nord ovest",
//     "series": [
//       { "name": "01/03/2020", "value": 3  },
//       { "name": "02/03/2020", "value": 45 }
//     ]
//   }
// ]

const fs = require('fs');
const loki = require('lokijs');
const lib = require("./generate_lib.js");

let fn = process.argv[2];
content = fs.readFileSync(fn).toString('utf-8')

let fn_decessi = process.argv[3];
let content_decessi = fs.readFileSync(fn_decessi).toString('utf-8');

console.error("Data contagi file: " + fn);
console.error("Data decessi/guarigioni file: " + fn_decessi);

lines = content.split("\n");
lines_decessi = content_decessi.split("\n");

var db = new loki('sandbox.db');
var records = db.addCollection('records');
var locations = db.addCollection('locations');;
var days = [];

for (var i = 0; i < lines.length; i++) {

	var new_record = lib.parseContagiLine(lines[i]);
	if(new_record === null) continue;
	records.insert(new_record);

	if(locations.find({'comune': new_record["comune"]}).length == 0) {
		locations.insert({
			'comune': new_record["comune"], 
			'area': new_record["area"], 
			'provincia': new_record["provincia"]
		});
	}

	if(!days.find(lib.eq(new_record["day"]))) days.push(new_record["day"]);
}

console.error("Added records # ", records.count());

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
		lib.updateDecessiGuarigioni(records, rec, decessi, gv, gc);
	} else if (rec.length > 1) {
		throw new Error("REC len > 1: ", rec);
	} else {
		var new_rec = lib.mkRecord(current_day, area, comune, 1, decessi, gv, gc); 
		records.insert(new_rec);
	}
}

days.sort();
var allDays = lib.getDaysArray(new Date(days[0]), new Date(days.slice(-1)[0]));

console.error("Series over ", allDays.length, " from ", days[0], " to ", days.slice(-1)[0]);
console.error(allDays);

var allLocations = locations.find();
var cc = 0;
for (var i = 0; i < allDays.length; i++) {	 
	for(var j = 0; j < allLocations.length; j++){
		if (records.find({'day': allDays[i], 'comune':  allLocations[j]["comune"]}).length == 0 ){
			records.insert(lib.mkRecord(
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
console.error("Locations number: " + locations.data.length);

var serieToscana = lib.createSeries("", {}, allDays, records);

var all_data = {
	'toscana' : lib.makeObjectWithSeries(serieToscana),
	'aree' : [],
	'comuni': [],
	'provincie': [],
	'tasso-crescita' : [serieToscana[2]]
}

var aree = locations.mapReduce(lib.getArea, lib.getUnique);
for (var i = 0; i < aree.length; i++) {
	if(aree[i] == 'Toscana') continue;
	var areaSerie =  lib.createSeries(aree[i]+" ", {'area' : aree[i]}, allDays, records);
	all_data['aree'].push(areaSerie[1]);
}

var comuni = locations.mapReduce(lib.getArea, lib.getUnique);
for (var i = 0; i < aree.length; i++) {
	if(comuni[i] == 'Toscana') continue;
	var comuneSerie =  lib.createSeries(comuni[i]+" ", {'comune' : comuni[i]}, allDays, records);
	all_data['comuni'].push(comuneSerie);
}

var provincie = locations.mapReduce(lib.getProvincia, lib.getUnique);
for (var i = 0; i < provincie.length; i++) {
	if(provincie[i] == 'Toscana') continue;
	var provinciaSerie =  lib.createSeries(provincie[i]+" ", {'provincia' : provincie[i]}, allDays, records);
	all_data['provincie'].push(provinciaSerie);
}

console.log(JSON.stringify(all_data));
