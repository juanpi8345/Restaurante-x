var ancho_pantalla,alto_pantalla,alto_menu;

new WOW().init();

var acciones = {

	listo:function(){
		$("#lacarta .boton-amarillo").click(acciones.click_btn_amarillo);
		$("#locales .btn-circulo").click(acciones.click_btn_amarillo);
		$(".titulo-acordion ").click(acciones.acordion);
		// $("#lacarta .contenedor-cuadrado").find("img").eq(0).click(acciones.obtener_src);
		//$("#lacarta .contenedor-cuadrado").click(acciones.obtener_src);
		$(".cabecera .menu a[href*='#']").click(acciones.irancla);
		$(".btn-enviar").click(acciones.enviar);

		$(".cabecera .hamb").click(acciones.abrir_menu);

		$(".cerrar-imagen").click(acciones.cerrar_imagen);

		$(".saltarina").click(acciones.saltarina);

		$(".owl-carousel").owlCarousel({
   			 loop:true,
   			 margin:10,
			 nav:false,
			 responsive:{
			        0:{
			            items:1
			        },
			        768:{
			            items:1
			        },
			        1200:{
			            items:1
			        }
			    }
			});
		$("#frmcontacto").validate({
			rules:{
				nombre: "required",
				email: {
					required: true,
					email: true
				},
				asunto: {
					required: true
				},
				mensaje: "required"
			},
			messages: {
				nombre: "Por favor ingresa tu nombre",
				email: {
					required: "Por favor ingresa un email",
					email: "Por favor ingresa un email valido"
				},
				asunto: "Por favor ingresa el asunto",
				mensaje: "Por favor ingresa el mensaje"
			},
			submitHandler: function(form){
				// $("#nombre").val("holaaaaaaaa");

				$.ajax({
					method : "POST",
					url : "registro.php",
					data: $('#frmcontacto').serialize(), //Envia todos los campos del formulario
					dataType: "json"
				}).done(function(data){
					// if(data.tipo == 1){
					// 	$("#respuesta").css({"color":"green"}).html(data.mensaje);
					// }else{s
					// 	$("#respuesta").css({"color":"red"}).html(data.mensaje);
					// }
					$("#respuesta").html("");
					$("label.error").remove();
					$(".from-input.error").removeClass("error");
					if(data.tipo == 1){
						$("#respuesta").css({"color":"green"}).html(data.mensaje);
					}else{
						$.each(data.errores, function(indice,elemento){
							var html = "<label id='error'"+elemento.id+" class='error'>"+elemento.mensaje+"</label>"
							$("#"+elemento.id).addClass("error");
							$("#"+elemento.id).closest(".form-bloques").append(html); // prepend es antes
						});

					  }
				}).fail(function(error){
					$("#respuesta").css({"color":"green"}).html(error.responseText);
					console.log(error.responseText); //para el programador
				});
					}
				});
	},
	enviar:function(){
		// $("#contacto").css({"background-color":"#cccc","color":"white"});
		// var nombre = $("#nombre").val();
		// var email = $("#email").val();
		// var asunto = $("#asunto").val();
		// var mensaje = $("#mensaje").val();
		// // $("#nombre").val("holaaaaaaaa");

		// $.ajax({
		// 	method : "POST",
		// 	url : "registro.php",
		// 	data :{
		// 		"nombre" : nombre,
		// 		"email" : email,
		// 		"asunto" : asunto,
		// 		"mensaje": mensaje
		// 	},
		// 	dataType: "json"
		// }).done(function(data){
		// 	// if(data.tipo == 1){
		// 	// 	$("#respuesta").css({"color":"green"}).html(data.mensaje);
		// 	// }else{
		// 	// 	$("#respuesta").css({"color":"red"}).html(data.mensaje);
		// 	// }
		// 	$("#respuesta").html("");
		// 	$(".error").remove();
		// 	$(".error-input").removeClass("error-input");
		// 	if(data.tipo == 1){
		// 		$("#respuesta").css({"color":"green"}).html(data.mensaje);
		// 	}else{
		// 		$.each(data.errores, function(indice,elemento){
		// 			var html = "<span class='error'>"+elemento.mensaje+"</span>"
		// 			$("#"+elemento.id).addClass("error-input");
		// 			$("#"+elemento.id).closest(".form-bloques").append(html); // prepend es antes
		// 		});

		// 	  }
		// }).fail(function(error){
		// 	$("#respuesta").css({"color":"green"}).html(error.responseText);
		// 	console.log(error.responseText); //para el programador
		// });
		
	},

	cerrar_menu:function(){
		$(".cabecera .menu").removeClass("abierto"); // Si se presiona el boton y no esta la clase se agrega, si la tiene se quita
		$("body").removeClass("abierto");
		$(".cabecera .hamb").find("i").removeClass("fa-xmark");
	},

	irancla:function(e){
		e.preventDefault();
		var ancla = this.hash; //Obtiene lo que hay en el href despues de #
		var url = $(this).attr("href");

		if($(ancla).length > 0){
			acciones.cerrar_menu();
			acciones.detalle_ancla(ancla);
		}else{
			window.location.href = url;
		}
		//alert(ancla);
	},

	detalle_ancla:function(ancla){
		$("html,body").animate({
			"scrollTop" : $(ancla).offset().top
		},800);
	},

	obtener_src:function(){
		// var src = $(this).attr("src"); getter
		// $(this).attr("src","img/alonso.jpg"); setter
		// var html = $(this).html();
		// console.log(html);
		// $(this).html("<h3>Holaa</h3>");

		// var text = $(this).find("h2").text();
		// $(this).find("h2").text("prueba de setteo");
		// console.log(text);
	},

	click_btn_amarillo:function(e){ //El e sirve para desabilitar el evento de a con preventDefault
		e.preventDefault();
		var src = $(this).closest(".contenedor-cuadrado").find("img").attr("src"); // Encuentra el contenedor mas cercano y encuentra la imagen, y selecciona el src
		
		$(".cuerpo-imagen").find("img").attr("src",src)

		$(".trama").fadeIn("slow",function(){
			$(".cuerpo-imagen").fadeIn("fast");
		});

	},

	precarga:function(){

			$(".trama2").fadeOut("slow");
			$(".logo-load").fadeOut("slow",function(){
				$("body").removeClass("abierto");
			});

			setTimeout(function(){
				var ancla = window.location.hash;
				if($(ancla).length > 0){
					acciones.detalle_ancla(ancla);
				};
			},1000)
		//acciones.redimensionar();
	},


	redimensionar:function(){
		acciones.cerrar_menu();
		 ancho_pantalla = $(window).width();

		 if(ancho_pantalla < 768){
		 	alto_menu = $(".cabecera").innerHeight();
		 	$(".cabecera .menu").css({"padding-top":alto_menu, "padding-bottom":alto_menu});
		 }else{
		 	$(".cabecera .menu").css({"padding-top":0, "padding-bottom":0});
		 }
		 
		 alto_pantalla = $(window).height();
		// console.log(ancho_pantalla + " - " + alto_pantalla);
		// alto_menu = $(".cabecera").innerHeight(); //El height solo devuelve el alto pero sin padding
		// alto_menu = $(".cabecera").outerHeight();//Devuelve el alto + padding + border en caso de haber, si tiene true devuelve + margin tambien
		// $(".cabecera").height("200"); //Settea el height de cabecera
		//console.log(alto_menu);
	},

	scroll_ventana:function(){

		if($(window).scrollTop() > alto_menu){
			$(".cabecera").addClass("fondo");
		}else{
			$(".cabecera").removeClass("fondo");
		}
		
	},

	abrir_menu:function(e){
		// $(".cabecera .menu").addClass("abierto");
		// $(".cabecera .menu").removeClass("abierto");
		e.preventDefault();
		$(".cabecera .menu").toggleClass("abierto"); // Si se presiona el boton y no esta la clase se agrega, si la tiene se quita
		$("body").toggleClass("abierto");
		$(this).find("i").toggleClass("fa-xmark");
		// if($(".cabecera .menu").hasClass("abierto")){
		// 	$(".cabecera .menu").removeClass("abierto");
		// }else{
		// 	$(".cabecera .menu").addClass("abierto")
		// }
		
	},
	cerrar_imagen:function(e){
		$(".cuerpo-imagen").find("img").attr("src","")
		e.preventDefault();
		$(".cuerpo-imagen").fadeOut("slow",function(){
			$(".trama").fadeOut("fast");
		});
	},

	acordion:function(){
		if($(this).find("i").hasClass("fa-angle-up")){
			$(this).find("i").removeClass("fa-angle-up");
		}else{
			$(".titulo-acordion").find("i").removeClass("fa-angle-up");
			$(this).find("i").addClass("fa-angle-up");
		}


		$(".cuerpo-acordion").stop().slideUp("slow");
		$(this).next(".cuerpo-acordion").stop().slideToggle("slow"); //La siguiente clase a la seleccionada de nombre...
		//El Stop sirve para detener la animacion en caso de volver apretar
	},

	saltarina:function(){
		var posicion =  $(this).closest("section").next("section").offset().top;
		$("html,body").animate({
			"scrollTop" : posicion
		},800);
	}
};



$(window).resize(acciones.redimensionar);

$(window).scroll(acciones.scroll_ventana);

$(document).ready(acciones.listo);

$(document).ready(acciones.precarga);



