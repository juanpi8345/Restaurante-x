<?php

$nombre = $_POST["nombre"];
$email = $_POST["email"];
$asunto = $_POST["asunto"];
$mensaje = $_POST["mensaje"];

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

if(count($listaErrores) > 0){
	$respuesta["tipo"] = 2;
	$respuesta["errores"] = $listaErrores;
}else{
	$respuesta["tipo"] = 1;
	$respuesta["mensaje"] = "Se registro satisfactoriamente";
}
echo json_encode($respuesta);

  ?>