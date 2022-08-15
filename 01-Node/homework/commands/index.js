var fs = require('fs');
var request = require('request')

module.exports = {
    date: function() {
        process.stdout.write(Date());
    },

    pwd: function() {
        process.stdout.write(process.cwd());
    },

    ls: function() {
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
              process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("prompt > ");
          });
    },

    echo: function(args) {
        process.stdout.write(args.join(' '));
    },

    cat: function(args) {
        fs.readFile(args[0], function(err, data) {
            if(err) throw err;
            process.stdout.write(data);
            process.stdout.write('\prompt > ')
        })
    },

    head: function(args) {
        let length
        let fileName
        args[1] ? (length = args[0]) && (fileName = args[1]) :  (length = 10) && (fileName = args[0]) 
        fs.readFile(fileName, 'utf-8', function (err, data){
            if(err) throw err;
            const firstLines =data.split('\n').slice(0,length).join('\n')
            process.stdout.write(firstLines)
            process.stdout.write('\nprompt > ')
        })
    },

    tail: function(args) {
        fs.readFile(args[0], 'utf-8', function (err, data){
            if(err) throw err;
            const lastLines =data.split('\n').slice(-10).join('\n')
            process.stdout.write(lastLines)
            process.stdout.write('\nprompt > ')
        })
    },

    curl: function(args) {
        request(args[0], function(err, response, body){
            if(err) throw err;
            process.stdout.write(body)
            process.stdout.write('\nprompt > ')
        })
    }

}