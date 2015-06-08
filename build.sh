#!/bin/sh

mkdir -p dist
webpack --progress --colors --devtool source-map
cp index.html dist/.