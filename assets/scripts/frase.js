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
    //debe ser mayor o igual 6 letras
    for(i = 0;i<prefrase_splited.length;i++){
        var palabra_splited = prefrase_splited[i].split("")
        
        if(palabra_splited.length>=6){
            //es apta, guardemosla en la lista de palabras disponibles
            palabras_disponibles.push({ind:i})
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
                var palabra_arr = prefrase_splited[palabras_disponibles[rand-1].ind].split("")
                if(
                    palabra_arr[palabra_arr.length-1]=='.'||
                    palabra_arr[palabra_arr.length-1]==','||
                    palabra_arr[palabra_arr.length-1]=='!'||
                    palabra_arr[palabra_arr.length-1]=='?'
                ){
                    //poner punto a la siguiente palabra
                    var texto_siguiente = prefrase_splited[palabras_disponibles[rand-1].ind+1]
                    prefrase_splited[palabras_disponibles[rand-1].ind+1] = String(palabra_arr[palabra_arr.length-1] + " "+texto_siguiente)
                    
                    //quitarlo de la que nos sirve
                    palabra_arr.length = palabra_arr.length-1
                }
                palabras_definitivas.push({
                    ind:palabras_disponibles[rand-1].ind,
                    txt:String(palabra_arr.join(""))
                })
            }
        }
    }else{
        //muy dificil que llegue aqui, pero aqui hacemos excepcion con el punto
        for(i = 0;i<palabras_disponibles.length;i++){
            palabras_definitivas.push({
                ind:palabras_disponibles[i].ind,
                txt:String(prefrase_splited[palabras_disponibles[i].ind])
            })
        }
    }

    //console.log(palabras_definitivas)

    //convertir palabras disponibles en <div>
    var palabras_data = [];
    var frase_data = "";
    for(i = 0;i<palabras_definitivas.length;i++){
        prefrase_splited[palabras_definitivas[i].ind] = '<div></div>'

        palabras_data.push({
            palabra:palabras_definitivas[i].txt,
            completed:false
        })
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
        //console.log(cartas_data_1[f].frase)
        //console.log(cartas_data_1[f].palabras)
    }else if(final_seccion==2){
        cartas_data_2[f].palabras = palabras_data
        cartas_data_2[f].frase = frase_data
        //console.log(cartas_data_2[f].frase)
        //console.log(cartas_data_2[f].palabras)
    }else if(final_seccion==3){
        cartas_data_3[f].palabras = palabras_data
        cartas_data_3[f].frase = frase_data
        //console.log(cartas_data_3[f].frase)
        //console.log(cartas_data_3[f].palabras)
    }else if(final_seccion==4){
        cartas_data_4[f].palabras = palabras_data
        cartas_data_4[f].frase = frase_data
        //console.log(cartas_data_4[f].frase)
        //console.log(cartas_data_4[f].palabras)
    }
}