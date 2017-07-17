var toXml = (function(){ //json to xml
            var file=document.getElementById("file");
            var display_div=document.getElementById("disp_div")||document.createElement("DIV");
             console.log(display_div.hasChildNodes("TEXTAREA"));
            display_div.id="disp_div";
            display_div.style="position:absolute;left:400px;top:50px";
            var text_area=document.getElementById("disp_content")||document.createElement("TEXTAREA");
            text_area.id="disp_content";
            text_area.style="height:300px;width:500px;color:red";
            var dbtn=document.createElement("BUTTON");
            dbtn.id="download";
            dbtn.innerHTML="Download";
            var fname=document.createElement("INPUT");
            fname.type="text";
            fname.id="fname";
            fname.placeholder="File name(optional)";
            dbtn.innerHTML="Download";
            if(display_div.hasChildNodes("TEXTAREA")){
                console.log(document.getElementById("download"));
               display_div.removeChild(document.getElementById("download"));
               display_div.removeChild(document.getElementById("fname"));
               display_div.appendChild(dbtn);
               display_div.appendChild(fname);
            }
            else{
              display_div.appendChild(text_area);
              display_div.appendChild(document.createElement("BR"));
              display_div.appendChild(dbtn);
              display_div.appendChild(fname);
              document.body.appendChild(display_div);
               }
            
            var reader = new FileReader();
            reader.onload = function(e){
            var data = e.target.result;
            var x2js = new X2JS();
            var jsonObj=JSON.parse(data);
            var xmlAsStr = x2js.json2xml_str( jsonObj );
            text_area.innerHTML=xmlAsStr;
            dbtn.addEventListener("click",function(){
             if(fname.value!==""){
               saveData(new Blob([data]),fname.value+".xml");
             }
             else{
              saveData(new Blob([data]),file.files[0].name.split(".")[0]+".xml");
             }
            });
            }
            reader.onerror = function(ex){
            console.log(ex);
            };
            reader.readAsBinaryString(file.files[0]);
            });


var toJson = (function(){ //xml to json
            var file=document.getElementById("file");
            var display_div=document.getElementById("disp_div")||document.createElement("DIV");
             console.log(display_div.hasChildNodes("TEXTAREA"));
            display_div.id="disp_div";
            display_div.style="position:absolute;left:400px;top:50px";
            var text_area=document.getElementById("disp_content")||document.createElement("TEXTAREA");
            text_area.id="disp_content";
            text_area.style="height:300px;width:500px;color:red";
            var dbtn=document.createElement("BUTTON");
            dbtn.id="download";
            dbtn.innerHTML="Download";
            var fname=document.createElement("INPUT");
            fname.type="text";
            fname.id="fname";
            fname.placeholder="File name(optional)";
            dbtn.innerHTML="Download";
            if(display_div.hasChildNodes("TEXTAREA")){
                console.log(document.getElementById("download"));
               display_div.removeChild(document.getElementById("download"));
               display_div.removeChild(document.getElementById("fname"));
               display_div.appendChild(dbtn);
               display_div.appendChild(fname);
            }
            else{
              display_div.appendChild(text_area);
              display_div.appendChild(document.createElement("BR"));
              display_div.appendChild(dbtn);
              display_div.appendChild(fname);
              document.body.appendChild(display_div);
               }
            
            var reader = new FileReader();
            reader.onload = function(e){
            var data = e.target.result;
            var x2js = new X2JS();   
            var xmlText = data;
            var jsonObj = x2js.xml_str2json( xmlText );
            text_area.innerHTML=JSON.stringify(jsonObj);
            dbtn.addEventListener("click",function(){
             if(fname.value!==""){
               saveData(new Blob([data]),fname.value+".json");
             }
             else{
              saveData(new Blob([data]),file.files[0].name.split(".")[0]+".json");
             }
            });
            }
            reader.onerror = function(ex){
            console.log(ex);
            };
            reader.readAsBinaryString(file.files[0]);
            });