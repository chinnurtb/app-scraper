app-scraper
===========

A web scraper that, given a website, looks for Android or iOS support

#Setup#

##Requirements##
You need to have [node](http://nodejs.org) and [java](http://www.java.com/en/download/index.jsp) installed.

##Executing##
	$ git clone git://git@github.com:anas-ambri/app-scraper.git
	$ cd app-scraper
	$ npm install
	$ npm start

Depending on how `npm` was installed, you might need to run the command `npm install` as superuser.

#Usage#

1. Create a `websites.txt` file containing a list of newline separated websites.
2. Run the command `npm start`

See `websites.txt` for an example of that file.