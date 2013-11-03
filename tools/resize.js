var fs = require('fs-extra');
var walk = require('walk');
var im = require('imagemagick');
var yaml = require('js-yaml');

var folders = yaml.safeLoad(fs.readFileSync('tools/resize.yaml', 'utf8')).folders;

folders.forEach(function(folder) {
	var original_dir = process.cwd() + '/' + folder + '/original';
	console.log(original_dir);
	var walker = walk.walk(original_dir, {
		followLinks: false
	});

	walker.on('file', function(root, filestats, next) {

		console.log('Resizing file: ' + root + '/' + filestats.name);

		var thumb_dir = root.replace('original', 'thumb');
		var large_dir = root.replace('original', 'large'); 
		fs.mkdirsSync(thumb_dir);
		fs.mkdirsSync(large_dir);
		im.resize({
			srcPath: root + '/' + filestats.name,
			dstPath: thumb_dir + '/' + filestats.name,
			quality: 90,
			width: 200,
			height: 200,
			sharpening: 0.1
		}, function(err, stdout) {
			if (err) throw err;
			im.resize({
				srcPath: root + '/' + filestats.name,
				dstPath: large_dir + '/' + filestats.name,
				quality: 90,
				width: 800,
				height: 600,
				sharpening: 0.1
			}, function(err) {
				if (err) throw err;
				next();
			});
		});
	});
});