/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'),
	config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
	var query = Listing.findOne({ 'name': 'Library West' });

	// selecting the fields
	query.select('code name coordinates address');

	// execute the query
	query.exec(function (err, listing) {
	  if (err) return handleError(err);
	  console.log("%s's code is %s. It is located at coordinates %s, %s, and the address is %s.\n", listing.name, listing.code, listing.coordinates.latitude, listing.coordinates.longitude, listing.address);
	})
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This corresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   Listing.findOneAndRemove({ code: 'CABL' }, function (err, listing) {
	  if (err) return handleError(err);
	  console.log("The %s has been removed. Its code was %s.\n", listing.name, listing.code);
	});
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's name is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   Listing.findOneAndUpdate({ code: 'PHL' }, { $set: {'coordinates.latitude': '29.644596', 'coordinates.longitude': '-82.348859'}, address: '100 Phelps Lab, Gainesville, FL 32611'}, function (err, listing) {
	  if (err) return handleError(err);
	});
	
	Listing.findOne({ address: '100 Phelps Lab, Gainesville, FL 32611' }, function (err, listing) {
	  if (err) return handleError(err);
	  console.log("UPDATE: %s's code is %s. It is located at coordinates %s, %s, and the address is %s.\n", listing.name, listing.code, listing.coordinates.latitude, listing.coordinates.longitude, listing.address);
	});
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   Listing.find({}, function(err, listing) {
		if (err) return handleError(err);
		console.log('All listings found in database: ');
		for(var j = 0; j < listing.length; j++){
			console.log('\nCode: %s, Name: %s \nCoordinates: %s \nAddress: %s', listing[j].code, listing[j].name, listing[j].coordinates, listing[j].address);
		}
		
	});
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();