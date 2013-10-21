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

All the dependencies of the project will be downloaded automatically. Depending on how `npm` was installed, you might need to run the command `npm install` as superuser.

#Usage#
1. Create a `websites.txt` file containing a list of newline separated websites.
2. Run the command `npm start`

See `websites.txt` for an example of that file.

##Using the androidMarketLib alone##
The project uses a customized AndroidMarketLib, used to query the Android Play Store for information on the app. This library can be found under `/lib/jar`, while the source code can be found under `/java`.
This library was compiled based on the code by Thiel Alexandre [here](http://code.google.com/p/android-market-api/) (Apache 2.0 License).

To use this library from the command line, one can run it as a jar, using the command:

    java -cp ./lib/jar/androidmarketlib.jar:./lib/jar/protobuf-java.jar com.gc.android.market.api.Main <email> <password> <androidId> <query> <limit>

where:

- email: email address
- password: password of aforementioned email address
- androidId: android ID of a device or emulator associated with email address
- query: query to be searched for on the market. More details can be found [here](https://github.com/anas-ambri/app-scraper#queries)
- limit (optional integer): maximum number of results returned. Default is 1

For example, the command: 

    java -cp ./lib/jar/androidmarketlib.jar:./lib/jar/protobuf-java.jar com.gc.android.market.api.Main example@gmail.com example 39cffa85d804bc89 Maps 5

This command will output 5 possible apps that match the query `Maps`.

###Queries###
More details soon