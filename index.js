var getOneLineLog = require('./src/getOneLineLog');

module.exports = {
	getOneLineLog: getOneLineLog
};

if (!module.parent) {
	getOneLineLog({
		n: 4,
		remote: 'origin',
		branch: 'master'
	})
	.done(function (stdout) {
		console.log(stdout);
	}, function (err) {
		console.error(err);
	});
}
