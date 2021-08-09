<template>
  <div>
    <div class="A_0">
    <div class="A_1">
      <span>Paper Cast</span>
    </div>
    <div class="A_B_3">
      <div class="A_2">

        <form @submit.prevent="file_upload" enctype="multipart/form-data">


                    <i class="fas fa-folder-plus" id="folder_icon"></i>


                    <input type="file" @change="select_file" ref="file">
                          
                      <button><i class="fas fa-upload" ></i></button>
    </form>
    </div>
    </div>
    
  
   <div v-show="active" class="A_3">
         <HalfCircleSpinner
  :animation-duration="1000"
  :size="60"
  color="#ff1d5e"
/>
</div>
   </div>
  <div class="B_1">
<div class="B_2">
  
  <section v-if="volumeactive">
       <i class="fa fa-volume-up" aria-hidden="true" id="volume_icon" @click="mute_sound"></i>
  </section>
  <section v-else @click="unmute_sound">
     <i class="fas fa-volume-mute"></i>
  </section>
</div>


<div class="B_3"> 
  <input type="range" min="0" max="100" value="50" id="slider">
</div>
<div>
 <i class="fas fa-download"></i>
</div>
  
<div class="B_4">
  <section v-if="playAudioIcon" @click="play" >
    <i class="fas fa-play"></i>
  </section>
  <section v-else @click="pause">
    <i class="fas fa-pause-circle" @click="playAudioIcon=true" ></i>
  </section>
</div>
    
    <div class="B_5" >
      <section id="my_div" v-on:dblclick="find_index" >
      
       <span v-html="list" v-for="list in display_contents" :key="list" id="span"  ></span>
      </section>
      
      </div>
    <div class="B_6">Images will appear here</div>

   </div>
  </div>
</template>


<script>
import axios from "axios";
import { HalfCircleSpinner } from 'epic-spinners'
// import slotpara from "./slots/slotpara.vue";
export default {
components:{
// slotpara,
HalfCircleSpinner
},
  data(){
    return{
      count:0
      ,
      file:'',
      display_contents:[],
      arrs:[],
      goodstring:'',
      goodlist:[],
      voicedata:[],
      base64arr:'',
      Gendervoice:'',
      volume:null,
      pitch:null,
      active:false,
    voicearr:[],
    volumeactive:true,
    playAudioIcon:true
    }
  },
  unmounted() {

  },
  
   watch:{



    }
  ,
  
  
  methods:{
    mute_sound(){
      this.volumeactive=false;
      document.getElementById('slider').value='0'
      
      

    },
    unmute_sound(){
      
       this.volumeactive=true;
      

       
    }
    ,
      indexval(indexvalue){
   return new Promise(()=>{

// window.speechSynthesis.pause();
      this.voicearr=this.voicedata.filter((element,index)=>{
  console.log("this.0",this.voicearr)
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
    },
   async playAudio(index=0,text){
      console.log("this is play audio",index);
     this.indexval(index)
   
console.log("this is the text",text)
       var msg = new SpeechSynthesisUtterance();
msg.text =this.voicearr;
window.speechSynthesis.speak(msg);
     

//       axios.get('http://localhost:4000/upload/playaudio',{params:{index:index,display:this.display_contents}})
//       .then(async(res)=>{
//         console.log("this is the resolved",typeof(res.data),res.data);
        
//         var base64converted=btoa(unescape(encodeURIComponent(res.data)))
    
//         this.base64arr=base64converted
//        console.log('base64',base64converted)
// var duration_len=document.getElementById('audiotag').duration;

  
//          await axios.get('http://localhost:4000/upload/playaudio/delete',{params:{
//          filename:1
//        }})
//        .then(resp=>{
//          console.log("this is working",resp)
//          setTimeout(()=>{
//            return resp;
//          },duration_len)
         
//        })
//        .catch(err=>{
//          console.log("this is the error",err)
//        })

   
      
       
        

//       })
//       .catch(err=>{
//         console.log("this is the error from audio",err)
//       })




    

    },
   async find_index(event){
      
console.log("index",event.target);
const el=event.target
  const index = [...el.parentElement.children].indexOf(el)
  console.log("index",index)
  // var currenttime=document.getElementById('audiotag').currentTime;
  // var duration_len=document.getElementById('audiotag').duration;
  
  this.playAudio(index,this.voicedata)
  
 
    }
    ,
    async file_upload(){
      const formdata=new FormData();
this.active=true
      formdata.append('pdf',this.file);
      await axios.post('http://localhost:4000/upload',formdata)
      .then(resp=>{
        const data=resp.data;
        // const textdata=data.split('~~~')
        // const voicedata=data.split('<br>~~~');
        this.active=false;
        const textdata=resp.data
        const voicedata=resp.data
        console.log("this is the text",textdata[5],"dsf",textdata[50])
        console.log("this is the type",typeof(resp.data))
        console.log("data",data);
        this.voicedata=voicedata

        this.display_contents=textdata;
      })
      .catch(err=>{
        this.active=false
        console.log("this is error post",err)
      })    }
      ,


      volumeUp(){

        SpeechSynthesisUtterance.rate++;

      },
      volumeDown(){
       SpeechSynthesisUtterance.rate--;

      },
      pause(){
        this.playAudioIcon=true
        if (speechSynthesis) {
      speechSynthesis.pause();
    }
      },
      play(){
        this.playAudioIcon=false;
        if (speechSynthesis) {
      speechSynthesis.resume();
    }
      }
  }
  
}
</script>

<style scoped>

.A_0{
  width: 100%;
  height: 20vh;
  background-color: red;
  position: relative;
    display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  
  
}
.A_1{
  width: 60px;
  height: 20px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
}
.A_1 span{
  font-size: 30px;
  font-family: 'Indie Flower', cursive;
  
}






.B_1{
  width: 100%;
  height: 70vh;
  background-color: blue;
}
</style>