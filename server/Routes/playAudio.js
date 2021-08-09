const router=require('express').Router()
const spawn = require("child_process").spawn;
const fs=require('fs')
const mime=require('mime')
const path=require('path')


router.get('/',(req,res)=>{
    
    const pythonProcess = spawn('C://Users//hp//AppData//Local//Programs//Python//Python39//python.exe',["dummy2.py",req.query.text]);
    
console.log("reps",req.query.text)
    pythonProcess.stdout.on('data', function (data){
        // console.log("this is data of the dummy2",data.toString());
        console.log("dirname",__dirname)
        console.log(data.toString(),"datass");
        
      
        
          
        //   var file =  './test.mp3';
     
        
        //   var filename = path.basename(file);
        //   var mimetype = mime.getType(file);
        // console.log("mime type",mimetype)
        //   res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        //   res.setHeader('Content-type', mimetype);
        //   res.setHeader('charset',"utf-8");
          
        
        //   var filestream = fs.createReadStream(file);
        //   filestream.pipe(res);
    
        // var filePath = path.join(__dirname, '../Audio/test.mp3');
        // var readStream = fs.createReadStream(filePath);
        // readStream.on('data', function (data){
        //     // console.log("this is the datas",data.toString())
        
        //     var stat = fs.statSync(filePath);
        // console.log("readstream",stat.size)
        //     response.writeHead(206, {
        //         'Content-Type': 'audio/mp3'
        //     });
        
            
        //     // We replaced all the event handlers with a simple call to readStream.pipe()
        //     readStream.pipe(response);
       
        // })



        //audio

  //       const audiopath='./Audio/test.mp3'
  //     fs.readFile(audiopath,(err,datas)=>{
  //         if(err){
  //           console.log("This is the error",err);
  //           res.send(500);
  //         }
  //         else{
  //           // res.writeHead(200,{'Content-Disposition': 'attachment; filename="download.mp3"'})
  // // res.end(datas,null)
  // res.download('./test.mp3',"dummy.mp3",err=>{
  //   console.log("This is the error",err)
  // })
  //         }
  //       });
      
// datas.pipe(res)
        const audioPath = "./Audio/test.mp3";
        const audioSize = fs.statSync("./Audio/test.mp3").size;
        console.log(audioSize,"size")
        // const range = req.headers.range;
      
        const CHUNK_SIZE = audioSize; // 1MB
        const start = 0
        const end = Math.min(start + CHUNK_SIZE, audioSize - 1);
      
        // Create headers
        const contentLength = end - start + 1;
        console.log("this is the content length",contentLength)
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${audioSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "audio/mp3"
        };
      
        // HTTP Status 206 for Partial Content
        res.writeHead(200, headers);
      
        // create video read stream for this particular chunk
        const audioStream = fs.createReadStream(audioPath);
 
        // Stream the  chunk to the client
       
        audioStream.pipe(res);





















  //   const range = req.headers.range;
  // if (!range) {
  //   res.status(400).send("Requires Range header");
  // }

  // // get video stats (about 61MB)
  // const videoPath = "./Audio/video1.mp4";
  // const videoSize = fs.statSync("./Audio/video1.mp4").size

  // // Parse Range
  // // Example: "bytes=32324-"
  // const CHUNK_SIZE = 10 ** 6; // 1MB
  // const start = Number();
  // const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // // Create headers
  // const contentLength = end - start + 1;
  // const headers = {
  //   "Content-Range": `bytes ${start}-${end}/${videoSize}`,
  //   "Accept-Ranges": "bytes",
  //   "Content-Length": contentLength,
  //   "Content-Type": "video/mp4",
  // };

  // // HTTP Status 206 for Partial Content
  // res.writeHead(206, headers);

  // // create video read stream for this particular chunk
  // const videoStream = fs.createReadStream(videoPath, { start, end });

  // // Stream the video chunk to the client
  // videoStream.pipe(res);
    })
    pythonProcess.stderr.on('data',function(data){
        console.log("This is the data",data.toString())
    })
})

module.exports=router