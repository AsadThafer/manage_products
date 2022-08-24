var order=12;
$(document).ready(function () {
    
$('#productform').validate({ // initialize the plugin
    rules: {
        imgurl: {
            required: true,
            url: true
        },
        productname: {
            required: true,
            minlength: 0
        },
        Price: {
            required: true,
            number: true
        },
        Description: {
            required: true,
            minlength: 5
        },
        badgetext: {
            required: true,
            
        },
    },
    messages: {
        imgurl: "Please enter a valid URL",
        productname: "Please specify the product's name",
        Price: "Please specify a Price",
        Description: "Please enter a Description",
        badgetext: "Please enter a badgeText",
    },
    submitHandler: function (form, e) {
        e.preventDefault();
        let data = {};
        let imgurlval = $("#imgurl").val();
        let productnameval = $("#productname").val();
        let Priceval = $("#Price").val();
        let Descriptionval = $("#Description").val();
        let badgetextval = $("#badgetext").val();
        let colorrval = $("#colorr").val();
        data.imageURL = imgurlval;
        data.ProductName = productnameval;
        data.Price = Priceval;
        data.Description = Descriptionval;
        data.BadgeText = badgetextval;
        data.Color = colorrval;
        data.id = (Math.floor(Math.random() * 100) + 1) + Priceval;
        document.getElementById('productform').reset();

        $("#outputready").append(`
           <div id="${data.id}" class="col-3 col-xs-5 offset-1 order-12 productcard"><input type="hidden" value='${JSON.stringify(data)}'> 
           <div class="row">
             
           </div>
           <div class="imgdiv">
             <img src="${data.imageURL}" width="100%" height="60%">
             <div class="badgeproduct">${data.BadgeText}</div>  
           </div>
 
           <div class="container-fluid productinformation float-sm-right">
             <div class="row">
               <div class="col text-left font-weight-bold text-uppercase">
               ${data.ProductName}
               </div>
               <div class="col text-right">$${data.Price}</div>  
             </div>
             <div class="text-center text-secondary">${data.Description}</div> 
             color:<div class="row-1 mb-4" style="background-color:${data.Color}; border: 1px;width: 20px;height: 20px;"></div> 
             <div class="row flex-nowrap">
             <div class="col-6"><button type="button" class="btn btn-primary btn-block" onclick="edit(event)">Update</button></div>
             <div class="col-6"><button type="button" name="deletebutton" class="btn btn-danger btn-block" onclick="checkbeforedelete()">Delete</button></div>
 
             </div>
         
 
           </div>
       `
        );
      
    },
    invalidHandler: function(){
    }

});

});

function edit(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    uppbttloc = target;
    json = target.parentNode.parentNode.parentNode.parentNode.firstChild.value;
    obj = JSON.parse(json);
    addp = document.getElementById('AddP');
    addp.style.display = 'none';
    Savep = document.getElementById('SaveP');  
    Savep.style.display = 'block';
    var form = document.forms[0];
    let newdata = {};
form.querySelector('input[name="imgurl"]').value =obj.imageURL;
form.querySelector('input[name="productname"]').value =obj.ProductName;
form.querySelector('input[name="Price"]').value =obj.Price;
form.querySelector('input[name="Description"]').value =obj.Description;
 form.querySelector('input[name="badgetext"]').value =obj.BadgeText;
 form.querySelector('input[name="colorr"]').value =obj.Color;

    newdata.id = obj.id;
    console.log(newdata);
    Savep.onclick = (e) => {
        e.preventDefault();
        if ($("#productform").valid()) {           
            addp.style.display = 'block';
            Savep.style.display = 'none';
            oldproduct = document.getElementById(obj.id);
            $(oldproduct).remove();
            console.log(oldproduct);
            newdata.imageURL = form.querySelector('input[name="imgurl"]').value ;
            newdata.ProductName = form.querySelector('input[name="productname"]').value ;
            newdata.Price = form.querySelector('input[name="Price"]').value ;
            newdata.Description = form.querySelector('input[name="Description"]').value ;
            newdata.BadgeText = form.querySelector('input[name="badgetext"]').value ;
            newdata.Color = form.querySelector('input[name="colorr"]').value ;        
            console.log(newdata);
            console.log(JSON.stringify(newdata));
            $("#outputready").append(`
           <div id="${newdata.id}" class="col-3 col-xs-5 offset-1 order-12 productcard"><input type="hidden" value='${JSON.stringify(newdata)}'> 
           <div class="row">
             
           </div>
           <div class="imgdiv">
             <img src="${newdata.imageURL}" width="100%" height="60%">
             <div class="badgeproduct">${newdata.BadgeText}</div>  
           </div>
 
           <div class="container-fluid productinformation float-sm-right">
             <div class="row">
               <div class="col text-left font-weight-bold text-uppercase">
               ${newdata.ProductName}
               </div>
               <div class="col text-right">$${newdata.Price}</div>  
             </div>
             <div class="text-center text-secondary">${newdata.Description}</div> 
             color:<div class="row-1 mb-4" style="background-color:${newdata.Color}; border: 1px;width: 20px;height: 20px;"></div> 
             <div class="row   flex-nowrap">
             <div class="col"><button type="button" class="btn btn-primary btn-block" onclick="edit(event)">Update</button></div>
             <div class="col"><button type="button" name="deletebutton" class="btn btn-danger btn-block" onclick="checkbeforedelete(event)">Delete</button></div>
 
             </div>
         
 
           </div>
       `)
        document.getElementById('productform').reset();


            // updatebuttll=document.getElementById('Updatebutton');
            // founditt= $(updatebuttll).closest('.productcard')[0];
            // $(founditt).remove();
        }
        else{
            alert('check product info before updating');
        }
    
        
        
      }
    

}



function checkbeforedelete(e){
    let isExecuted = confirm("Are you sure you want to delete this "+ obj.ProductName+" ?");
    
    if (isExecuted) {
        e = e || window.event;
        var targetd = e.target || e.srcElement;
        json = targetd.parentNode.parentNode.parentNode.parentNode.firstChild.value;
        obj = JSON.parse(json);                
        foundit = document.getElementById(obj.id);
        $(foundit).remove();
        alert('Product '+ obj.ProductName +' has been deleted');
        } else {
            alert("Action canceled");
        }
        }