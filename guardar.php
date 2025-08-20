<?php 

$str = $_POST['json_str'];
$filename = 'bd/'.$_POST['documento'].'.txt';
if(file_put_contents($filename,$str) !== false){
    exit("success");
}else{
    exit("no se pudo guardar el archivo");
}

?>