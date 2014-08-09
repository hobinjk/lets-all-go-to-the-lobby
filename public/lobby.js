/* jshint browser: true */
/* global d3, console */

d3.json('/lobbymoney', function(err, lobbyMoney) {
  console.log(lobbyMoney);
  var dates = lobbyMoney.map(function(item) {
    return new Date(item.getTime());
  });
});

