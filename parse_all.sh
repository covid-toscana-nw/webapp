
DIR=${1:-../dataset}
BOLLETTINI="./bollettini/2020-0*.html"

parse_bollettini="No"

if [ "$parse_bollettini" == "Yes" ] ; then
	for i in ./bollettini/2020-04-{28,29,30}.html ; do 
		outfile="$(basename $i| cut -d'.' -f1)"
		node parse-bollettino.js $i > "$DIR"/contagi/contagi_"$outfile".csv ;
	done
	exit 0
fi

cd $DIR/contagi
cat \
	contagi_2020-02-*.csv \
	contagi_2020-03-*.csv \
	contagi_2020-04-* \
	contagi_2020-05-* > contagi_all.csv
cd -

cd $DIR/decessi_e_guarigioni
cat decessi_e_guarigioni_2020_0*.csv > decessi_e_guarigioni_all.csv
cd -

node generate_json_data.js \
	"$DIR"/contagi/contagi_all.csv \
	"$DIR"/decessi_e_guarigioni/decessi_e_guarigioni_all.csv \
	> "$DIR"/toscana_nw_all_datasets.json