//console.log(process)
const commands = require('./commands/index.js');
// // Output un prompt
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//   var cmd = data.toString().trim(); // remueve la nueva línea
//   process.stdout.write('You typed: ' + cmd);
//   process.stdout.write('\nprompt > ');
// });

// const commands = require('./commands');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  // var cmd = data.toString().trim(); // remueve la nueva línea
  // if(cmd === 'date') {
  //     commands.date()
  //  // process.stdout.write(Date());  
  // }
  // if(cmd === 'pwd') {
  //   commands[cmd]()
  //  // process.stdout.write(process.cwd());
  // }

  var args = data.toString().trim().split(' ');// convertis lo que escriba en un array [echo,hola,buen,dia]
  var cmd = args.shift(); // quito el primer valor, que es 'echo'

  commands[cmd] ? commands[cmd](args) : process.stdout.write('Comando o Archivo no encontrado')
  process.stdout.write('\nprompt > ');
});