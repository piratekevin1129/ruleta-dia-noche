var i = 0;
var j = 0;
var k = 0;

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
    if(c==0){
        for(i = 0;i<cartas_data_1.length;i++){
            if(cartas_data_1[i].completed){
                completed++
            }
        }
        if(completed==cartas_data_1.length){
            seccion_completed = true;
        }
    }else if(c==0){
        for(i = 0;i<cartas_data_2.length;i++){
            if(cartas_data_2[i].completed){
                completed++
            }
        }
        if(completed==cartas_data_2.length){
            seccion_completed = true;
        }
    }else if(c==0){
        for(i = 0;i<cartas_data_3.length;i++){
            if(cartas_data_3[i].completed){
                completed++
            }
        }
        if(completed==cartas_data_3.length){
            seccion_completed = true;
        }
    }else if(c==0){
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
    /*final_seccion = 2
    final_rotate = 0
    setCarta()*/

    if(!girando){
        girando = true;
        getE('girar-btn').className = 'girar-btn-locked'
        a = 5;
        eje = false;
        final_seccion = getRand(1,4)
        check_carta = checkCarta(final_seccion)
        while(check_carta){
            final_seccion = getRand(1,4)
            check_carta = checkCarta(final_seccion)
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
    
        //final_rotate = secciones[final_seccion-1]+getRand(1,90)
        //if(final_rotate>360){
            //final_rotate = (final_rotate-360)
        //}

        vueltas = 0;
        parando_ruleta = 0;
        retrocede_ruleta = true;
        console.log(final_rotate)
    
        animacion_ruleta = setInterval(function(){
            if(parando_ruleta==0){
                if(retrocede_ruleta){
                    r-=a
                    a--
                    if(a==0){
                        retrocede_ruleta = false;
                        getE('ruleta-blur').className = 'ruleta-blur-on'
                    }
                }else{
                    r+=a
                    if(a<50){
                        a++
                    }
                    if(r>360){
                        r = (r-360)
                        vueltas++;
                    }
        
                    if(vueltas==3){
                        parando_ruleta = 1;
                        //empezar a frenar
                    }
                }
            }else if(parando_ruleta==1){
                if(
                    (r-50)>=final_rotate&&
                    eje==true
                ){
                    //comienza a detener
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
                r+=a
                a-=0.30
    
                if(r>360){
                    r = (r-360)
                }
                
                if(a<1){
                    parando_ruleta = 3;
                    if(final_seccion==2){
                        eje = false;
                    }
                    a = 1;

                    //clearInterval(animacion_ruleta)
                    //animacion_ruleta = false
                }
            }else if(parando_ruleta==3){
                r+=a
                a-=0.012
                if(r>360){
                    r = Math.round((r-360))
                    eje = true;
                }
    
                //console.log(r,final_rotate)
                if(r>=final_rotate&&eje==true){
                    r = final_rotate
                    
                    console.log("listo")
                    pararRuleta()
                    
                }else{
                    if(a<0){
                        
                        console.log("paro forzado")
                        pararRuleta()
                    }
                }
            }
            getE('ruleta-fondo').style.transform = 'rotate('+r+'deg)'
        },40)
    }
}

function pararRuleta(){
    clearInterval(animacion_ruleta)
    animacion_ruleta = false

    setCarta()
}

var f = -1;
var check_frase = false;
function checkFrase(f,c){
    var completed = false;
    if(c==1){
        if(cartas_data_1[i].completed){
            completed = true;   
        }
    }else if(c==2){
        if(cartas_data_2[i].completed){
            completed = true;   
        }
    }else if(c==3){
        if(cartas_data_3[i].completed){
            completed = true;   
        }
    }else if(c==4){
        if(cartas_data_4[i].completed){
            completed = true;   
        }
    }
    
    return completed;
}

function setCarta(){
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
    check_frase = checkFrase(f,final_seccion)
    while(check_frase){
        f = getRand(0,(cartas_data.length-1))
        check_frase = checkFrase(f,final_seccion)
    }

    getE('frase-txt').innerHTML = cartas_data[f].frase

    setPalabras()
}

var orden_palabras = [];
var animacion_palabras = null;
var animacion_carta = null;
var animacion_palabra_i = 0;

function setPalabras(){
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
        var ii = orden_palabras[i]
        getE('frase-txt').getElementsByTagName('div')[ii].removeAttribute('style')
        getE('frase-txt').getElementsByTagName('div')[ii].innerHTML = cartas_data[f].palabras[ii]
        var ancho = getE('frase-txt').getElementsByTagName('div')[ii].offsetWidth
        getE('frase-txt').getElementsByTagName('div')[ii].style.width = ancho+'px'
        getE('frase-txt').getElementsByTagName('div')[ii].innerHTML = ''

        var palabra_btn = document.createElement('button')
        palabra_btn.id = 'palabra-btn-'+ii
        palabra_btn.setAttribute('onmousedown','downPalabra(this,event)')
        palabra_btn.setAttribute('type','button')
        palabra_btn.setAttribute('data-p',ii)
        palabra_btn.className = 'palabra-normal-off palabra-normal palabra-normal-'+final_seccion
        palabra_btn.innerHTML = '<span>'+cartas_data[f].palabras[ii]+'</span>'

        getE('palabras').appendChild(palabra_btn)
    }

    getE('carta').className = 'carta-on carta'+final_seccion

    
    animacion_carta = setTimeout(function(){
        clearTimeout(animacion_carta)
        animacion_carta = null;

        animacion_palabras = setInterval(function(){
            if(animacion_palabra_i==orden_palabras.length){
                clearInterval(animacion_palabras)
                animacion_palabras = null;
            }else{
                getE('palabras').getElementsByTagName('button')[animacion_palabra_i].className = 'palabra-normal-on palabra-normal palabra-normal-'+final_seccion
            }
            
            animacion_palabra_i++
        },200)
    },1000)
}

var posx = 0;
var posy = 0;
var global_p = -1;
function downPalabra(btn,event){
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
}

function movePalabra(event){
    posx = event.pageX
    posy = event.pageY
    getE('palabra-move').style.left = posx+'px'
    getE('palabra-move').style.top = posy+'px'
}

function upPalabra(event){
    posx = event.pageX
    posy = event.pageY

    var rect_destino = getE('frase-txt').getElementsByTagName('div')[global_p].getBoundingClientRect()

    console.log(posx,rect_destino.left,rect_destino.top)
    if(
        posx>=rect_destino.left&&
        posx<=(rect_destino.left+rect_destino.width)&&
        posy>=(rect_destino.top-10)&&
        posy<=(rect_destino.top+rect_destino.height+10)
    ){
        //correcta
        getE('palabra-btn-'+global_p).removeAttribute('onmousedown')
        var old_clase = getE('palabra-btn-'+global_p).className
        var nueva_clase = old_clase.replace('palabra-normal-on','palabra-normal-locked')
        getE('palabra-btn-'+global_p).className = nueva_clase
        
        getE('frase-txt').getElementsByTagName('div')[global_p].innerHTML = cartas_data[final_seccion-1].palabras[global_p]
    }else{
        //no correcta

    }

    getE('palabra-move').className = 'palabra-move-off palabra-normal-'+final_seccion
    getE('palabra-btn-'+global_p).style.visibility = 'visible'

    for(i = 0;i<getE('palabras').getElementsByTagName('button').length;i++){
        var palabra_x = getE('palabras').getElementsByTagName('button')[i]
    }
}
//borrar style atribute de todas las palabras