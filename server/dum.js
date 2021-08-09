// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('python',["./dummy.py"]);

// pythonProcess.stdout.on('data', (data) => {
// console.log(data.toString())
// });
const PythonShell=require('python-shell')
 
let options = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: 'dummy.py',
  args: ['value1', 'value2', 'value3']
};
 console.log(PythonShell)
PythonShell.run('dummy.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});