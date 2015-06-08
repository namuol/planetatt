#!/bin/sh

git checkout gh-pages
git merge origin/master
NODE_ENV=production BASEPATH=planetatt npm run build
git commit -am 'auto-deploy'
git push origin gh-pages
git checkout master