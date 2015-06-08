module.exports = function(match) {
  match('',                     'home#index');
  match('only-even-minute',     'home#only_even_minute');
  match('only-odd-minute',      'home#only_odd_minute');
};
