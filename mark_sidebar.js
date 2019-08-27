const fs = require("fs");
const path = require("path");


const currentDir = path.resolve('./');
const prefix = currentDir.length + 1;

function fileDisplay(filePath) {
	const child = filePath.length > prefix;
	if (child) {
		console.log(filePath.substring(prefix));
	}
	const files = fs.readdirSync(filePath);
	files.forEach(function(filename) {
		var filedir = path.join(filePath, filename);
		const stats = fs.statSync(filedir);
		if (stats.isFile() && filedir.endsWith('.md')) {
			console.log((child ? '    * ' : '* ') + filedir.replace(/.+\\/, '[').replace(/\.md/, '') + '](/' + filedir.substring(prefix).replace('.md', ')').replace(/\\/, '/'));
		}
		if (stats.isDirectory()) {
            console.log();
			fileDisplay(filedir);
		}
	});
}

fileDisplay(currentDir);
