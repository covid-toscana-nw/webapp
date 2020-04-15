for i in ./bollettini/2020-0*.html ; do node parse-bollettino.js $i > parsed/$i.csv ; done

cd parsed 

cat from-3-to-21-march.csv \
	./bollettini/2020-03-{22,23,24,25,26,27,28,29,30,31}.html.csv \
	./bollettini/2020-04-*.html.csv \
	> all_data.csv

cd ..

node generate_json_data.js parsed/all_data.csv > toscana_nw_all_datasets.json
cp toscana_nw_all_datasets.json ../toscana-datasets/