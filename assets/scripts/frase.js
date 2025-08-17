var prefrase = "";

function initFrase(){
    if(final_seccion==1){
        prefrase = cartas_data_1[f].prefrase
    }else if(final_seccion==2){
        prefrase = cartas_data_2[f].prefrase
    }else if(final_seccion==3){
        prefrase = cartas_data_3[f].prefrase
    }else if(final_seccion==4){
        prefrase = cartas_data_4[f].prefrase
    }

    //1. Dividir la frase por espacios
    var prefrase_splited = prefrase.split(" ")
    var palabras_disponibles = []

    //2. Recorrer array de palabras para ver cual es apta
    //debe ser mayor a 6 letras y menor o igual a 13
    var orden = 0;
    var palabra_anterior = -1;
    for(i = 0;i<prefrase_splited.length;i++){
        var apta = false;

        if(prefrase_splited[i].length>6&&prefrase_splited[i].length<=13){
            apta = true;

            //mirar si la palabra anterior tenia signo
            //de ser asi, la siguiente palabra no puede ser apta
            if(i>0){
                var ultimo = prefrase_splited[i-1].substring(prefrase_splited[i-1].length-1)
                if(
                    ultimo=='.'||
                    ultimo==','||
                    ultimo=='!'||
                    ultimo=='?'||
                    ultimo==':'
                ){
                    apta = false;
                    //console.log("la palabra anterior ya tiene signo: "+prefrase_splited[i-1])
                }
    
                if(palabra_anterior==(i-1)){
                    apta = false;
                    //console.log("la anterior era apta :"+prefrase_splited[palabra_anterior])
                }
            }
        }
        
        //es apta, guardemosla en la lista de palabras disponibles
        if(apta){
            palabra_anterior = i
            palabras_disponibles.push({ind:i,orden:orden})
            orden++
        }
    }

    //console.log(palabras_disponibles)

    //escoger solo 8 de la lista de disponibles
    var palabras_definitivas = []
    if(palabras_disponibles.length>8){
        while(palabras_definitivas.length<8){
            var rand = getRand(1,palabras_disponibles.length)
            if(palabras_definitivas.indexOf(rand-1)==-1){
                //mirar si tiene punto, coma o signo de exclamación
                var palabra_prev = prefrase_splited[palabras_disponibles[rand-1].ind]
                var palabra_prev2 = prefrase_splited[palabras_disponibles[rand-1].ind]

                var palabra_arr = palabra_prev.split("")
                var signo = palabra_arr[palabra_arr.length-1]

                var pasar_signo = false
                if(
                    signo=='.'||
                    signo==','||
                    signo=='!'||
                    signo=='?'||
                    signo==':'
                ){
                    palabra_prev2 = palabra_prev.slice(0,-1)
                    pasar_signo = true
                }

                //mirar que no esté repetido
                var palabra_definitiva_repetida = false;
                for(j = 0;j<palabras_definitivas.length;j++){
                    if(String(palabras_definitivas[j].txt).toLowerCase()==palabra_prev2.toLowerCase()){
                        palabra_definitiva_repetida = true;
                        //console.log("repetida la palabra: "+palabra_prev2)
                    }
                }

                if(!palabra_definitiva_repetida){
                    if(pasar_signo){
                        //poner punto a la siguiente palabra
                        var texto_siguiente = prefrase_splited[palabras_disponibles[rand-1].ind + 1]
                        prefrase_splited[palabras_disponibles[rand-1].ind + 1] = String(signo+" "+texto_siguiente)
                    }

                    //console.log("La palabra a agregar es: "+palabra_prev2)

                    palabras_definitivas.push({
                        orden:palabras_disponibles[rand-1].orden,
                        ind:palabras_disponibles[rand-1].ind,
                        txt:palabra_prev2
                    })
                    orden++;
                }
            }
        }
    }else{
        //muy dificil que llegue aqui, pero aqui hacemos excepcion con el punto
        for(i = 0;i<palabras_disponibles.length;i++){
            palabras_definitivas.push({
                ind:palabras_disponibles[i].ind,
                txt:String(prefrase_splited[palabras_disponibles[i].ind]),
                orden:palabras_disponibles[i].orden
            })
        }
    }

    //convertir palabras disponibles en <div>
    var palabras_data = [];
    var frase_data = "";

    //ponerlas en orden
    
    for(i = 0;i<orden;i++){
        for(j = 0;j<palabras_definitivas.length;j++){
            if(palabras_definitivas[j].orden==i){
                prefrase_splited[palabras_definitivas[j].ind] = '<div></div>'
                
                palabras_data.push({
                    palabra:palabras_definitivas[j].txt,
                    completed:false
                })
            }
        }
    }
    
    for(i = 0;i<prefrase_splited.length;i++){
        frase_data+=String(prefrase_splited[i])
        if(i<(prefrase_splited.length-1)){
            if(prefrase_splited[i+1].indexOf(" ")==-1){
                frase_data+=' '
            }else{
                //es una palabra con signo de admiración
            }
        }else{
            //al final, agragamos el punto
            frase_data+='.'
        }
    }
    
    //console.log(palabras_data)
    //console.log(frase_data)

    if(final_seccion==1){
        cartas_data_1[f].palabras = palabras_data
        cartas_data_1[f].frase = frase_data
    }else if(final_seccion==2){
        cartas_data_2[f].palabras = palabras_data
        cartas_data_2[f].frase = frase_data
    }else if(final_seccion==3){
        cartas_data_3[f].palabras = palabras_data
        cartas_data_3[f].frase = frase_data
    }else if(final_seccion==4){
        cartas_data_4[f].palabras = palabras_data
        cartas_data_4[f].frase = frase_data
    }
}