<?php 

$str = $_POST['json_str'];
$fecha = (string)date('Y-n-j_G-i-s');
$filename = 'bd/'.$_POST['documento'].'-'.$fecha.'.txt';
if(file_put_contents($filename,$str) !== false){
    exit("success");
}else{
    exit("no se pudo guardar el archivo");
}

?>