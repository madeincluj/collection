var fs = require('fs-extra');
var yaml = require('js-yaml');

var yaml_dir = 'dg/metadata/';
var yaml_files = fs.readdirSync(yaml_dir);
var output_dir = 'dg/json/metadata/';

yaml_files.forEach(function(filepath) {
	var file = fs.readFileSync(yaml_dir + filepath, 'utf8');
	var content = yaml.safeLoad(file);
	var output = JSON.stringify(content, null, 2);
	fs.outputFile(output_dir + content.id + '.json', output);
});