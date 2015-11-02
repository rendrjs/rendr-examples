
define(function(require)
{

  return function(match) {
    match('',                   'home#index');
    match('repos',              'repos_bundle/repos#index');
    match('repos/:owner/:name', 'repos_bundle/repos#show');
    match('users'       ,       'users_bundle/users#index');
    match('users/:login',       'users_bundle/users#show');
  };

});
