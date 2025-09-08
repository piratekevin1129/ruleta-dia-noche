<?php 
header('Content-Type: text/html; charset=utf-8');

$categorias = array(
    'Cuidar mi salud física y mental',
    'Cuidar el entorno',
    'Prepararme y responder',
    'Apostarle a la sostenibilidad y al Medio Ambiente'
);

$tabla = '<style type="text/css">';
$tabla.='table{width:100%; margin-left: auto; margin-right: auto; font-family:Arial; table-layout:fixed;}';
$tabla.='td{padding:5px; box-sizing:border-box;}';
$tabla.='th{padding:10px; font-weight:bold; box-sizing:border-box; text-align: left;}';
$tabla.='</style>';
$tabla.='<table border="1" cellpadding="0" cellspacing="0">';
$tabla.='<thead><tr>';
$tabla.='<th style="width:150px;">Nombre</th>';
$tabla.='<th style="width:120px;">Documento</th>';
for($j = 0;$j<16;$j++){
    $tabla.='<th style="width:200px;">Frase '.($j+1).'</th>';
}
$tabla.='<th style="width:150px;">Tiempo total</th>';
$tabla.='<th style="width:150px;">Equivocaciones totales</th>';
$tabla.='</tr></thead>';
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

    $historial = $json['historial'];

    for($j = 0;$j<count($historial);$j++){
        $txt1 = 'Tipo: '.$categorias[$historial[$j]['tipo']-1];
        $txt1.='<br>';
        $txt1.='Frase: #'.$historial[$j]['nfrase'];
        $txt1.='<br>';
        $txt1.='Equivocaciones: '.$historial[$j]['equivocaciones'];
        $txt1.='<br>';
        $txt1.='Tiempo: '.$historial[$j]['tiempo'];
        $tabla.='<td>'.$txt1.'</td>';

        $tiempo_total+= $historial[$j]['ntiempo'];
        $equivocaciones_totales+= $historial[$j]['equivocaciones'];
    }
    
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