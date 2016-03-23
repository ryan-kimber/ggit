var path = require('path');
var exists = require('fs').existsSync;
var fileInfo = require('fs').lstatSync;
var read = require('fs').readFileSync;
var filename = './.git';

function getGitFolder(root) {

    if(!root) {
        root = process.cwd();
    }

    var gitDirLocation = path.join(root, filename);
    if (!exists(gitDirLocation)) {
        throw new Error('Cannot find file ' + gitDirLocation);
    }

    if(!fileInfo(gitDirLocation).isDirectory()) {
        var unparsedText = '' + read(gitDirLocation);
        gitDirLocation = unparsedText.substring('gitdir: '.length).trim();
	gitDirLocation = path.join(root, gitDirLocation);
    }

    if (!exists(gitDirLocation)) {
        throw new Error('Cannot find file ' + gitDirLocation);
    }

    return gitDirLocation;

}

module.exports = getGitFolder;
