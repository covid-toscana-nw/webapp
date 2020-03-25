# Bollettini toscana nord

Parses reports (i.e. bollettini) published by USL Toscana Nord and produces structured data.

**NOTE: This is in no way an official tool and is made available by independent authors with no relationship with official authorities or agencies of Regione Toscana or USL Toscana.**

See the LICENSE file for applicable terms and conditions.

## Requirements

The script requires `nodejs` and `npm` to be executed. (Tested with NodeJS v8.16.2 and npm 6.4.1)

### Install dependencies

    npm install

## Download bollettino

The script expects the source HTML file to be in the local filesystem.

The HTML version of the bollettino may be dowloaded with (e.g.)

    wget https://uslnordovest.toscana.it/notizie/4844-aggiornamento-situazione-coronavirus-covid-19-bollettino-di-mercoledi-25-marzo-2020-ore-18 -O 2020-03-25.html

## Run the script

    node parse-bollettino.js 2020-03-25.html