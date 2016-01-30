process.env.DISABLE_NOTIFIER = true;
var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'src/';
elixir.config.publicPath = 'dist';
elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix.browserify('pagination.js', 'dist/vue-pagination.js');
});
