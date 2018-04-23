var fs = require('fs');

if('dev' === process.argv[2] || 'prod' === process.argv[2]){
    fs.rename('src/app/config/' + process.argv[2] + '.config.ts', 'src/app/config/config.ts', function (err, data) {
        if (err) throw err;
        console.log(data);
    });
}

fs.renameSync('tsconfig-cli.json', 'tsconfig.json', function (err, data) {
    if (err) throw err;
    console.log(data);
});

fs.renameSync('src/index-cli.html', 'src/index.html', function (err, data) {
    if (err) throw err;
    console.log(data);
});