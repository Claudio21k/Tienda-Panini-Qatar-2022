//	Tienda de Tarjetas Album Panini 2022 - Costa Rica
// Tienda enlinea

//Array de Datos
	let productos = ["K. Navas", "F. Calvo", "O. Duarte", "C.Borges", "FedeFut", "B. Ruiz", "J. Tejeda", "J. Cambell", "A. Contreras"];
	let imgGrandes = ["img/productos/433.jpg", "img/productos/434.jpg", "img/productos/435.jpg", "img/productos/436.jpg", "img/productos/437.jpg", "img/productos/438.jpg", "img/productos/439.jpg", "img/productos/440.jpg", "img/productos/441.jpg"];
	let imgPeque = ["img/productos/433m.jpg", "img/productos/434m.jpg", "img/productos/435m.jpg", "img/productos/436m.jpg", "img/productos/437m.jpg", "img/productos/438m.jpg", "img/productos/439m.jpg", "img/productos/440m.jpg", "img/productos/441m.jpg"];
	let precios = [250, 450, 250, 250, 500, 250, 250, 250, 200];
	let stock = [3, 1, 2, 1, 3, 1, 2, 1, 2];
	let precioTransporte = [3500,7000, 14000, "gratis"];
	let IVA = 0.13;
	let uniUser;
	
	
	
//Codigo JavaScript a ejecutarse al Inicio:	
	window.onload = function(){

	
		//Se cargan los productos dentro del HTML de forma dinamica haciendo uso de los datos en los arrays:
		let DIVS = document.getElementsByName("DIVS");
		for (i in productos){
			DIVS[i].innerHTML = '<a id="imgG'+i+'" href="' +imgGrandes[i]+ '"><img id="imgP'+i+'" class="imagen" src="' +imgPeque[i]+ '"></a><div class="etiquetas"><b><span id="pro'+i+'">' +productos[i]+ '</span>:&nbsp;<span id="pre'+i+'">' +precios[i]+ '�</span></b></div><div class="stock">Stock <span id="uni'+i+'">' +stock[i]+ '</span> unidades,<br/>Ingresa la Cantidad a comprar : <input class="uniBien" type="number" id="uniUser'+i+'" name="uniUser" value="0" size="4" /></div>';
		}
	
	
		//Rellena el campo dia y año, de la fecha de nacimiento y tarjeta de credito:
		//Fecha de nacimiento
		let fecha = new Date();
		let anio = fecha.getFullYear();
				
		for (let i=1;i<=31;i++){
			document.getElementById("fechaNacimientoDia").innerHTML = document.getElementById("fechaNacimientoDia").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}
				
		for (let i=anio;i>=(anio-110);i--){
			document.getElementById("fechaNacimientoAnio").innerHTML = document.getElementById("fechaNacimientoAnio").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		//Tarjeta de credito:
		for (let i=1;i<=12;i++){
			document.getElementById("mesTarjeta").innerHTML = document.getElementById("mesTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		for (let i=anio;i<=(anio+21);i++){
			document.getElementById("anioTarjeta").innerHTML = document.getElementById("anioTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
		}

		//Botones en la aplicacion:
		document.getElementById("botonTotal").onclick = validaLasUnidades;
		document.getElementById("botonDatos").onclick = pideDatos;
		document.getElementById("botonPago").onclick = validaDatosPersonales;
		document.getElementById("botonConfirmar").onclick = validaDatosPago;
	}


	/*-------------------FUNCIONES-------------------*/

//Funcion Validacion de Unidades permitidas segun stock
	function validaLasUnidades(elEvento) {
		
		let todoBien = true;
		uniUser = document.getElementsByName("uniUser");
		
		
		for (i in productos){
		
			if ( uniUser[i].value == "" || uniUser[i].value > stock[i] || uniUser[i].value < 0 ){
				
				todoBien = false;
				uniUser[i].className = "uniMal";
								
				//Modifica el css para quitar los formularios:
				document.getElementById("todo").className = "todoNo";
				document.getElementById("menu").className = "menuNo";
				document.getElementById("divZonaCompra").className = "divZonaCompraNo";
				document.getElementById("divTotal").className = "divsNo";
/**/			document.getElementById("divDatos").className = "divsNo";
/**/			document.getElementById("divPago").className = "divsNo";				
				
				//Deshabilita el boton de datos personales:
				document.getElementById("botonDatos").disabled = true;
/**/			document.getElementById("botonDatos").disabled = true;
/**/			document.getElementById("botonDatos").disabled = true;				
				
				alert("Unidades No Disponibles , Por Favor actulizar las Unidades");

				//Con solo un error se para la validacion de unidades:
				return;	
			}
			else{
				todoBien = true;
				uniUser[i].className = "uniBien";
			}
		}

		//Si no hay errores, se ejecuta la siguiente funcion Calcular el total a Pagar
		if (todoBien){
			calculaElTotal();
		}
		
	}

	

	
//Funcion que muestra el monto a pagar
	function calculaElTotal(elEvento) {

	
		//Añade el encabezado de la tabla
		document.getElementById("tablaTotal").innerHTML = '<tr><td class="pro"><b>Producto</b></td><td class="uni"><b>Unidades</b></td><td class="preUni"><b>Precio Unidad</b></td><td class="preTotal"><b>Precio Total</b></td></tr>';
	
	
		//Inicializacion de las variables para esta funcion:
		let carroTotal = 0;
		let numProductos = 0;
		
		
		//Muestra el carrito de la compra
		for (i in productos){

			let tablaTotal = document.getElementById("tablaTotal").innerHTML;
			let preTotal = 0;
		
			
			//Cuenta el numero de productos para saber cuanto costara el transporte
			if (uniUser[i].value != 0){
				numProductos++;
			}
			
			
			if (uniUser[i].value != 0){
			
				//Modifica el css para hacer hueco a los formularios
				document.getElementById("todo").className = "todoSi";
				document.getElementById("menu").className = "menuSi";
				document.getElementById("divZonaCompra").className = "divZonaCompraSi";
				document.getElementById("divTotal").className = "divsSi";
/**/			document.getElementById("divDatos").className = "divsNo";
/**/			document.getElementById("divPago").className = "divsNo";				
				
				//Habilita el boton de datos personales
				document.getElementById("botonDatos").disabled = false;
				
				//Calcula el totalUnidades y rellena el carro de la compra
				preTotal = precios[i] * uniUser[i].value;
				carroTotal = carroTotal + preTotal;
				document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr class="proCarrito"><td>' +productos[i]+ '</td><td>' +uniUser[i].value+ '</td><td>' +precios[i]+ '</td><td id="preTotal' +i+'" name="preTotal">' +preTotal+ '</td></tr>';
			}
		}
		

		//Se calcula el transporte a pagar segun la cantidad de productos comprados:
		let precioTransporteAPagar;
		if (numProductos <= 2){
			precioTransporteAPagar = precioTransporte[0];
		}
		else if (numProductos <= 3){
			precioTransporteAPagar = precioTransporte[1];
		}
		else if (numProductos <= 4){
			precioTransporteAPagar = precioTransporte[2];
		}
		else if (numProductos >= 5){
			precioTransporteAPagar = precioTransporte[3];
		}

		//Se sacan las cuentas del transporte (si lo hubiese), del iva y el total:
		let totalTransporte = precioTransporteAPagar;

		//Inicializacion de las variables para esta funcion:
		let totalIVA = 0;
		let totalAPagar =0;

		if(totalTransporte == "gratis"){
			 totalIVA = (carroTotal * IVA);
			 totalAPagar = carroTotal + totalIVA;
		}
		else{
			 totalIVA = ((carroTotal + totalTransporte) * IVA);
			 totalAPagar = carroTotal + totalTransporte + totalIVA;
		}

		
		//Limitar a 2 los decimales a mostrar del IVA:
		totalIVA=totalIVA*100;
		totalIVA=Math.floor(totalIVA);
		totalIVA=totalIVA/100;

		//Limitar a 2 los decimales a mostrar del TOTAL A PAGAR:
		totalAPagar=totalAPagar*100;
		totalAPagar=Math.floor(totalAPagar);
		totalAPagar=totalAPagar/100;		
		
		//Se añade a la tabla el TOTAL que suma el carrito:
		tablaTotal = document.getElementById("tablaTotal").innerHTML;
		document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>Transporte: </b></td><td class="preTotal"><b>' +totalTransporte+ '</b></td></tr>' + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>IVA ('+(IVA*100)+'%): </b></td><td class="preTotal"><b>' +totalIVA+ '</b></td></tr>' + '<tr><td>&nbsp;</td>&nbsp;<td></td><td class="preUni"><b>Total: </b></td><td class="preTotal" id="totalAPagar"><b>' +totalAPagar+ ' Colones</b></td></tr>';
	}	
	
//Funcion para activar pedir Datos Personales
	function pideDatos(elEvento) {
		document.getElementById("divDatos").className = "divsSi";
/**/	document.getElementById("divTotal").className = "divsNo";
/**/	document.getElementById("divPago").className = "divsNo";		
		document.getElementById("botonPago").disabled = false;
	}	

//Funcion para validar Datos Personales
	function validaDatosPersonales(elEvento) {

		let todoBien = true;
	
	
		 //Nombre:
			let vNombre = document.getElementById("nombre").value;
			if( vNombre == null || vNombre.length == 0 || /^\s+$/.test(vNombre) || !isNaN(vNombre)) {
				todoBien=false;
				document.getElementById("nombre").className = "textMal";
			}
			else{
				document.getElementById("nombre").className = "textBien";
			}	
	
	
		//DNI: #Mejora Codigo el valor no puede estar Vacio.  	
			let vDNI = document.getElementById("dni").value;
	
			

		//Fecha de nacimiento DIA:
			let vFechaNacimientoDia = document.getElementById("fechaNacimientoDia").selectedIndex;
			if( vFechaNacimientoDia == null || vFechaNacimientoDia == 0 ) {
				todoBien=false;
				document.getElementById("fechaNacimientoDia").className = "textMal";
			}
			else{
				document.getElementById("fechaNacimientoDia").className = "textBien";
			}
		//Fecha de nacimiento MES:
			let vFechaNacimientoMes = document.getElementById("fechaNacimientoMes").selectedIndex;
			if( vFechaNacimientoMes == null || vFechaNacimientoMes == 0 ) {
				todoBien=false;
				document.getElementById("fechaNacimientoMes").className = "textMal";
			}
			else{
				document.getElementById("fechaNacimientoMes").className = "textBien";
			}	
		//Fecha de nacimiento A�O:
			let vFechaNacimientoAnio = document.getElementById("fechaNacimientoAnio").selectedIndex;
			if( vFechaNacimientoAnio == null || vFechaNacimientoAnio == 0 ) {
				todoBien=false;
				document.getElementById("fechaNacimientoAnio").className = "textMal";
			}
			else{
				document.getElementById("fechaNacimientoAnio").className = "textBien";
			}	
	
	
		//Telefono: #Mejora Código el valor no puede estar Vacío.      
			let vMovil = document.getElementById("movil").value;	
	
		//email:
			let vEmail1 = document.getElementById("email1").value;
			let vEmail2 = document.getElementById("email2").value;

			//email 1
			if( !(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail1)) ) {
				todoBien=false;
				document.getElementById("email1").className = "textMal";
			}
			else{
				document.getElementById("email1").className = "textBien";
			}
			
			//email 2
			if( !(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail2)) ) {
				todoBien=false;
				document.getElementById("email2").className = "textMal";
			}
			else{
				document.getElementById("email2").className = "textBien";
			}

			//Comparacion email 1 y 2
			if (vEmail1 != vEmail2){
				todoBien=false;
				document.getElementById("email2").className = "textMal";
			}

			
		 //Nombre Via:
			let vViaNombre = document.getElementById("viaNombre").value;
			if( vViaNombre == null || vViaNombre.length == 0 || /^\s+$/.test(vViaNombre) || !isNaN(vViaNombre)) {
				todoBien=false;
				document.getElementById("viaNombre").className = "textMal";
			}
			else{
				document.getElementById("viaNombre").className = "textBien";
			}				

			
		//Via Numero:	
			let vViaNumero = document.getElementById("viaNumero").value;
			if( vViaNumero=="" || isNaN(vViaNumero) ) {
				todoBien=false;
				document.getElementById("viaNumero").className = "textMal";
			}	
			else{
				document.getElementById("viaNumero").className = "textBien";
			}	

			
		 //Localidad:
			let vLocalidad = document.getElementById("localidad").value;
			if( vLocalidad == null || vLocalidad.length == 0 || /^\s+$/.test(vLocalidad) || !isNaN(vLocalidad)) {
				todoBien=false;
				document.getElementById("localidad").className = "textMal";
			}
			else{
				document.getElementById("localidad").className = "textBien";
			}					

			
		//Codigo Postal:	
			let vCodigoPostal = document.getElementById("codigoPostal").value;
			if( vCodigoPostal.length!=5 || vCodigoPostal=="" || isNaN(vCodigoPostal) ) {
				todoBien=false;
				document.getElementById("codigoPostal").className = "textMal";
			}	
			else{
				document.getElementById("codigoPostal").className = "textBien";
			}	
	
	
		//Provincia:
			let vProvincia = document.getElementById("provincia").selectedIndex;
			if( vProvincia == null || vProvincia == 0 ) {
				todoBien=false;
				document.getElementById("provincia").className = "textMal";
			}
			else{
				document.getElementById("provincia").className = "textBien";
			}	
	
	
		//Si no hay errores, se ejecuta la siguiente funcion que se encarga de mostrar el formulario de los datos personales:
		if (todoBien){
			pideDatosPago();
		}
		else{
			document.getElementById("botonConfirmar").disabled = true;
		}
	}

// Funcion para validar datos y pedir Datos de Pago
	function pideDatosPago(elEvento) {
/**/	document.getElementById("divTotal").className = "divsNo";
/**/	document.getElementById("divDatos").className = "divsNo";
		document.getElementById("divPago").className = "divsSi";
		document.getElementById("botonConfirmar").disabled = false;
	}


// Funcion para Validar Datos de Pago
	function validaDatosPago(elEvento) {
		let todoBien = true;
		let vTitular = document.getElementById("titular").value;
		if( vTitular == null || vTitular.length == 0 || /^\s+$/.test(vTitular) || !isNaN(vTitular)) {
			todoBien=false;
			document.getElementById("titular").className = "textMal";
		}
		else{
			document.getElementById("titular").className = "textBien";
		}			
	
	
		//Tipo de tarjeta:
		let vTarjetas = document.getElementsByName("tarjetas");
		let seleccionado = false;
		for(let i=0; i<vTarjetas.length; i++) {
			if(vTarjetas[i].checked) {
				seleccionado = true;
				
			}
		}
		if(!seleccionado) {
			todoBien=false;
			document.getElementById("alertTipoDeTarjeta").className = "alertTipoDeTarjeta";
		}
		else{
			document.getElementById("alertTipoDeTarjeta").className = "";
		}		
	
	
		//Numero de tarjeta:	
		let vNumeroTarjeta = document.getElementById("numeroTarjeta").value;
		if( vNumeroTarjeta.length!=16 || vNumeroTarjeta=="" || isNaN(vNumeroTarjeta) ) {
			todoBien=false;
			document.getElementById("numeroTarjeta").className = "textMal";
		}	
		else{
			document.getElementById("numeroTarjeta").className = "textBien";
		}		

		
		//CVC de la tarjeta:	
		let vCvcTarjeta = document.getElementById("cvcTarjeta").value;
		if( vCvcTarjeta.length!=3 || vCvcTarjeta=="" || isNaN(vCvcTarjeta) ) {
			todoBien=false;
			document.getElementById("cvcTarjeta").className = "textMal";
		}	
		else{
			document.getElementById("cvcTarjeta").className = "textBien";
		}	

		
		//Fecha de tarjeta Mes:
		let vMesTarjeta = document.getElementById("mesTarjeta").selectedIndex;
		if( vMesTarjeta == null || vMesTarjeta == 0 ) {
			todoBien=false;
			document.getElementById("mesTarjeta").className = "textMal";
		}
		else{
			document.getElementById("mesTarjeta").className = "textBien";
		}	
		//Fecha de tarjeta año:
		let vAnioTarjeta = document.getElementById("anioTarjeta").selectedIndex;
		if( vAnioTarjeta == null || vAnioTarjeta == 0 ) {
			todoBien=false;
			document.getElementById("anioTarjeta").className = "textMal";
		}
		else{
			document.getElementById("anioTarjeta").className = "textBien";
		}				


		//Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de enviar los datos:
		if (todoBien){
			validaDatosPagoYEnviaCarro();
		}
	}

	

// Funcion para validar datos de pago y enviar Datos
	function validaDatosPagoYEnviaCarro(elEvento) {

//		#Mejora Código salvar datos de Orden de Compra en Maestro detalle Base de Datos si todo esta OK
// Desplagar la Alerta con el numero de la ordern de Compra 


		alert("Gracias por su compra, en 24 horas recivira su pedido\nAhora sera redirigido a la pagina de inicio.");
		window.location.reload()

	}

	
	
	
