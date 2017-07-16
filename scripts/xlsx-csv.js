var saveData = (function () { // file saver
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (blob, fileName) {
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
                };
                }());



var toCsv=(function(){ // xlsx to csv converter
            var file=document.getElementById("file");
            var display_div=document.getElementById("disp_div")||document.createElement("DIV");
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
            //console.log("Parsing....");
            var data = e.target.result;
            var workbook = XLSX.read(data,{type:'binary'});
            workbook.SheetNames.forEach(function(sheetName){
            var XL_row_object = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
            var json_object = JSON.stringify(XL_row_object);
            console.log(json_object);
            text_area.innerHTML=XL_row_object;
            dbtn.addEventListener("click",function(){
             if(fname.value!==""){
               saveData(new Blob([XL_row_object]),fname.value+".csv");
             }
             else{
              saveData(new Blob([XL_row_object]),file.files[0].name.split(".")[0]+".csv");
             }
             
            });
            
            })
            };
            reader.onerror = function(ex){
            console.log(ex);
            };
            reader.readAsBinaryString(file.files[0]);
        });
        
var toXlsx=(function(){ // csv to xlsx converter
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
            text_area.innerHTML=data;
            dbtn.addEventListener("click",function(){
             if(fname.value!==""){
               saveData(new Blob([data]),fname.value+".xlsx");
             }
             else{
              saveData(new Blob([data]),file.files[0].name.split(".")[0]+".xlsx");
             }
            });
            }
            reader.onerror = function(ex){
            console.log(ex);
            };
            reader.readAsBinaryString(file.files[0]);
            });