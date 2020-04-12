/*

*/

const fs = require('fs')
const cheerio = require('cheerio')

if (process.argv.length < 3) {
	console.error("Usage: nodejs parse-bollettino.js <html-file>");
  console.error("");
  console.error("Expects an .html file and prints the parsed CSV on stdout.");
	process.exit(1);
}

let $;

let fn = process.argv[2];
try {
  $ = cheerio.load(fs.readFileSync(fn));  
} catch(e) {
  console.error("Cannot open or parse HTML file: " + fn +". Detailed error below.\n\n");
  console.error(e);
  process.exit(2);
}

let article = $('div.article-body');

let breaks = $('br', article)
breaks.after("<span>\n</span>")

let lines = article.text().split("\n");

let area_regex = /^[a-zA-Z ]*:[0-9 ]*$/;
let nome_comune_regex = /[a-zA-Z ’.]+/;
let dato_comune_regex = /[0-9]+/;

const bollettino_date = clean_fn(fn);

let area = "";

dizionario_comuni = {};
tabella_comuni = [];

function clean_fn(fn) {
  return fn
    .split("/")
    .splice(-1)[0]
    .replace(".html", "");
}

function is_area(line) {
	return (line.trim().search(area_regex) != -1) && 
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
			// console.log("AREA: "+area);
		};

		if (lin.match(/^Comuni/)) {
			
			pre_dati_comuni = lin
								.split(":")[1] // removes the 'Comuni :' part
								.trim()        // cleanup
								.replace(";", ",") // workaround for typos
								.replace(".", " "); // workaround for typos
			
			//console.log("== Linea comuni: " + pre_dati_comuni);
			dati_comuni = pre_dati_comuni.split(",");

			for (var j = 0; j < dati_comuni.length; j++){
				my_dato = dati_comuni[j].trim();
				
				coppia = my_dato.split(" ");
				if ( coppia.length >= 2 ) {
					// console.log("==== '" + my_dato+"'");

					parse_nome_comune = my_dato.match(nome_comune_regex)
					parse_dato_comune = my_dato.match(dato_comune_regex)

					if (parse_nome_comune === null || parse_dato_comune === null){
						console.error("Cannot parse line: '" + my_dato +"' (file: " + fn + ")" )
						continue;
					}

					nome_comune = parse_nome_comune[0].trim();
					dato_comune = parse_dato_comune[0].trim();

					//console.log("====== '"+nome_comune+"' : '"+dato_comune+"'")
					if (!dizionario_comuni[area]) {
						console.error("Area is not set, comune: " + nome_comune + " (file: " + fn + ")");
						continue;
					}
					dizionario_comuni[area]["comuni"][nome_comune] = dato_comune;
					var linea_csv = bollettino_date+","+area +","+nome_comune+",\t"+dato_comune;
					console.log(linea_csv);
					tabella_comuni.push(linea_csv);
				}
			}
			
		}
		if (!area) {continue};
	}

}

if (tabella_comuni.length < 1) {
	console.error("No data found in " + fn + ". Dumping log info on stdout.");
	console.log(lines)
}

// console.log(JSON.stringify(dizionario_comuni));
