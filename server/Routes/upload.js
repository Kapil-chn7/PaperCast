const express=require('express')
const router=express.Router()
const multer=require('multer')
const {Storage}=require('@google-cloud/storage')
const fs=require('fs')
const spawn = require("child_process").spawn;
const path=require('path')
const storage=multer.memoryStorage()
const uploadpdf=multer({storage:storage})
router.post('/',uploadpdf.single('pdf'),(req,res)=>{
    console.log("req.file",req.file);
    const ip=req.ip;
    const filename=req.file.originalname
    const time=Date.now()
    const name=time+'_'+filename
    console.log("this is file name",name)

  pdffullpath=path.join(__dirname,`../multer/${name}`)
    fs.writeFile(pdffullpath, req.file.buffer, {encoding: 'base64'},async function(err){
        if(err){
            console.log("this is error",err)
            res.sendStatus(500)
        }
        else{

console.log("Inside of the upload.js file")

            // const gcs = new Storage({
            //     projectId: 'speedy-volt-304518',
            //     keyFilename: path.join(__dirname,'../speedy-volt-304518-c9d6f176864a.json')
            //   });
            //   const bucket = gcs.bucket('papercast');
            //   bucket.upload(pdffullpath, function(err, file) {
            //     if (err) throw new Error(err);
            //   });

            console.log("hi")

            //not here

async function uploadtocloud(element){

  const gcs = new Storage({
    projectId: 'speedy-volt-304518',
    keyFilename: path.join(__dirname,'../speedy-volt-304518-c9d6f176864a.json')
  });
  const bucket = gcs.bucket('papercast');
  return new Promise(async(resolve,reject)=>{

    await bucket.upload(`./Images/${name}/${element}`, {
      destination:'destination',
      
      metadata:{
        metadata:{
          userProperty:name
        }
      }
    },function(err, file) {
      if (err) {
          console.log('errorsss',err)
          reject("rejected")
         //  return res.sendStatus(500);
      }
      else{
        console.log("this is the else from the res.send")
          
       resolve("resolved")


      }
    });


  })

  
}

            
                console.log('File created');
             
            
      
              console.log("this is the upload")
              const pythonProcess = spawn('C://Users//hp//AppData//Local//Programs//Python//Python39//python.exe',["dummy.py",`./multer/${name}`,name]);
              let result=''
               pythonProcess.stdout.on('data', function (data){
                
                result+=data.toString();
            fs.readFile(`./text/${name}.txt`, 'utf8', (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err)
                    return
                }
                // console.log('File data:', jsonString) 
                
              
              fs.readdir(`./Images/${name}`, (err,files)=>{

                if(err){
                  console.log("this is the error fs.readdir ",err)
                  res.send(500)
                }
                else{
console.log(files,"files")
                   async function delete_files(){


                    return new Promise(async(resolve,reject)=>{

                      

                      for(const element of files){
                        console.log(element,"erlr")
                        const uploadtocloudPDF=await uploadtocloud(element);

   
                      }
                      console.log("this is after");
                      resolve("resolved")



                      

                    })
 
                  }

                  delete_files().then((resp)=>{
                  


                      
console.log('resolved',resp)
                      //unlinking the files from the folder

console.log("unlink section")
                      fs.unlink(`./multer/${name}`,(err)=>{

                       if(err){
                         console.log("This is the errorsssss",err);
                         return res.sendStatus(500);
                       }
                       else{
                         //delete the Images/folder from the server
                         fs.rmdir(`./Images/${name}`, { recursive: true },(err)=>{

                           if(err){
                             console.log("This is the error",err);
                            return res.sendStatus(500);
                           }
                           else{

                             fs.unlink(`./text/${name}.txt`,(err)=>{
                               if(err){
                                 console.log("This is the error",err);
                                 return res.sendStatus(500);
                               }
                               else{
                                 console.log("this is working")
                                 res.send(jsonString)
                               }
                             })
                           }

                         })
                       }
                     })





                   
                  })
                  .catch((err)=>{
                    console.log("this is the error",err)
                    res.sendStatus(500)
                  })
     
                }
              })
                
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


            ////not here
        }
        
    })



})

module.exports=router










