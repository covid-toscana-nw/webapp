
DIR=../dataset

cat $DIR/contagi/toscana_nw_contagi.csv $DIR/contagi/contagi_2020*.csv $DIR/decessi_e_guarigioni/decessi_e_guarigioni_2020_*.csv | cut -d, -f2 | sort | uniq