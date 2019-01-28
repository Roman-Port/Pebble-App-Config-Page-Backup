	var rojo = 0;
	var verde = 0;
	var azul = 0;
        var diasem = new Array (new Array("So","Mo","Di","Mi","Do","Fr","Sa"), new Array("Su","Mo","Tu","We","Th","Fr","Sa"), new Array("Do","Lu","Ma","Mi","Ju","Vi","Sa"), new Array("Di","Lu","Ma","Me","Je","Ve","Sa"), new Array("Do","Lu","Ma","Me","Gi","Ve","Sa"));

        function camcol(boton) {
	      document.getElementById("color").style.backgroundColor = 'rgb('+rojo+', '+verde+', '+azul+')';
	      for (i=0; i<=255; i=i+85){
		      document.getElementById(boton.substring(0, 1)+i).style.borderRadius = "15px";
	      }
	      document.getElementById(boton).style.borderRadius = "0px";
        }
        
        function asicol(iden) {
	      document.getElementById(iden).style.backgroundColor = document.getElementById("color").style.backgroundColor;
	      if (iden == "fondo") document.getElementById('fielfondo').style.backgroundColor = document.getElementById("color").style.backgroundColor;
              dibujar();
        }

	function estsun() {
	      if (document.getElementById('sun').checked) {
		      document.getElementById('suho').style.display='block';
		      document.getElementById('sumi').style.display='block';
	      } else {
		      document.getElementById('suho').style.display='none';
		      document.getElementById('sumi').style.display='none';
	      }
        }

        function saveOptions() {
            codigo();
            var options = {"CODE": $("#CODE").val()};
            return options;
       }
       
        function wseg() {
            if (parseInt(document.getElementById('secma').value) <= parseInt(document.getElementById('secmi').value)) document.getElementById('secma').value = parseInt(document.getElementById('secmi').value) + 1;
            if (parseInt(document.getElementById('secmi').value) >= parseInt(document.getElementById('secma').value)) document.getElementById('secmi').value = parseInt(document.getElementById('secma').value) - 1;
            document.getElementById('secw').innerHTML = document.getElementById('secma').value-document.getElementById('secmi').value;
            dibujar();
        }
        function wmin() {
            if (parseInt(document.getElementById('minma').value) <= parseInt(document.getElementById('minmi').value)) document.getElementById('minma').value = parseInt(document.getElementById('minmi').value) + 1;
            if (parseInt(document.getElementById('minmi').value) >= parseInt(document.getElementById('minma').value)) document.getElementById('minmi').value = parseInt(document.getElementById('minma').value) - 1;
            document.getElementById('minw').innerHTML = document.getElementById('minma').value-document.getElementById('minmi').value;
            dibujar();
        }
        function whor() {
            if (parseInt(document.getElementById('horma').value) <= parseInt(document.getElementById('hormi').value)) document.getElementById('horma').value = parseInt(document.getElementById('hormi').value) + 1;
            if (parseInt(document.getElementById('hormi').value) >= parseInt(document.getElementById('horma').value)) document.getElementById('hormi').value = parseInt(document.getElementById('horma').value) - 1;
            document.getElementById('horw').innerHTML = document.getElementById('horma').value-document.getElementById('hormi').value;
            dibujar();
       }

        function dibujar(fin) {
            var w= 144;
            var h = 168;
            var c = document.getElementById("pizarra");
            var ctx = c.getContext("2d");
            var radse = (parseInt(document.getElementById('secma').value)+parseInt(document.getElementById('secmi').value))/2;
            var radmi = (parseInt(document.getElementById('minma').value)+parseInt(document.getElementById('minmi').value))/2;
            var radho = (parseInt(document.getElementById('horma').value)+parseInt(document.getElementById('hormi').value))/2;
            
            ctx.fillStyle = document.getElementById('fondo').style.backgroundColor;
            ctx.fill();
            
            ctx.beginPath();
            if (document.getElementById('PB').value == "c") {
                w = 180;
                h = 180;
                ctx.arc(w/2, h/2, 45, 0, 2 * Math.PI);
                ctx.strokeStyle=document.getElementById('fondo').style.backgroundColor;
                ctx.lineWidth=90;
                ctx.stroke();
                ctx.beginPath();
            } else {
                ctx.fillRect(0, 0, w, h);
            }
            ctx.arc(w/2, h/2, radse, 0, 2 * Math.PI);
            ctx.strokeStyle=document.getElementById('segu').style.backgroundColor;
            ctx.lineWidth=document.getElementById('secw').innerHTML;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2, radmi, 0, 2 * Math.PI);
            ctx.strokeStyle=document.getElementById('minu').style.backgroundColor;
            ctx.lineWidth=document.getElementById('minw').innerHTML;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2, radho, 0, 2 * Math.PI);
            ctx.strokeStyle=document.getElementById('hora').style.backgroundColor;
            ctx.lineWidth=document.getElementById('horw').innerHTML;
            ctx.stroke();
            
            // Dial Lines
            if (document.getElementById('ldia').checked) {
                ctx.strokeStyle=document.getElementById('fondo').style.backgroundColor;
                ctx.lineWidth="1";
                ctx.beginPath();
                if (document.getElementById('PB').value == "c") {
                        ctx.moveTo(90,0);
                        ctx.lineTo(90,180);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(0,90);
                        ctx.lineTo(180,90);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(45,12);
                        ctx.lineTo(135,168);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(45,168);
                        ctx.lineTo(135,12);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(12,45);
                        ctx.lineTo(168,135);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(12,135);
                        ctx.lineTo(168,45);
                } else {
                        ctx.moveTo(72,12);
                        ctx.lineTo(72,156);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(0,84);
                        ctx.lineTo(144,84);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(0,126);
                        ctx.lineTo(144,42);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(30,156);
                        ctx.lineTo(114,12);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(0,42);
                        ctx.lineTo(144,126);
                    ctx.stroke();
                    ctx.beginPath();
                        ctx.moveTo(30,12);
                        ctx.lineTo(114,156);
                }
                ctx.stroke();
            }
            
            // Dial Points
            if (document.getElementById('pdia').checked) {
                for (i = 0; i < Math.PI*2; i=i+Math.PI/6) {
                    var x = parseInt(document.getElementById('dipo').value)*Math.cos(i);
                    var y = parseInt(document.getElementById('dipo').value)*Math.sin(i);
                    ctx.beginPath();
                    if (document.getElementById('PB').value == "c") {
                        ctx.arc(90 + x, 90 + y, 1, 0, 2 * Math.PI);
                    } else {
                        ctx.arc(72 + x, 84 + y, 1, 0, 2 * Math.PI);
                    }
                    ctx.strokeStyle=document.getElementById('dialc').style.backgroundColor;
                    ctx.lineWidth="1";
                    ctx.stroke();
                }
            }

            // Orto y Ocaso
            saveOptions()
            if (document.getElementById('PB').value != "c") {
                if (document.getElementById('sun').checked) {
                    // GRect ((144-extmn)*14/extmn,(144-extmn)*14/extmn,extmn*7/36,extmn*7/36), GOvalScaleModeFitCircle, ancmn*28/extmn
                    var gro = parseInt(document.getElementById('minw').innerHTML)*13/parseInt(document.getElementById('minma').value);
                    var rad = radmi*13/parseInt(document.getElementById('minma').value);
                    ctx.beginPath();
                    ctx.strokeStyle=document.getElementById('sumi').style.backgroundColor;;
                    ctx.lineWidth=String(parseInt(gro));
                    ctx.arc(14, 14, rad, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(130, 14, rad, 0, 2 * Math.PI);
                    ctx.stroke();

                    gro = parseInt(document.getElementById('horw').innerHTML)*13/parseInt(document.getElementById('minma').value);
                    rad = radho*13/parseInt(document.getElementById('minma').value);
                    ctx.beginPath();
                    ctx.strokeStyle=document.getElementById('suho').style.backgroundColor;;
                    ctx.lineWidth=String(parseInt(gro));
                    ctx.arc(14, 14, rad, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(130, 14, rad, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            }
            // Bateria
 
            if (document.getElementById('bat').checked) {
                if (document.getElementById('PB').value == "c") {
                    ctx.beginPath();
                    ctx.strokeStyle="#00ff00";
                    ctx.lineWidth="3";
                    ctx.arc(90, 90, 81, 0, 2 * Math.PI);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.strokeStyle="#00ff00";
                    ctx.lineWidth="6";
                    ctx.arc(14, 154, 10, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            }

           
            // Bluetooth
            
            if (document.getElementById('blu').checked) {
                if (document.getElementById('PB').value == "c") {
                    ctx.beginPath();
                    ctx.strokeStyle="#0000ff";
                    ctx.lineWidth="3";
                    ctx.arc(90, 90, 86, 0, 2 * Math.PI);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.strokeStyle="#0000ff";
                    ctx.lineWidth="6";
                    ctx.arc(130, 154, 10, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            }
            if (document.getElementById('dat').checked) {
                var d = new Date();
                ctx.beginPath();
                ctx.fillStyle = document.getElementById('dialc').style.backgroundColor;
                ctx.font = "bold 16px Arial";
                ctx.textAlign = "center";
                if (document.getElementById('PB').value == "c") {
                    ctx.fillText(diasem[parseInt(document.getElementById('lang').selectedIndex)][d.getDay()], 90, 88);
                    ctx.fillText(d.getDate(), 90, 105);
                } else {
                    ctx.fillText(diasem[parseInt(document.getElementById('lang').selectedIndex)][d.getDay()], 72, 82);
                    ctx.fillText(d.getDate(), 72, 99);
                }
                ctx.stroke();
            }
            
            if (fin != "n") codigo();
        }
        

        function codigo() {
            var sn = 0;
            if (document.getElementById('PB').value != "c") if (document.getElementById('sun').checked) sn=sn+32;
            if (document.getElementById('bat').checked) sn=sn+16;
            if (document.getElementById('blu').checked) sn=sn+8;
            if (document.getElementById('dat').checked) sn=sn+4;
            if (document.getElementById('ldia').checked) sn=sn+2;
            if (document.getElementById('pdia').checked) sn=sn+1;
            var cod = Hex2(sn);
            cod = cod + Hex2(document.getElementById('lang').selectedIndex);
            cod = cod + rgb2Hex(document.getElementById('fondo').style.backgroundColor);
            cod = cod + rgb2Hex(document.getElementById('dialc').style.backgroundColor);
            if (document.getElementById('PB').value != "c") {
                cod = cod + rgb2Hex(document.getElementById('sumi').style.backgroundColor);
                cod = cod + rgb2Hex(document.getElementById('suho').style.backgroundColor);
            } else {
                cod = cod + "0000";
            }
            cod = cod + rgb2Hex(document.getElementById('segu').style.backgroundColor);
            cod = cod + rgb2Hex(document.getElementById('minu').style.backgroundColor);
            cod = cod + rgb2Hex(document.getElementById('hora').style.backgroundColor);
            
            cod = cod + Hex2(parseInt(document.getElementById('secmi').value));
            cod = cod + Hex2(parseInt(document.getElementById('secma').value));
            cod = cod + Hex2(parseInt(document.getElementById('minmi').value));
            cod = cod + Hex2(parseInt(document.getElementById('minma').value));
            cod = cod + Hex2(parseInt(document.getElementById('hormi').value));
            cod = cod + Hex2(parseInt(document.getElementById('horma').value));
            cod = cod + Hex2(parseInt(document.getElementById('dipo').value));

            document.getElementById('CODE').value = cod;
             
        }

        function leercod() {
            var codig = (document.getElementById('CODE').value);
            var dato = [];
            for (i=0; i<codig.length; i+=2) {
                dato.push(parseInt(codig.substr(i,2),16));
            }
            if (document.getElementById('PB').value != "c") document.getElementById('sun').checked = false;
            document.getElementById('bat').checked = false;
            document.getElementById('blu').checked = false;
            document.getElementById('dat').checked = false;
            document.getElementById('ndia').checked = true;
            document.getElementById('ldia').checked = false;
            document.getElementById('pdia').checked = false;
            dato0 = "00000"+dato[0].toString(2);
            if (document.getElementById('PB').value != "c") {
                if (dato0.substr(dato0.length-6,1) == 1) document.getElementById('sun').checked = true;
                $("#sun").checkboxradio("refresh");
            }
            if (dato0.substr(dato0.length-5,1) == 1) document.getElementById('bat').checked = true;
            $("#bat").checkboxradio("refresh");
            if (dato0.substr(dato0.length-4,1) == 1) document.getElementById('blu').checked = true;
            $("#blu").checkboxradio("refresh");
            if (dato0.substr(dato0.length-3,1) == 1) document.getElementById('dat').checked = true;
            $("#dat").checkboxradio("refresh");
            if (dato0.substr(dato0.length-2,1) == 1) document.getElementById('ldia').checked = true;
             if (dato0.substr(dato0.length-1,1) == 1) {
                document.getElementById('pdia').checked = true;
                document.getElementById('ldia').checked = false;
            }
            $("#ldia").checkboxradio("refresh");
            $("#pdia").checkboxradio("refresh");
            $("#ndia").checkboxradio("refresh");

            document.getElementById('lang').selectedIndex = dato[1];
            $("#lang").selectmenu("refresh");

          
            document.getElementById('fondo').style.backgroundColor = rgb4(dato[2]);
            document.getElementById('fielfondo').style.backgroundColor = rgb4(dato[2]);
			document.getElementById('dialc').style.backgroundColor = rgb4(dato[3]);
            if (document.getElementById('PB').value != "c") {
                document.getElementById('sumi').style.backgroundColor = rgb4(dato[4]);
                document.getElementById('suho').style.backgroundColor = rgb4(dato[5]);
            }
            document.getElementById('segu').style.backgroundColor = rgb4(dato[6]);
            document.getElementById('minu').style.backgroundColor = rgb4(dato[7]);
            document.getElementById('hora').style.backgroundColor = rgb4(dato[8]);

            document.getElementById('secmi').value = dato[9];
            document.getElementById('secma').value = dato[10];
            document.getElementById('secw').innerHTML = document.getElementById('secma').value-document.getElementById('secmi').value;
            document.getElementById('minmi').value = dato[11];
            document.getElementById('minma').value = dato[12];
            document.getElementById('minw').innerHTML = document.getElementById('minma').value-document.getElementById('minmi').value;
            document.getElementById('hormi').value = dato[13];
            document.getElementById('horma').value = dato[14];
            document.getElementById('horw').innerHTML = document.getElementById('horma').value-document.getElementById('hormi').value;
            document.getElementById('dipo').value = dato[15];
            
            dibujar("n");
            
        }

        function Hex2(num) {
            var HH = "0" + num.toString(16);
            return HH.substr((HH.length-2),2);
        }
        
        function rgb2Hex(rgb) {
            var rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            var HH = "0" + ((parseInt(rgb[1]) + parseInt(rgb[2])*4 + parseInt(rgb[3])*16)/85).toString(16);
            return HH.substr(HH.length-2,2);
        }

        function rgb2ascii(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            ascii = (parseInt(rgb[1]) + parseInt(rgb[2])*4 + parseInt(rgb[3])*16)/85+48;
            return String.fromCharCode(ascii);
        }

        function rgb4(color) {
            r = Math.floor(color/16);
            g = Math.floor((color-r*16)/4);
            b = Math.floor(color-g*4-r*16);
            return "rgb("+((b*85).toString()+","+(g*85).toString()+","+(r*85).toString())+")";
        }
        
        function fec(fh) {
            var ms = "0" + (fh.getMonth()+1).toString();
            var dd = "0" + fh.getDate().toString();
            var hh = "0" + fh.getHours().toString();
            var mm = "0" + fh.getMinutes().toString();
            return fh.getFullYear().toString() + ms.substr((ms.length-2),2) + dd.substr((dd.length-2),2) + " " + hh.substr((hh.length-2),2) + ":" + mm.substr((mm.length-2),2);
        }
        
        function crearXMLHttpRequest() {
            var xmlHttp=null;
            if (window.ActiveXObject) {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } else { 
                    if (window.XMLHttpRequest) xmlHttp = new XMLHttpRequest();
            }
            return xmlHttp;
        }
        
        $().ready(function () {
            $("#b-cancel").click(function () {
                console.log("Cancel");
                document.location = "pebblejs://close";
            });

            $("#b-submit").click(function () {
                console.log("Submit");
                var location = "pebblejs://close#" + encodeURIComponent(JSON.stringify(saveOptions()));
                console.log("Warping to: " + location);
                console.log(location);
                document.location = location;
                
                conexion = crearXMLHttpRequest(); 
                var url = 'codes_rs3.php?fe=' + fec(new Date()) + '&cd=' + document.getElementById('CODE').value;
                conexion.open('GET', url , true);
                conexion.send(null);

             });
            var recibo = decodeURIComponent(location.search.substring(1));
            var datos = recibo.split("&");
            var obj = jQuery.parseJSON(datos[0]);
            for(key in obj) {
                if ([key] == "CODE") $("#"+[key]).val(obj[key]);
                if ([key] == "PB") $("#"+[key]).val(obj[key]);
	    }
	    if (document.getElementById('PB').value == "c") {
                document.getElementById('nochalk1').innerHTML = "";
                document.getElementById('suho').style.display='none';
                document.getElementById('sumi').style.display='none';
                document.getElementById('pizarra').width = 180;
                document.getElementById('pizarra').height = 180;
                document.getElementById('secmi').max = 90;
                document.getElementById('secma').max = 90;
                document.getElementById('minmi').max = 90;
                document.getElementById('minma').max = 90;
                document.getElementById('hormi').max = 90;
                document.getElementById('horma').max = 90;
                document.getElementById('dipo').max = 90;
            }
	    leercod();
        });

