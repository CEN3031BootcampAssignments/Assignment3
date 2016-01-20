'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'),
	listingsdata = require('./listings.json'),
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

var total = listingsdata.entries.length, j = 0, result = [];

function saveAll(){
  var listing = listingsdata.entries[j];
  j++;
  if(listing.coordinates){
	var doc = new Listing({ name: listing.name, code: listing.code, coordinates: {latitude: listing.coordinates.latitude, longitude: listing.coordinates.longitude}, address: listing.address});
  }
  else{
	var doc = new Listing({ name: listing.name, code: listing.code, address: listing.address});
  }
  
  doc.save(function(err, listing){
    if (err){ 
		throw err;
	}

    result.push(listing[0]);

    if (--total){ 
		saveAll();
	}
    else{
		// all saved here
	}
  })
};

saveAll();
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
 
 
/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */