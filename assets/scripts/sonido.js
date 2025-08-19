function loadTrack(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error cargando")
        data.callBack(null)
    })
}

var audio_background = null
var audio_background_status = false

function playAudioBackground(data,autostart){
    audio_background = data
    audio_background.volume = 0.2
    audio_background.addEventListener('ended', endAudioBackground, false)
    if(autostart){
        toggleAudioBackground()
    }
}

function endAudioBackground(){
    if(audio_background_status){
        audio_background.play()
    }
}

function toggleAudioBackground(){
    if(audio_background_status){
        audio_background_status = false
        //getE('sonido-btn').className = 'sonido-btn-off'
        audio_background.pause()
    }else{
        audio_background_status = true
        //getE('sonido-btn').className = 'sonido-btn-on'
        audio_background.play()
        .then(function (){
            console.log("play background")
        })
        .catch(function(error){
            console.log(error)
        })
    }
}