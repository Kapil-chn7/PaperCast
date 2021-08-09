<template>
  <div>
    <div class="A_0">


      

      <div class="menuicon"  >

        <span v-if="menuValue" @click="menuValueFunction">
        <i class="fas fa-bars" id="menuIconValue"></i>
      <span class="button__text"><label for="menuIconValue">MENU</label></span>
        </span>
        <span v-else @click="menuValueFunction">
          <i class="fas fa-chevron-left" id="menuIconValue"></i>
        </span>
      </div>
   

    <div class="sidebarmenu" id="sidebar" v-show="menuValue!=true">
   <ul class="menulist">
     <li>Home</li>
     <li>About us</li>
     <li>Products</li>
     <li>Contact Us</li>
   </ul>
      </div>
      
  
    <div class="A_1">
      <span>Paper Cast</span>
    </div>

    <form @submit.prevent="file_uploadFile" enctype="multipart/form-data">
      <div class="A_2">

    


              

   
       


             <section class="choosefilecomp">    
               <button class="button">
                    <input type="file" @change="select_file" ref="file" id="chooseFile">
                    <label for="chooseFile">
                       <span class="button__icon"><i class="fas fa-folder-plus" id="folder_icon"></i></span>&nbsp;
                      
                      <span class="button__text">
                      Choose file  </span></label>
                    </button>
                      </section>
               <section class="uploadfilecomp"> 
                 <button type="button" class="button">     
                     <span class="button__icon">
                      <i class="fas fa-upload" id="uploadFile" type="button" ></i>
                    
                      </span>
                      <span id="uploadFile" class="button__icon">
                        Upload
                        </span>
                      <!-- <label for="uploadFile">
                        
                      
                      </label> -->
                       
                      </button> 
                </section>

   
    </div>
    
    </form> 
 
   </div>
     <div v-show="active" class="A_3">
         <HalfCircleSpinner
  :animation-duration="1000"
  :size="60"
  color="#ff1d5e"
/>
</div>
  <div class="B_1">
<div class="B_2">
  
  
       <button class="button" v-if="volumeactive">
      <span class="button__icon"> <i class="fa fa-volume-up" aria-hidden="true" id="volume_icon" @click="mute_sound"></i></span>
       <span class="button__text"><input type="range" min="0" max="100" value="50" id="slider" @change="valueOfaudio"></span>
       </button>
       

  
    <button class="button" v-else @click="unmute_sound">
     <span class="button__icon"> <i class="fas fa-volume-mute"></i></span>
     <span class="button__text"><input type="range" min="0" max="100" value="0" id="slider" @change="valueOfaudio"></span>
    </button>
    

</div>



  
<div class="B_4">
   <button class="button" id="downloadIcon">
 <span class="button__icon"><i class="fas fa-download"></i></span>
 </button>
    <button class="button" v-if="playAudioIcon" @click="play" id="pause">
    <span class="button__icon"><i class="fas fa-play"></i></span>
    </button>
  
 
    <button class="button" v-else @click="pause" id="pause">
    <span class="button__icon"><i class="fas fa-pause-circle" @click="playAudioIcon=true" ></i></span>
    </button>
  
</div>
    
   </div>


   <div class="B_0">

        <div class="B_5" >
          <h1>Text will appear here</h1>
      <!-- <section id="my_div" v-on:dblclick="find_index" >
      
       <span v-html="list" v-for="list in display_contents" :key="list" id="span"  ></span>
      </section> -->
      
      </div>
    <div class="B_6">Images will appear here</div>
   </div>
  </div>
</template>


<script>

import { HalfCircleSpinner } from 'epic-spinners'
// import slotpara from "./slots/slotpara.vue";
export default {
components:{
// slotpara,
HalfCircleSpinner
},

  data(){
    return{
      count:0,
      menuValue:true
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
  

methods:{
menuValueFunction(){
this.menuValue=!this.menuValue;

document.getElementById('sidebar').classList.toggle('menuValue1')

},
    mute_sound(){
      this.volumeactive=false;
      document.getElementById('slider').value='0'
      
      

    },
    unmute_sound(){
      
       this.volumeactive=true;
      

       
    }
      ,


      volumeUp(){

       

      },
      volumeDown(){
      

      },
      pause(){
        this.playAudioIcon=true
     
      },
      play(){
        this.playAudioIcon=false;
     
      },
      valueOfaudio(){
        if(document.getElementById('slider').value==0){

               this.volumeactive=false;
      
        }
        else{
          this.volumeactive=true;
        }
      },
      file_uploadFile(){
        alert("jo")
       this.emitter.emit("postPdf",this.file);
        console.log("This is from the post");
      }
  }

  
}
</script>

<style scoped>

.A_0{
  width:100%;
  height: 200px;
  border:0px solid blue;
  position: relative;

}

.A_1{
  width:60%;
  height: 80px;
  border: 0px solid black;
  position: absolute;
}
.A_2{
  width:50%;
  height:50px;
  border:0px solid green;
  position: absolute;
  left:40px;
  top:120px;
  display: flex;
  justify-content: space-evenly
}

.A_1 span{
  font-size: 60px;
  font-family: 'Indie Flower', cursive;
  
}
.A_2{
font-size: 30px;
}
input[type="file"]{
  display: none;
  
}




.downloadAudiofile{
  font-size: 30px;
}
.B_1{

  width:70%;
  height: 100px;
  position:relative;
  
 

}
.B_1 div{
  display: inline-block;
 position: relative;
  border: 0px solid black;

  width:200px;
  height:30px
}
.B_4{
font-size: 30px;
position:relative
}



.button{
display: inline-flex;
height: 50px;
padding: 0px;
background-color: #009578;
border:none;
outline: none;
border-radius: 5px;
overflow: hidden;
font-family: 'Quicksand',sans-serif;
font-size: 16px;
font-weight: 500;
cursor: pointer;
}
.button:hover{
  background-color: #008168;
}
.button:active{
  background-color: #006e58;


}
.button__icon,
.button__text{
  display: inline-flex;
  align-items: center;
  padding: 0 24px;
  color: #fff;
  font-size:25px;
  margin-top: 10px;
}
.B_2{
  
  border: 5px solid black;

  position:relative;
  top: 0px;
  left:10px;
}
.B_4{
    width:150px;
  height: 90px;
 
  position:relative;
  top: 0px;
  left:80px;
}


#downloadIcon{
position: relative;
left: 30px;
}
#pause{
position: relative;
left: 40px;
}
#menuIcon{
  position: absolute;
  left: 30px;
  
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  top:35px;
}
#menuIcon i{
  margin: 10px;
  width: 50px;
  font-size: 30px;

}

.B_0{
  position: relative;
  border:1px solid black;
  width:80%;
  height: 500px;
}
.B_5{
position: absolute;
border:1px solid black;
width: 600px;
height:500px
}
.B_6{
  position: absolute;
  border: 1px solid red;
  width: 500px;
  height: 500px;
  right: 10px;
}


.menuicon{
position:absolute;
top:0px;
left:10px;
background-color: black;
width:380px;
height: 50px;
z-index: 1;

}
.menuicon i{
  font-size: 40px;
}

.sidebarmenu{
  position: absolute;
  top:70px;
  width: 400px;
  height: 450px;
  background-color: black;
  z-index: 1;

}
.menulist li{
  font-size: 30px;
  text-decoration: none;
  margin: 10px;
  color: white;
}
.menuValue1{
  transform: translateX(-400px);
}
</style>