var path = require('path');
var shell = require('shelljs');
var exists = require('fs').existsSync;
var fileInfo = require('fs').lstatSync;
var read = require('fs').readFileSync;

function getGitFolder() {
    console.log('Shell pwd: ' + shell.pwd());

    var folder = shell.pwd();
    var gitDirLocation = path.join(folder, '/.git');
    while(!exists(gitDirLocation))
    {
        folder  = path.normalize(path.join(folder, '/../'));
        gitDirLocation = path.normalize(path.join(folder, '/.git'));
        console.log("Checking " + gitDirLocation);
    }

    if(!fileInfo(gitDirLocation).isDirectory()) {
        var text = '' + read(gitDirLocation);
	    gitDirLocation = path.normalize(path.join(folder + '/', text.substring('gitdir: '.length).trim()));
    }

    if (!exists(gitDirLocation)) {
        throw new Error('Cannot find file ' + gitDirLocation);
    }

    console.log(".git location: " + gitDirLocation);
    return gitDirLocation;

}

module.exports = getGitFolder;
