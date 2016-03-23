var path = require('path');
var shell = require('shelljs');
var exists = require('fs').existsSync;
var fileInfo = require('fs').lstatSync;
var read = require('fs').readFileSync;
var filename = './.git';

function getGitFolder() {

    var gitDirLocation = path.join(shell.pwd(), filename);
    if (!exists(gitDirLocation)) {
        throw new Error('Cannot find file ' + gitDirLocation);
    }

    if(!fileInfo(gitDirLocation).isDirectory()) {
        var unparsedText = '' + read(gitDirLocation);
        gitDirLocation = unparsedText.substring('gitdir: '.length).trim();
	gitDirLocation = path.join(shell.pwd(), gitDirLocation);
    }

    if (!exists(gitDirLocation)) {
        throw new Error('Cannot find file ' + gitDirLocation);
    }

    return gitDirLocation;

}

module.exports = getGitFolder;
