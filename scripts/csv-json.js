function myFunction(file){
                var ctype=file.name;
                
                if(ctype.endsWith(".csv")||ctype.endsWith(".CSV"))
                    {
                Papa.parse(file, {
	complete: function(results) {
        csvTojs( results.data);}
        });                 
                    }
                    else if(ctype.endsWith(".JSON")||ctype.endsWith(".json")){
                        fileToText(file);
                    }
}
function csvTojs(lines) {
  var result = [];
  var headers = lines[0];
  for(let i=0;i<headers.length;i++)
  {
    var head=headers[i];
   
       if(head.charCodeAt(0)===8220){
        headers[i]=head.substring(1);
    }
    head=headers[i];
    if(head.charCodeAt(head.length -1)===8221){
        headers[i]=head.substring(0,head.length - 1);
    }
  }

  for(let i=1; i<lines.length;i++) {
    var obj = {};

    var row = lines[i];
    var flag=0;
    for(let k=0;k<row.length;k++)
    {
        if(row[k]!=="")
            {flag=1;break;}
    }
    if (flag===0)
    {
        continue;
    }
    query=0;
    for(let j=0;j<row.length;j++) {
      
        var value = row[j];

        /* skip first double quote */
        if (value.charCodeAt(0) === 8220) { value = value.substr(1); }
        /* skip last double quote */
        if (value.charCodeAt(value.length - 1) === 8221) { value = value.substr(0, value.length - 1); }

        var key = headers[query++];
        obj[key] = value; 
      }
      
      if(i==1)
      {
          result.push('['+JSON.stringify(obj));
      }
      else if(i==(lines.length-1))
      {
          result.push(JSON.stringify(obj)+']');
      }
      else
      {
        result.push(JSON.stringify(obj));
      }
  }
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
               text_area.innerHTML=result.toString();
 // save(result,"res.JSON");
            dbtn.addEventListener("click",function(){
             if(fname.value!==""){
               save(result,fname.value+".json");
             }
             else{
              save(result,file.files[0].name.split(".")[0]+".json");
             }
        });
}
function save(content, fileName, mime) {
  const blob = new Blob([content], {
    tipe: mime
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
}
function fileToText(file) {
  var reader = new FileReader();
  //console.log("reader is created");
  reader.readAsText(file);
  //console.log("file read");
  reader.onload = () => {
   // console.log(reader.result);
    var csv=Papa.unparse(reader.result);
    //console.log(csv);
    //save(csv,"resu.csv");
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
               text_area.innerHTML=csv.toString();
        dbtn.addEventListener("click",function(){
             if(fname.value!==""){
               save(csv,fname.value+".csv");
             }
             else{
              save(csv,file.files[0].name.split(".")[0]+".csv");
             }
  });
}
}   
