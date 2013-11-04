var fs = require('fs-extra');
var yaml = require('js-yaml');

var dirs = ['fortepan', 'historical-photography', 'historical-collection'];

dirs.forEach(function(dir) {

	var yaml_file = dir + '/metadata/' + dir + '.yaml';
	var output = dir + '/json/' + dir + '.json';

	var file = fs.readFileSync(yaml_file, 'utf8');
	var content = yaml.safeLoad(file);

	console.log(JSON.stringify(content).substring(0, 100));

	var features = content.photos
		.filter(function(photo) {
			return photo.coordinates;
		})
		.map(function(photo) {
			return {
				properties: {
					description: photo.description,
					id: photo.id || photo.file.replace('.jpg', ''),
					year: photo.year,
					credits: photo.credits
				},
				geometry: {
					type: 'Point',
					coordinates: photo.coordinates.split(',').map(function(part) {
						return parseFloat(part.trim());
					})
				}
			}
		});

	var json = {
		type: 'FeatureCollection',
		properties: content.properties || {},
		features: features
	};  

	fs.outputFile(output, JSON.stringify(json, null, 2));

});