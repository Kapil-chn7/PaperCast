<template>
  <div>
  <headercomp/>
    {{voiceIndex}}
   <!-- Audio: <audio controls="controls" autobuffer="autobuffer" autoplay="autoplay" loop id="audiotag">
    <source src="blob:http://localhost:8080/"  />
</audio> -->
<!-- </h1> -->
    <form @submit.prevent="file_upload" enctype="multipart/form-data">

      select file:<input type="file" @change="select_file" ref="file">
    <button>Upload File</button>
    </form>
    <button>Pause</button>
    <button @click="volumeUp">Volume Up</button>
    <button @click="volumeDown">Volume down</button>
    <button @click="play">Play</button>
    <button @click="pause">Pause</button>
    <div class="col-2" ><section id="my_div" v-on:dblclick="find_index" >
      
       <span v-html="list" v-for="list in display_contents" :key="list" id="span"  ></span>
      </section></div>
    <div class="col-3">Images will appear here</div>

<a :href="url" download="kapil">download</a>

   
  </div>
</template>


<script>
import headercomp from "./headerComp"
import axios from "axios";
import { ref } from 'vue'

// import slotpara from "./slots/slotpara.vue";
export default {
components:{
// slotpara,
headercomp

},
setup(){
var voiceIndex= ref(0);
var display_contents=ref([])
return {voiceIndex,display_contents};
},
  data(){
    return{
      file:'',
      arrs:[],
      goodstring:'',
      goodlist:[],
      voicedata:[],
      base64arr:'',
      Gendervoice:'',
      volume:null,
      pitch:null,
    voicearr:[],
    url:'',
    currentTime:null


    ,
    container:[],
    currentIndex:0,
    playingindex:0,
    demo:0,
    voiceIsPlaying:false

    }
  },
  
  watch:{
    

    
     container:{  handler(){

const that=this;
// console.log("THis is the value of the container",this.container.length)
const val=this.voicedata.filter((word,indexval)=>{
if(indexval>=this.voiceIndex && indexval<=this.voiceIndex+2){
return word
}
})
      if(that.container.length<=3){
        const ind=3;
        const obj={text:val}
        axios({
          method:'get',
          url:'http://localhost:4000/upload/playaudio',
          params:obj,
          responseType:'blob'
        })
        .then((res)=>{

        
        const blobs=new Blob([res.data],{type:'audio/mp3'});
        // console.log("This is the blob",blob1)
        const urlblob=URL.createObjectURL(blobs);
        // console.log("This is urlblob",urlblob)
        console.log("before",this.container);
      that.container.push(urlblob);
        console.log("After",that.container);
        
        this.voiceIndex+=ind;

        })
        .catch(err=>{
          console.log("This is the error",err)
        })

      }
     },
     deep:true
     }
    }
  ,
  
  
  methods:{
      indexval(indexvalue){
   return new Promise(()=>{

// window.speechSynthesis.pause();
      this.voicearr=this.voicedata.filter((element,index)=>{
  // console.log("this.0",this.voicearr)
      if(index >=indexvalue){
        return true;
      }
    })
  

    
   })

   
  }
    ,
    select_file(){
      this.file=this.$refs.file.files[0];
    },
    cropped_array(index,total_lines){
      for(var i=index;i<total_lines;i++){
        console.log("hi")
      }
    }
    
    // async audioMiddleware(obj){
    //   return new Promise((resolve,reject)=>{
    //     console.log("this is the audioMiddleware");
    //     axios({
    //       method:'get',
    //       url:'http://localhost:4000/upload/playaudio',
    //       responseType:'blob',
    //       params:obj
    //     })
    //     .then((res)=>{
    //       console.log("This is the error");
    //       const blob=new Blob([res.data],{type:'audio/mp3'});
    //       const blobarr=blob()
    //     })
    //   })
    // }
    
    ,
   async playAudio(index=0){
     this.indexval(index);
     
     
   const that=this;



const val=that.voicedata.filter((word,indexval)=>{
if(indexval>=index && indexval<=index+1){
return word
}
})
console.log("This is the filtered array",val);




     
    //  const obj={index:index,display:this.display_contents};
    
     console.log("This is the value of the voiceis playing",this.voiceIsPlaying)

if(this.voiceIsPlaying==false){

     axios({method:'get',
     url:'http://localhost:4000/upload/playaudio',
     responseType:'blob',
     params:{text:val}})
     .then(async resp=>{
      //  console.log("this is the blobsss",resp.data,resp);
             const blob1=new Blob([resp.data],{type:'audio/mp3'})
      // console.log("THis is the response of the data",resp.data,resp)
      console.log("Resp.data",resp.data)

      const urls=URL.createObjectURL(blob1);
      // console.log("this is urls",urls)
      //  console.log("this is the container",this.container.length)
      that.container.push(urls);
      console.log("This .container items",this.container)
const audio=new Audio(that.container.shift(0));
      
     
      // console.log("THis is teh conteai",this.container(0))
     audio.onloadeddata = function() {
       audio.play()
        audio.onended=function(){
         
          

   console.log("This is after giberish");
   that.voiceIsPlaying=true;
   console.log("true or not",that.voiceIsPlaying);
    index+=2;
   this.voiceIndex=index;
   console.log("This is the voice index!!!!",this.voiceIndex)
      that.playAudio(this.voiceIndex);
     
  // console.log("This is the audio.onended")
 }
 

  
};
     
  
     })
     .catch(err=>{
       console.log("This is the error",err);
     })
}


else{
  console.log("this si the 1")
  const audio=new Audio(that.container.shift(0));
 console.log("Thsi is the container form else",that.container)
    audio.play();
    audio.onended=function(){
       that.playAudio(index);
        index+=2;
        this.voiceIndex=index;
    }
  
}
     



    

    },
   async find_index(event){
      
// console.log("index",event.target);
const el=event.target
  const index = [...el.parentElement.children].indexOf(el)
  // console.log("index",index)
  // var currenttime=document.getElementById('audiotag').currentTime;
  // var duration_len=document.getElementById('audiotag').duration;
  
  this.playAudio(index,this.voicedata)
  
 
    }
    ,
    async file_upload(){
      const formdata=new FormData();
// console.log("clicked")
      formdata.append('pdf',this.file);
      await axios.post('http://localhost:4000/upload',formdata)
      .then(resp=>{
        const dataOFaudio=resp.data;
        const textdata=dataOFaudio.split('~~~')
        const voicedata=dataOFaudio.split('<br>~~~');
        
    
        // const textdata=resp.data
        // const voicedata=resp.data
        // console.log("this is the text",textdata[5],"dsf",textdata[50])
        // console.log("this is the type",typeof(resp.data))
        // console.log("data",data);
        this.voicedata=voicedata

        this.display_contents=textdata;
      })
      .catch(err=>{
        console.log("this is error post",err)
      })    }
  
  }
  
}
</script>

<style scoped>
/* .col-2{
  border: 1px solid black;
  width:100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-content: center;
  overflow: scroll;
  cursor: pointer;
  }
  .col-3{
  border: 1px solid black;
  width:50%;
  height: 40vh;
  }
  section span{
    background-color: red;
    
  } */
</style>