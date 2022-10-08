<?php

require_once("config/database.php");
date_default_timezone_set("America/Argentina/Jujuy");

$database = new Database();
$db = $database->getConnection();

$nombre = $_POST["nombre"];
$email = $_POST["email"];
$asunto = $_POST["asunto"];
$mensaje = $_POST["mensaje"];
$fecha = date("y-m-d H:i:s");

// if(isset($nombre) and !empty($nombre)){

// 	if(isset($email) and !empty($email)){

// 		if(isset($asunto) and !empty($asunto)){

// 			if(isset($mensaje) and !empty($mensaje)){
// 				echo "Se registro satisfactoriamente";
// 			}else{
// 				echo "Ingrese mensaje";
// 			}
// 		}else{
// 			echo "Ingrese asunto";
// 		}
// 	}else{
// 		echo "Ingrese email";
// 	}

// }else{
// 	echo "Ingrese nombre";
// }

$respuesta = array();
$listaErrores = array();

// if(isset($nombre) and !empty($nombre)){

// 	if(isset($email) and !empty($email)){

// 		if(isset($asunto) and !empty($asunto)){

// 			if(isset($mensaje) and !empty($mensaje)){
// 				$respuesta["tipo"] = 1;
// 				$respuesta["mensaje"] = "Se registro satisfactoriamente";
// 			}else{
// 				$respuesta["tipo"] = 2;
// 				$respuesta["mensaje"] =  "Ingrese mensaje";
// 			}
// 		}else{
// 			$respuesta["tipo"] = 2;
// 			$respuesta["mensaje"] = "Ingrese asunto";
// 		}
// 	}else{
// 		$respuesta["tipo"] = 2;
// 		$respuesta["mensaje"] = "Ingrese email";
// 	}

// }else{
// 	$respuesta["tipo"] = 2;
// 	$respuesta["mensaje"] = "Ingrese nombre";
// }

function is_ajax() {
    return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && (strtolower(getenv('HTTP_X_REQUESTED_WITH')) === 'xmlhttprequest'));
}//Funciona si nos indica si estamos usando ajax para que no se envie informacion desde la url


if(!isset($nombre) or empty($nombre)){
	array_push($listaErrores, array(
		"id" => "nombre",
		"mensaje" => "Ingrese nombre"
	));

}

if(!isset($email) or empty($email)){
	array_push($listaErrores, array(
		"id" => "email",
		"mensaje" => "Ingrese email"

	));
}


if(!isset($asunto) or empty($asunto)){
	array_push($listaErrores, array(
		"id" => "asunto",
		"mensaje" => "Ingrese asunto"

	));

	}

	if(!isset($mensaje) or empty($mensaje)){
	array_push($listaErrores, array(
		"id" => "mensaje",
		"mensaje" => "Ingrese mensaje"
	));

}

if(is_ajax()){



	if(count($listaErrores) > 0){
		$respuesta["tipo"] = 2;
		$respuesta["errores"] = $listaErrores;
	}else{

		$declaracion = $db->prepare("INSERT INTO contacto(nombre,email,asunto,mensaje,fecha)
			VALUES(:nombre, :email, :asunto, :mensaje, :fecha)");
		$declaracion->bindParam(":nombre", $nombre, PDO::PARAM_STR);
		$declaracion->bindParam(":email", $email, PDO::PARAM_STR);
		$declaracion->bindParam(":asunto", $asunto, PDO::PARAM_STR);
		$declaracion->bindParam(":mensaje", $mensaje, PDO::PARAM_STR);
		$declaracion->bindParam(":fecha", $fecha, PDO::PARAM_STR);
		$declaracion->execute();

		$ultimoId = $db->lastInsertId();

		if($ultimoId){
			$respuesta["tipo"] = 1;
			$respuesta["mensaje"] = "Se registro satisfactoriamente";
		}else{
			$respuesta["tipo"] = 1;
			$respuesta["mensaje"] = "Problema de insercion";
		}

	}

	}else{
		$respuesta["tipo"] = 1;
		$respuesta["mensaje"] = "Problema de servidor";
	}

echo json_encode($respuesta);
  ?>
