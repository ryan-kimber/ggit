var path = require('path');
var exists = require('fs').existsSync;
var fileInfo = require('fs').lstatSync;
var read = require('fs').readFileSync;
var filename = './.git';

function getGitFolder() {
    var gitDirLocation = path.resolve(filename);
    if (!exists(gitDirLocation)) {
        throw new Error('Cannot find file ' + gitDirLocation);
    }

    if(!fileInfo(gitDirLocation).isDirectory()) {
        var unparsedText = '' + read(gitDirLocation);
        gitDirLocation = unparsedText.substring('gitdir: '.length).trim();
    }

    if (!exists(gitDirLocation)) {
        throw new Error('Cannot find file ' + gitDirLocation);
    }

    return gitDirLocation;

}

module.exports = getGitFolder;
