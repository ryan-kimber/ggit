var path = require('path');
var shell = require('shelljs');
var exists = require('fs').existsSync;
var fileInfo = require('fs').lstatSync;
var read = require('fs').readFileSync;
var filename = './.git';

function getGitFolder() {
    console.log('Shell pwd: ' + shell.pwd());

    var gitDirLocation = path.join(shell.pwd(), filename);
    while(!exists(gitDirLocation))
    {
        gitDirLocation = path.join('..', gitDirLocation);
    }

    if(!fileInfo(gitDirLocation).isDirectory()) {
        var text = '' + read(gitDirLocation);
	    gitDirLocation = path.join(gitDirLocation + '/../', text.substring('gitdir: '.length).trim());
    }

    if (!exists(gitDirLocation)) {
        throw new Error('Cannot find file ' + gitDirLocation);
    }

    return gitDirLocation;

}

module.exports = getGitFolder;
