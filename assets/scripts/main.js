var i = 0;
var j = 0;
var k = 0;

var r = 0;
var a = 0;
var animacion_ruleta = null;
var parando_ruleta = 0;
var retrocede_ruleta = true;

function getRand(minimum,maximum){
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomnumber;
}

var final_rotate = 0;
var final_seccion = 0;
var vueltas = 0;
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

var eje = false; //detecta la dimension entre 360 y 0
var girando = false;

function girarRuleta(){
    if(!girando){
        girando = true;
        getE('girar-btn').className = 'girar-btn-locked'
        a = 5;
        eje = false;
        final_seccion = 2//getRand(1,4)
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
    
        /*final_rotate = secciones[final_seccion-1]+getRand(1,90)
        if(final_rotate>360){
            final_rotate = (final_rotate-360)
        }*/
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
                    eje = false;
                    a = 1;
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

function setCarta(){
    getE('cortina').className = 'cortina-on'
    getE('carta').className = 'carta-on carta'+final_seccion
}