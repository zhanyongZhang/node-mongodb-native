var read_all_tests = require('./util').read_all_tests
  , run_test = require('./util').run_test;

// Load all the tests
var tests = read_all_tests(__dirname + "/test");

// Get a test
var run_number_of_times = 100;
var concurrent = false;
var results = [];
var default_url = "mongodb://localhost:27017/db";

console.log("=======================================================");
console.log("= running benchmarks                                  =")
console.log("=======================================================");

var start = new Date();
run_test(default_url, tests[0], run_number_of_times, concurrent, function(err, results) {
  var end = new Date();
  for(var key in results) {
    // Calculate the averages
    var result = results[key];
    var total_time = 0;
    for(var i = 0; i < result.results.length; i++) {
      total_time = total_time + result.results[i].time;
    }
    // Calculate the average
    var average = total_time / result.results.length;
    console.log("= test: " + key);
    console.log("  tot :: " + total_time);
    console.log("  avg :: " + average);
  }


  // console.dir(err)
  // console.dir(results["simple_100_document_toArray"])
  console.log("total time :: " + (end.getTime() - start.getTime()));
});


// console.dir(tests)