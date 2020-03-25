const fs = require('fs')
const cheerio = require('cheerio')

if (process.argv.length < 3) {
	console.log("Usage: nodejs parse-bollettino.js <html-file>");
	process.exit(1);
}

let fn = process.argv[2];
const $ = cheerio.load(fs.readFileSync(fn));

let article = $('div.article-body');
let lines = article.text().split("\n");

let area_regex = /^[a-zA-Z ]*:[0-9 ]*$/;
let nome_comune_regex = /[a-zA-z ]*/;
let dato_comune_regex = / [0-9]+/;

// TODO parametrize
const today_date = "2020-03-25";

let area = "";

dizionario_comuni = {};
tabella_comuni = [];

function is_area(line) {
	return (line.search(area_regex) != -1) && 
			!(line.includes("Attachments"))
}

for (var i = 0; i < lines.length; i++) {
	let lin = lines[i];

	if (true) {
		
		if (is_area(lin)) { 
			area = lin.split(":")[0].trim();
			dizionario_comuni[area] = {
				"total":  lines[i].split(":")[1].trim(),
				"comuni": {}
			}
			//console.log("AREA: "+area);
		};
		if (lin.match(/^Comuni/)) {
			
			pre_dati_comuni = lin
								.split(":")[1] // removes the 'Comuni :' part
								.trim()        // cleanup
								.replace(";", ","); // workaround for typos
			
			//console.log("== Linea comuni: " + pre_dati_comuni);
			dati_comuni = pre_dati_comuni.split(",");

			for (var j = 0; j < dati_comuni.length; j++){
				my_dato = dati_comuni[j].trim();
				
				coppia = my_dato.split(" ");
				if ( coppia.length >= 2 ) {
					//console.log("==== '" + my_dato+"'");
					nome_comune = my_dato.match(nome_comune_regex)[0].trim();
					dato_comune = my_dato.match(dato_comune_regex)[0].trim();

					//console.log("====== '"+nome_comune+"' : '"+dato_comune+"'")
					dizionario_comuni[area]["comuni"][nome_comune] = dato_comune;
					var linea_csv = today_date+",\t"+area +",\t"+nome_comune+",\t"+dato_comune;
					console.log(linea_csv);
					tabella_comuni.push(linea_csv);
				}
			}
			
		}
		if (!area) {continue};
	}

}

// console.log(JSON.stringify(dizionario_comuni));
