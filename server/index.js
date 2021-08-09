const express=require("express")
const app=express()
const PORT=process.env.PORT || 4000;
const cors=require('cors')
const multer=require('multer')
const fs=require('fs')
const routes=require('./Routes/upload')
const spawn = require("child_process").spawn;
const { memoryStorage } = require("multer");
// const pythonProcess = spawn('C://Users//hp//AppData//Local//Programs//Python//Python39//python.exe',["dummy.py"]);
const axios =require("axios")
const path=require('path')
const {Storage, Bucket} = require('@google-cloud/storage');
const storage=multer.memoryStorage()
const uploads=multer({storage:storage})
const router_audio=require("./Routes/playAudio")
app.use(cors())
// pythonProcess.stdout.on('data', function (data){
//   console.log("this is data",data.toString())
// });

// pythonProcess.stderr.on('error',err=>{
//   console.log("this si the err",err)
// })
// pythonProcess.stdout.on('end',function(data){
//   console.log("end",data);
// });
// pythonProcess.stderr.pipe(process.stderr);
app.listen(PORT,()=>{
  console.log(`Server listening at port ${PORT}`)
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//upload pdf here

app.post('/uploadPdf',uploads.single('pdf'),async (req,res)=>{
  // console.log(req.file.originalname);
  // console.log(req.ip,"this si ip")
  const base64pdf=req.file.buffer
  const ip=req.ip
  console.log(typeof(ip))
  const pdfname=`${Date.now()}_${req.file.originalname}`
  const pdffullpath=`./multer/${pdfname}`

  // console.log(req.file.buffer.toString())
  console.log("this is the full path",pdffullpath)
  fs.writeFile(pdffullpath, base64pdf, {encoding: 'base64'}, async function(err) {
    if(err){
      return console.log("err",err)
    }
    console.log('File created');
    // await axios.get("http://localhost:4000/getpdfFilePath",{params:{
    //   pdfpath:pdffullpath
    // }})
    // .then(resp=>{
    //   console.log("this is working");
    //   res.send("Success")
    // })
    // .catch(err=>{
    //   console.log("this is the error",err);
    //   res.sendStatus(500)
    // })
})
// .then(async response=>{
//   console.log("Making get request to /uploads");
//   await 
// })
// .catch(errs=>{
//   console.log("this is the error")
//   res.sendStatus(500)
// })
// const pythonProcess = spawn('C://Users//hp//AppData//Local//Programs//Python//Python39//python.exe',["dummy.py","convertPdf_to_text"]);
// pythonProcess.stdout.on('data', function (data){
//   console.log("this is data",data.toString())
//   const text=data.toString();
//   console.log("text",text)
// });
  
  // res.json({file:req.file})
  
})

app.get('/uploadPdfs',async(req,res)=>{
  console.log("this is the upload")
  const pythonProcess = spawn('C://Users//hp//AppData//Local//Programs//Python//Python39//python.exe',["dummy.py"]);
  let result=''
   pythonProcess.stdout.on('data', function (data){
    console.log("this is data",data.toString())
    result+=data.toString();
fs.readFile('./pdftext.txt', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    console.log('File data:', jsonString) 
    res.send(jsonString)
})
 
  })
 pythonProcess.stderr.on('data',(data)=>{
   console.log("this is the data from the error",data.toString())
 })
  // pythonProcess.stdout.on('end',(err)=>{
  //   try{
  //     console.log("this is from the try",result)
  //   }
  //   catch{
  //     console.log("this is form the errore",err)
  //   }
  // })
  
})
app.get("/destroyed",(req,res)=>{
  console.log("Inside of the response");
  const fs = require('fs').promises;

const directory = 'Images';

fs.rmdir(directory, { recursive: true })
  .then(() => console.log('directory removed!'))
  .catch(err=>{
    console.log("this is the error",err)
  })
})

app.get('/getpdfFilePath',(req,res)=>{

 

// Creates a client
// const storage = new Storage();
// Creates a client from a Google service account key.
// Imports the Google Cloud client library
// const {Storage} = require('@google-cloud/storage');

// // Creates a client
// // const storage = new Storage();
// // Creates a client from a Google service account key.
// const storage = new Storage({keyFilename: path.join(__dirname,'/speedy-volt-304518-c9d6f176864a.json'),
// projectId:'speedy-volt-304518'});

// /**
//  * TODO(developer): Uncomment these variables before running the sample.
//  */
// const bucketName = 'papercast12';

// async function createBucket() {
//   // Creates the new bucket
//   await storage.createBucket(bucketName);
//   console.log(`Bucket ${bucketName} created.`);
// }

// createBucket().catch(console.error);





//this is upload





// const gcs = new Storage({
//   projectId: 'speedy-volt-304518',
//   keyFilename: path.join(__dirname,'/speedy-volt-304518-c9d6f176864a.json')
// });
// const bucket = gcs.bucket('papercast');
// bucket.upload('pdftext2.txt', function(err, file) {
//   if (err) throw new Error(err);
// });




//this is the delete section



const storage = new Storage({
  projectId: 'speedy-volt-304518',
  keyFilename: path.join(__dirname,'/speedy-volt-304518-c9d6f176864a.json')
});

async function deleteFile() {
  // Deletes the file from the bucket
  await storage.bucket('papercast').file('pdftext.txt').delete();

  console.log(`deleted`);
}

deleteFile().catch(console.error);
  // console.log("isnide of the get pdf path")
  // console.log(req,"this is the params")
  res.send("getpdfFilePath")
})


 app.use('/upload',routes);

// app.post('/upload',(req,res)=>{
//   console.log("hi");
//   res.send([
//   'this is the key onethis is the key onethis is the key onethis is the key one<br>',
//     "this is the key this is the key onethis is the key one2<br>",
//   "this is the key3vthis is the key onethis is the key one<br>",
//     "this is the keythis is the key one 4"
//   ])



// })

//Audio section

app.use("/upload/playaudio",router_audio)

app.get('/upload/playaudio/delete',(req,res)=>{
  fs.unlink('./Audio/test.mp3',(err)=>{
    if(err){
      console.log(err,"this is the error0")
      res.sendStatus(500)
    }
    else{
      console.log("deleted");
      res.sendStatus(200)
    }
  })
})

// app.get('/',(req,res)=>{
//   res.sendFile(__dirname+'/index.html')
// })

// app.get("/video", function (req, res) {
//   const range = req.headers.range;
//   console.log("This is the valaue of the range",range)
//   if (!range) {
//     res.status(400).send("Requires Range header");
//   }

//   // get video stats (about 61MB)
//   const videoPath = "./video1.mp4";
//   const videoSize = fs.statSync("./video1.mp4").size

//   // Parse Range
//   // Example: "bytes=32324-"
//   const CHUNK_SIZE = 10 ** 6; // 1MB
//   const start = Number(range.replace(/\D/g, ""));
//   const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//   // Create headers
//   const contentLength = end - start + 1;
//   const headers = {
//     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "video/mp4",
//   };

//   // HTTP Status 206 for Partial Content
//   res.writeHead(206, headers);

//   // create video read stream for this particular chunk
//   const videoStream = fs.createReadStream(videoPath, { start, end });

//   // Stream the video chunk to the client
//   videoStream.pipe(res);
// });
