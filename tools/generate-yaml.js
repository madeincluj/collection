var fs = require('fs-extra');

var buildings = JSON.parse(fs.readFileSync('dg/json/buildings.json', 'utf8'));
var output_dir = 'dg/metadata/';

buildings.features.forEach(function(feature) {
	var id = feature.properties.id.replace('way/', '');
	var output_file = output_dir + id + '.yaml';
	var data = 'id: ' + id + '\n';
	data+= 'name: ' + feature.properties.name + '\n';
	if (!fs.existsSync(output_file)) {
		fs.outputFile(output_file, data);
	}
});