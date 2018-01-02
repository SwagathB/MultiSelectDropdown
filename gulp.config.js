module.exports=function(){
    var config = {
        alljs: ['./Scripts/**/*.js'],
        htmltemplates :'./Scripts/**/*.html',
        tmp:'./tmp',
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }

    }

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    return config;
}