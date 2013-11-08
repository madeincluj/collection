var fs = require('fs-extra');
var yaml = require('js-yaml');

var yaml_dir = 'monuments/metadata/';
var yaml_files = fs.readdirSync(yaml_dir);
var output_dir = 'monuments/json/metadata/';
var geojson_output = 'monuments/json/monuments.json';

var geojson = {
	type: 'FeatureCollection',
	features: []
};

yaml_files.forEach(function(filepath) {
	var file = fs.readFileSync(yaml_dir + filepath, 'utf8');
	var content = yaml.safeLoad(file);

	var feature = {
		properties: {
			name: content.name,
			id: content.slug
		},
		geometry: {
			type: 'Point',
			coordinates: content.coordinates ? content.coordinates.split(',').map(function(part) {
				return part.trim();
			}) : [0, 0]
		}
	};

	geojson.features.push(feature);

	var output = JSON.stringify(content, null, 2);
	fs.outputFile(output_dir + content.slug + '.json', output);
	fs.outputFile(geojson_output, JSON.stringify(geojson, null, 2));
});