var i = 0;
var j = 0;
var k = 0;

var frases_completadas = 0;

function getRand(minimum,maximum){
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomnumber;
}

var r = 0;
var a = 0;
var vueltas = 0;
var eje = false; //detecta la dimension entre 360 y 0
var retrocede_ruleta = true;
var parando_ruleta = 0;

var secciones = [
    /*[45,134],
    [315,44],
    [135,224],
    [225,314]*/
    45,
    315,
    135,
    225
]

var final_seccion = 0;
var check_carta = false;
function checkCarta(c){
    var completed = 0;
    var seccion_completed = false;
    if(c==1){
        for(i = 0;i<cartas_data_1.length;i++){
            if(cartas_data_1[i].completed){
                completed++
            }
        }
        if(completed==cartas_data_1.length){
            seccion_completed = true;
        }
    }else if(c==2){
        for(i = 0;i<cartas_data_2.length;i++){
            if(cartas_data_2[i].completed){
                completed++
            }
        }
        if(completed==cartas_data_2.length){
            seccion_completed = true;
        }
    }else if(c==3){
        for(i = 0;i<cartas_data_3.length;i++){
            if(cartas_data_3[i].completed){
                completed++
            }
        }
        if(completed==cartas_data_3.length){
            seccion_completed = true;
        }
    }else if(c==4){
        for(i = 0;i<cartas_data_4.length;i++){
            if(cartas_data_4[i].completed){
                completed++
            }
        }
        if(completed==cartas_data_4.length){
            seccion_completed = true;
        }
    }
    return seccion_completed;
}

var animacion_ruleta = null;
var girando = false;
var final_rotate = 0;

function girarRuleta(){
    //final_seccion = 2
    //final_rotate = 0
    //setCarta()

    if(!girando){
        girando = true;
        getE('girar-btn').className = 'girar-btn-locked'

        eje = false;
        a = 5;
        final_seccion = getRand(1,4)
        //final_seccion = 3
        check_carta = checkCarta(final_seccion)
        while(check_carta){
            final_seccion = getRand(1,4)
            check_carta = checkCarta(final_seccion)
            console.log("no mas cartas de : "+final_seccion+" por favor")
        }

        if(final_seccion==1){
            final_rotate = 90
        }else if(final_seccion==2){
            final_rotate = 0
        }else if(final_seccion==3){
            final_rotate = 180
        }else if(final_seccion==4){
            final_rotate = 270
        }
    
        var angulo = getRand(1,90)
        /*final_rotate = secciones[final_seccion-1]+angulo
        if(final_rotate>360){
            final_rotate = (final_rotate-360)
        }*/

        vueltas = 0;
        parando_ruleta = 0;
        retrocede_ruleta = true;
        ruleta_volumen = 1;
        console.log("final_rotate: "+final_rotate+'-'+angulo)
    
        animacion_ruleta = setInterval(function(){
            if(parando_ruleta==0){
                if(retrocede_ruleta){
                    r-=a
                    a--
                    if(a==0){
                        retrocede_ruleta = false;
                        audio_ruleta.volume = ruleta_volumen;
                        audio_ruleta.currentTime = 0;
                        audio_ruleta.play()
                        getE('ruleta-blur').className = 'ruleta-blur-on'
                    }
                }else{
                    r+=a
                    if(a>50){
                        a = 50
                    }else{
                        a+=2
                    }
                    if(r>360){
                        r = (r-360)
                        vueltas++;
                    }
        
                    if(vueltas==3){
                        //empezar a verificar
                        parando_ruleta = 1;
                    }
                }
            }else if(parando_ruleta==1){
                //console.log(r,final_rotate,eje)
                if(
                    r>=final_rotate&&
                    eje==true
                ){
                    //comenzar a frenar toda una vuelta
                    parando_ruleta = 2
                    getE('ruleta-blur').className = 'ruleta-blur-off'
                }else{
                    r+=a
                    if(r>360){
                        r = (r-360)
                        eje = true;
                    }
                }
            }else if(parando_ruleta==2){
                if(a<=1){
                    //empezar a devolverse de a 1 hasta llegar al ángulo que es
                    //normalmente quedan faltando muy poquitos angulos
                    //console.log("diferencia: ",r,final_rotate)
                    
                    parando_ruleta = 3;
                    a = 1;

                    if(r<final_rotate){
                        //no es necesario dar la vuelta
                        eje = true;
                    }else if(r>final_rotate){
                        eje = false;
                    }else{
                        console.log("parada perfecta")
                        pararRuleta()
                    }
                }else{
                    r+=a
                    a-=2
        
                    if(r>360){
                        r = (r-360)
                    }
                    //console.log("r: "+r)
                }

            }else if(parando_ruleta==3){
                r+=a
                if(r>360){
                    r = (r-360)
                    eje = true;
                }
                //console.log("r= "+r)

                if(ruleta_volumen>0){
                    audio_ruleta.volume = ruleta_volumen;
                    ruleta_volumen-=0.1;
                }
    
                if(r>=final_rotate){
                    if(eje==true){
                        r = final_rotate
                        
                        console.log("listo")
                        pararRuleta()
                    }else{
                        //siempre va a ser mayor R
                        var r1 = r-final_rotate;
                        if(r1<=20){
                            console.log("se pasó por muy poco, devolvamos")
                            parando_ruleta = 4;
                            a = 0.2;
                        }
                    }   
                }
            }else if(parando_ruleta==4){
                r-=a
                /*if(r<0){
                    r = 360-(r*-1)
                }*/

                if(r<=final_rotate){
                    console.log("listo 2")
                    r = final_rotate
                    pararRuleta()
                }
            }
            getE('ruleta-fondo').style.transform = 'rotate('+r+'deg)'
        },40)

        audio_click.play()
    }
}

function pararRuleta(){
    clearInterval(animacion_ruleta)
    animacion_ruleta = false

    //girando = false;
    //getE('girar-btn').className = '';

    audio_ruleta.pause()
    setCarta()
}

var errores_actuales = 0;
var segundos_inicio = 0;
var segundos_final = 0;
var segundos_actuales = 0;

var f = -1;
var check_frase = false;
function checkFrase(f,c){
    var completed = false;
    if(c==1){
        if(cartas_data_1[f].completed){
            completed = true;   
        }
    }else if(c==2){
        if(cartas_data_2[f].completed){
            completed = true;   
        }
    }else if(c==3){
        if(cartas_data_3[f].completed){
            completed = true;   
        }
    }else if(c==4){
        if(cartas_data_4[f].completed){
            completed = true;   
        }
    }
    
    return completed;
}

function setCarta(){
    getE('ruleta-container').className = 'ruleta-container-out'
    getE('ruleta').className = 'ruleta-off'
    getE('cortina').className = 'cortina-on'
    getE('carta').className = 'carta-on carta'+final_seccion

    if(final_seccion==1){
        cartas_data = cartas_data_1
    }else if(final_seccion==2){
        cartas_data = cartas_data_2
    }else if(final_seccion==3){
        cartas_data = cartas_data_3
    }else if(final_seccion==4){
        cartas_data = cartas_data_4
    }

    f = getRand(0,(cartas_data.length-1))
    //f = 2
    check_frase = checkFrase(f,final_seccion)
    while(check_frase){
        f = getRand(0,(cartas_data.length-1))
        check_frase = checkFrase(f,final_seccion)
        console.log("esta ya salió: "+final_seccion+'-'+f)
    }

    segundos_actuales = 0;
    segundos_final = 0;
    errores_actuales = 0;

    if(instrucciones_first){
        getE('instrucciones-scene-card-frase-p').innerHTML = instrucciones_frase_txt
        if(ismobile){
            getE('instrucciones-txt').innerHTML = instrucciones_label_cel
            getE('instrucciones').className = 'instrucciones-'+final_seccion+' instrucciones-on instrucciones-cel-on'
        }else{
            getE('instrucciones-txt').innerHTML = instrucciones_label_web
            getE('instrucciones').className = 'instrucciones-'+final_seccion+' instrucciones-on instrucciones-web-on'
        }
    }else{
        segundos_inicio = new Date().getTime();
    }   

    setPalabras()
}

var instrucciones_first = true;
var animacion_instrucciones = null;
function cerrarInstrucciones(){
    segundos_inicio = new Date().getTime();

    instrucciones_first = false;
    if(ismobile){
        getE('instrucciones').className = 'instrucciones-'+final_seccion+' instrucciones-off instrucciones-cel-on'
    }else{
        getE('instrucciones').className = 'instrucciones-'+final_seccion+' instrucciones-off instrucciones-web-on'
    }
    animacion_instrucciones = setTimeout(function(){
        clearTimeout(animacion_instrucciones)
        animacion_instrucciones = null

        getE('instrucciones').className = 'instrucciones-offf'
    },500)
}

function unsetCarta(){
    segundos_final = new Date().getTime()
    segundos_actuales = segundos_final-segundos_inicio

    usuario_data.historial.push({
        tipo: final_seccion,
        nfrase: parseInt(f+1),
        equivocaciones: errores_actuales,
        tiempo: convertTime(segundos_actuales),
        ntiempo: segundos_actuales
    })

    animacion_palabra_i = 0;
    animacion_palabras = setInterval(function(){
        if(animacion_palabra_i==orden_palabras.length){
            clearInterval(animacion_palabras)
            animacion_palabras = null;

            getE('carta').className = 'carta-off carta'+final_seccion
            
            animacion_carta = setTimeout(function(){
                clearTimeout(animacion_carta)
                animacion_carta = null;
                
                getE('palabras').innerHTML = ""
                orden_palabras = []

                getE('cortina').className = 'cortina-off'

                getE('contador-txt').innerHTML = frases_completadas+'/'+total_cartas

                //mirar si ya le salieron todas
                if(frases_completadas==total_cartas){
                //if(frases_completadas==5){
                    getE('ruleta-container').className = 'ruleta-container-off'
                    setMensajeFinal()
                }else{
                    getE('ruleta-container').className = 'ruleta-container-in'
                    getE('ruleta').className = 'ruleta-on'
                    girando = false;
                    getE('girar-btn').className = '';
                }
            },500)
        }else{
            getE('palabras').getElementsByTagName('button')[animacion_palabra_i].className = 'palabra-normal-off palabra-normal-locked palabra-normal-'+final_seccion
        }
        animacion_palabra_i++
    },100)
}

var orden_palabras = [];
var animacion_palabras = null;
var animacion_carta = null;
var animacion_palabra_i = 0;

function setPalabras(){
    initFrase()

    getE('frase-txt').innerHTML = cartas_data[f].frase

    while(orden_palabras.length<cartas_data[f].palabras.length){
        var n = getRand(0,(cartas_data[f].palabras.length-1))
        var n2 = false;
        for(i = 0;i<orden_palabras.length;i++){
            if(orden_palabras[i]==n){
                n2 = true;
            }
        }
        if(!n2){
            orden_palabras.push(n)
        }
    }
        
    for(i = 0;i<orden_palabras.length;i++){
        //los divs quedan 0,1,2,3 pero se colocan en desorden
        var ii = orden_palabras[i]
        getE('frase-txt').getElementsByTagName('div')[ii].removeAttribute('style')
        if(ismobile){
            getE('frase-txt').getElementsByTagName('div')[ii].setAttribute('onclick','clickFrase(this,'+ii+')')
        }
        getE('frase-txt').getElementsByTagName('div')[ii].setAttribute('data-filled','0')
        getE('frase-txt').getElementsByTagName('div')[ii].innerHTML = cartas_data[f].palabras[ii].palabra
        var ancho = getE('frase-txt').getElementsByTagName('div')[ii].offsetWidth
        getE('frase-txt').getElementsByTagName('div')[ii].style.width = ancho+'px'
        getE('frase-txt').getElementsByTagName('div')[ii].innerHTML = '<span style="visibility:hidden;">.</span>'

        var palabra_btn = document.createElement('button')
        palabra_btn.id = 'palabra-btn-'+ii
        if(ismobile){
            palabra_btn.setAttribute('onclick','clickPalabra(this,event)')
        }else{
            palabra_btn.setAttribute('onmousedown','downPalabra(this,event)')
        }

        palabra_btn.setAttribute('type','button')
        palabra_btn.setAttribute('data-p',ii)
        palabra_btn.className = 'palabra-normal-off palabra-normal palabra-normal-'+final_seccion
        palabra_btn.innerHTML = '<span>'+cartas_data[f].palabras[ii].palabra+'</span>'

        getE('palabras').appendChild(palabra_btn)
    }

    animacion_carta = setTimeout(function(){
        clearTimeout(animacion_carta)
        animacion_carta = null;
        
        animacion_palabra_i = 0;
        animacion_palabras = setInterval(function(){
            if(animacion_palabra_i==orden_palabras.length){
                clearInterval(animacion_palabras)
                animacion_palabras = null;
            }else{
                getE('palabras').getElementsByTagName('button')[animacion_palabra_i].className = 'palabra-normal-on palabra-normal palabra-normal-'+final_seccion
            }
            
            animacion_palabra_i++
        },200)
    },1250)
}

var posx = 0;
var posy = 0;
var global_p = -1;
var filling_word = false;

function downPalabra(btn,event){
    if(!filling_word){
        posx = event.pageX
        posy = event.pageY
    
        global_p = Number(btn.getAttribute('data-p'))
        //var rect_btn = [btn.getBoundingClientRect().left,btn.getBoundingClientRect().top]
        btn.style.visibility = 'hidden'
        getE('palabra-move').innerHTML = btn.innerHTML
        getE('palabra-move').className = 'palabra-move-on palabra-normal-'+final_seccion
        getE('palabra-move').style.left = posx+'px'
        getE('palabra-move').style.top = posy+'px'
        //getE('palabra-move').setAttribute('data-p',global_p)
    
        window.addEventListener('mousemove', movePalabra, true)
        window.addEventListener('mouseup', upPalabra, true)
        audio_input.play()

        activateSpacesPalabra()
    }
}

function movePalabra(event){
    posx = event.pageX
    posy = event.pageY
    getE('palabra-move').style.left = posx+'px'
    getE('palabra-move').style.top = posy+'px'
}

function upPalabra(event){
    //quitar iluminación espacios
    deactivateSpacesPalabra()

    window.removeEventListener('mousemove', movePalabra, true)
    window.removeEventListener('mouseup', upPalabra, true)
    posx = event.pageX
    posy = event.pageY

    var rect_destino = getE('frase-txt').getElementsByTagName('div')[global_p].getBoundingClientRect()

    //console.log(posx,posy)
    //console.log(rect_destino.left,rect_destino.top)
    //console.log(rect_destino.width,rect_destino.height)
    if(
        posx>=rect_destino.left&&
        posx<=(rect_destino.left+rect_destino.width)&&
        posy>=(rect_destino.top+3)&&
        posy<=(rect_destino.top+rect_destino.height+3)
    ){
        //correcta
        setpalabraCorrecta()
    }else{
        //no correcta
        //mirar si la soltó en un espacio o al aire
        var click_espacio = false;
        for(i = 0;i<getE('frase-txt').getElementsByTagName('div').length;i++){
            var rect_espacio = getE('frase-txt').getElementsByTagName('div')[i].getBoundingClientRect()
            if(
                posx>=rect_espacio.left&&
                posx<=(rect_espacio.left+rect_espacio.width)&&
                posy>=(rect_espacio.top-10)&&
                posy<=(rect_espacio.top+rect_espacio.height+10)
            ){
                click_espacio = true
            }
        }

        if(click_espacio){
            errores_actuales++;
            audio_wrong.play()
        }
    }
    
    getE('palabra-move').className = 'palabra-move-off palabra-normal-'+final_seccion
    getE('palabra-btn-'+global_p).style.visibility = 'visible'
    posx = 0;
    posy = 0;
    global_p = -1;
}

function activateSpacesPalabra(){
    //iluminar espacios
    var espacios = getE('frase-txt').getElementsByTagName('div')
    for(i = 0;i<espacios.length;i++){
        //mirar que no este lleno ya
        if(espacios[i].getAttribute('data-filled')=='0'){
            espacios[i].className = 'frase-txt-div-active'
        }
    }
}

function deactivateSpacesPalabra(){
    //quitar iluminación espacios
    var espacios = getE('frase-txt').getElementsByTagName('div')
    for(i = 0;i<espacios.length;i++){
        //mirar que no este lleno ya
        if(espacios[i].getAttribute('data-filled')=='0'){
            espacios[i].removeAttribute('class')
        }
    }
}

function setpalabraCorrecta(){
    if(ismobile){
        getE('palabra-btn-'+global_p).removeAttribute('onclick')
    }else{
        getE('palabra-btn-'+global_p).removeAttribute('onmousedown')
    }
    getE('palabra-btn-'+global_p).className = 'palabra-normal-on palabra-normal-locked palabra-normal-'+final_seccion
    
    getE('frase-txt').getElementsByTagName('div')[global_p].setAttribute('data-filled','1')
    fillWord(cartas_data[f].palabras[global_p].palabra,getE('frase-txt').getElementsByTagName('div')[global_p])
    cartas_data[f].palabras[global_p].completed = true
    audio_good.play()
}

var activate_click_space = false;
function clickPalabra(btn){
    if(!activate_click_space&&!filling_word){
        global_p = Number(btn.getAttribute('data-p'))
        
        btn.style.visibility = 'hidden'
        getE('palabra-move').innerHTML = btn.innerHTML
        getE('palabra-move').className = 'palabra-move-on palabra-normal-'+final_seccion
        getE('palabra-move').style.left = btn.getBoundingClientRect().left+'px'
        getE('palabra-move').style.top = btn.getBoundingClientRect().top+'px'
        getE('palabra-move').style.width = btn.offsetWidth+'px'
        getE('palabra-move').style.height = btn.offsetHeight+'px'
        //getE('palabra-move').setAttribute('data-p',global_p)
    
        audio_input.play()
    
        activate_click_space = true
        activateSpacesPalabra()
    
        //atenuar demás palabras
        //menos las que ya estan correctas
        var palabras_activas = getE('palabras').getElementsByTagName('button')
        for(i = 0;i<palabras_activas.length;i++){
            var clase_palabra_activa = palabras_activas[i].getAttribute('class')
            if(clase_palabra_activa.indexOf('locked')==-1){
                palabras_activas[i].style.opacity = '0.5'
            }
        }
    }
}

function clickFrase(btn,ii){
    if(activate_click_space){
        //quitar iluminación espacios
        deactivateSpacesPalabra()

        //poner otra vez en alfa 1 las palabras
        //menos las que ya estan correctas
        var palabras_activas = getE('palabras').getElementsByTagName('button')
        for(i = 0;i<palabras_activas.length;i++){
            var clase_palabra_activa = palabras_activas[i].getAttribute('class')
            if(clase_palabra_activa.indexOf('locked')==-1){
                palabras_activas[i].removeAttribute('style')
            }
        }

        if(global_p==ii){
            setpalabraCorrecta()
        }else{
            errores_actuales++;
            audio_wrong.play()
            activate_click_space = false;
        }

        getE('palabra-move').className = 'palabra-move-off palabra-normal-'+final_seccion
    }
}

var animacion_word = null;
var animacion_word_i = 0;

function fillWord(word,obj){
    var word_complete = ""
    var word_splited = word.split("")

    animacion_word_i = 0
    filling_word = true
    
    animacion_word = setInterval(function(){
        if(animacion_word_i==word_splited.length){
            clearInterval(animacion_word)
            animacion_word = null

            filling_word = false;
            activate_click_space = false;
            //mirar si ya la completó

            var palabras_completadas = 0
            for(i = 0;i<cartas_data[f].palabras.length;i++){
                if(cartas_data[f].palabras[i].completed){
                    palabras_completadas++
                }
            }

            if(palabras_completadas==cartas_data[f].palabras.length){
            //if(palabras_completadas==1){
                cartas_data[f].completed = true;
                frases_completadas++

                unsetCarta()
                audio_win.play()
            }
        }else{
            word_complete+=word_splited[animacion_word_i]
            obj.innerHTML = word_complete
        }
        animacion_word_i++
    },100)
}

function convertTime(miliseconds){
    var milisegundos1 = Math.floor(miliseconds / 1000)
    var milisegundos2 = miliseconds - (milisegundos1 * 1000)
    var milisegundos3 = (milisegundos2 / 1000)
    var milisegundos4 = Math.floor()

    var seconds = Math.floor(miliseconds / 1000) + milisegundos3
    var minutos = parseInt(seconds / 60)
    var segundos = seconds - (minutos * 60)
    var time_txt = "";
    if(minutos>0){
        time_txt = String(minutos+' min - '+segundos+' seg')
    }else{
        time_txt = String(segundos+' seg')
    }
    alert(miliseconds)
    alert(milisegundos)
    return time_txt;
}

var animacion_final = null;
var animacion_cartas_final = null;
var animacion_cartas_final_i = 0;

function setMensajeFinal(){
    //guardar datos
    var data_str = JSON.stringify(usuario_data)
    $.ajax({
        method:'post',
        url:'guardar.php',
        data: {
            documento:usuario_data.documento,
            json_str:data_str
        },
        success:function(result){
            console.log(result)
        },
        error: function(xhr){
            console.log("error")
            console.log(xhr.responseText)
        }
    })

    getE('mensaje-final').className = 'mensaje-final-on'
    animacion_final = setTimeout(function(){
        clearTimeout(animacion_final)
        animacion_final = null

        getE('mensaje-final').className = 'mensaje-final-onn'
    },1000)
}
