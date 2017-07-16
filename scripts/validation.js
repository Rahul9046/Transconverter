
(function(){
var file_selector=document.getElementById("file");
var convert_button=document.getElementById("convert");

var check_types=(function(){
  if(file_selector.dataset.type===arguments[0]){
   return false;
  }
  return true;
});

var perform_conversion=(function(){
    switch(arguments[0]){
        case "csv": toCsv();
                    break; 
        case "xlsx":toXlsx();
                    break;      
    }
});

var setFileType=(function(){
switch(arguments[0].value){
case 'xlsx':file_selector.setAttribute('accept','.xlsx');
            file_selector.setAttribute('data-type','xlsx');
            break; 
case 'csv':file_selector.setAttribute('accept','.csv');
           file_selector.setAttribute('data-type','csv');
            break;            
case 'json':file_selector.setAttribute('accept','.json');
            file_selector.setAttribute('data-type','json');
            break;            
case 'xml':file_selector.setAttribute('accept','.xml');
           file_selector.setAttribute('data-type','xml');
            break;            
}    
});

file_selector.addEventListener("click",function(e){
                             var check=0,checked_ele;
                             var inputs=document.getElementById("inputs").getElementsByTagName("input");
                             for(var i=0;i<inputs.length;i++){
                             if(inputs[i].checked){
                                 check=1;checked_ele=inputs[i];
                             }
                            }
                            if(check){
                            setFileType(checked_ele);
                            }
                            else{
                                alert("Please select an input category");
                                e.preventDefault();
                            }
                        });

convert_button.addEventListener("click",function(){
                                var outputs=document.getElementById("outputs").getElementsByTagName("input");
                                var check=0,checked_ele;
                                for(var i=0;i<outputs.length;i++){
                                 if(outputs[i].checked){
                                   check=1;checked_ele=outputs[i];
                                 }
                                }
                                if(check){
                                   if(check_types(checked_ele.value)){
                                     perform_conversion(checked_ele.value);
                                   }
                                   else{
                                    alert("You have selected same types for input and output");
                                   }
                                }
                                else{
                                  alert("Please select an output format");
                                }
                            });
})();