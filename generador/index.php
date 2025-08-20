<?php 
header('Content-Type: text/html; charset=utf-8');

$tabla = '<table border="1">';
$tabla.='<thead><tr><th>Nombre</th><th>Documento</th><th>Frase 1</th><th>Frase 2</th><th>Frase 3</th><th>Frase 4</th><th>Frase 5</th><th>Tiempo total</th><th>Equivocaciones totales</th></tr></thead>';
$tabla.='<tbody>';

$archivos = scandir('../bd');
for($i = 2;$i<count($archivos);$i++){
    $file = file_get_contents('../bd/'.$archivos[$i]);
    $json = json_decode($file,true);

    $tiempo_total = 0;
    $equivocaciones_totales = 0;

    $tabla.='<tr>';
    $tabla.='<td>'.$json['nombre'].'</td>';
    $tabla.='<td>'.$json['documento'].'</td>';

    $txt1 = 'Tipo: '.$json['historial'][0]['tipo'];
    $txt1.='<br>';
    $txt1.='Frase: #'.$json['historial'][0]['nfrase'];
    $txt1.='<br>';
    $txt1.='Equivocaciones: '.$json['historial'][0]['equivocaciones'];
    $txt1.='<br>';
    $txt1.='Tiempo: '.$json['historial'][0]['tiempo'];
    $tiempo_total+= $json['historial'][0]['ntiempo'];
    $equivocaciones_totales+= $json['historial'][0]['equivocaciones'];

    $txt2 = 'Tipo: '.$json['historial'][1]['tipo'];
    $txt2.='<br>';
    $txt2.='Frase: #'.$json['historial'][1]['nfrase'];
    $txt2.='<br>';
    $txt2.='Equivocaciones: '.$json['historial'][1]['equivocaciones'];
    $txt2.='<br>';
    $txt2.='Tiempo: '.$json['historial'][1]['tiempo'];
    $tiempo_total+= $json['historial'][1]['ntiempo'];
    $equivocaciones_totales+= $json['historial'][1]['equivocaciones'];

    $txt3 = 'Tipo: '.$json['historial'][2]['tipo'];
    $txt3.='<br>';
    $txt3.='Frase: #'.$json['historial'][2]['nfrase'];
    $txt3.='<br>';
    $txt3.='Equivocaciones: '.$json['historial'][2]['equivocaciones'];
    $txt3.='<br>';
    $txt3.='Tiempo: '.$json['historial'][2]['tiempo'];
    $tiempo_total+= $json['historial'][2]['ntiempo'];
    $equivocaciones_totales+= $json['historial'][2]['equivocaciones'];
    
    $txt4 = 'Tipo: '.$json['historial'][3]['tipo'];
    $txt4.='<br>';
    $txt4.='Frase: #'.$json['historial'][3]['nfrase'];
    $txt4.='<br>';
    $txt4.='Equivocaciones: '.$json['historial'][3]['equivocaciones'];
    $txt4.='<br>';
    $txt4.='Tiempo: '.$json['historial'][3]['tiempo'];
    $tiempo_total+= $json['historial'][3]['ntiempo'];
    $equivocaciones_totales+= $json['historial'][3]['equivocaciones'];
    
    $txt5 = 'Tipo: '.$json['historial'][4]['tipo'];
    $txt5.='<br>';
    $txt5.='Frase: #'.$json['historial'][4]['nfrase'];
    $txt5.='<br>';
    $txt5.='Equivocaciones: '.$json['historial'][4]['equivocaciones'];
    $txt5.='<br>';
    $txt5.='Tiempo: '.$json['historial'][4]['tiempo'];
    $tiempo_total+= $json['historial'][4]['ntiempo'];
    $equivocaciones_totales+= $json['historial'][4]['equivocaciones'];
    
    $tabla.='<td>'.$txt1.'</td>';
    $tabla.='<td>'.$txt2.'</td>';
    $tabla.='<td>'.$txt3.'</td>';
    $tabla.='<td>'.$txt4.'</td>';
    $tabla.='<td>'.$txt5.'</td>';
    $tabla.='<td>'.convertTime($tiempo_total).'</td>';
    $tabla.='<td>'.$equivocaciones_totales.'</td>';

    $tabla.='</tr>';

}
$tabla.='</tbody></table>';
echo $tabla;

function convertTime($miliseconds){
    $seconds = round($miliseconds / 1000);
    $minutos = (int)($seconds / 60);
    $segundos = $seconds - ($minutos * 60);
    $time_txt = "";
    if($minutos>0){
        $time_txt = (string)$minutos.' min - '.$segundos.' seg';
    }else{
        $time_txt = (string)($segundos.' seg');
    }
    return $time_txt;
}
?>