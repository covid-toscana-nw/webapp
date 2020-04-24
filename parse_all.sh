
DIR=${1:-../bollettini-toscana-nw-datasets}
BOLLETTINI="./bollettini/2020-0*.html"

for i in ./bollettini/2020-0*.html ; do 
	outfile="$(basename $i| cut -d'.' -f1)"
	node parse-bollettino.js $i > "$DIR"/contagi/contagi_"$outfile".csv ;
done

cd $DIR/contagi
cat toscana_nw_contagi.csv contagi_2020-04-* > contagi_all.csv
cd -

cd $DIR/decessi_e_guarigioni
cat toscana_nw_deceduti_guariti.csv decessi_e_guarigioni_2020_04_18.csv > decessi_e_guarigioni_all.csv
cd -

node generate_json_data.js \
	"$DIR"/contagi/contagi_all.csv \
	"$DIR"/decessi_e_guarigioni/decessi_e_guarigioni_all.csv \
	> "$DIR"/toscana_nw_all_datasets.json