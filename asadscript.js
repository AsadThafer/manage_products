let prods = [];
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
        document.getElementById('productform').reset();
        $("#outputready").append( 
        `<div class="col-4"><input type="hidden" value='${JSON.stringify(data)}' > 
          <img src="${data.imageURL}" width=100% height= 60% >
          <p> ${data.ProductName}  ${data.Price}$ </br>
             ${data.Description} </br>
             ${data.BadgeText} </br>
             ${data.Color}  </p>
             <button type="button" class="btn btn-primary" onclick="edit(event)" >Update Product</button>
             <button type="button" class="btn btn-danger" onclick="this.parentElement.style.display = 'none';">Delete Product</button>
             
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
    json = target.parentNode.firstChild.value;
    obj = JSON.parse(json);
    addp = document.getElementById('AddP');
    addp.style.display = 'none';
    Savep = document.getElementById('SaveP');  
    Savep.style.display = 'block';
    var form = document.forms[0];
    form.querySelector('input[name="imgurl"]').value =obj.imageURL;
    form.querySelector('input[name="productname"]').value =obj.ProductName;
    form.querySelector('input[name="Price"]').value =obj.Price;
    form.querySelector('input[name="Description"]').value =obj.Description;
    form.querySelector('input[name="badgetext"]').value =obj.BadgeText;
    form.querySelector('input[name="colorr"]').value =obj.Color;

    olddiv = target.parentNode;
    Savep.onclick = () => {
        addp.style.display = 'block';
        Savep.style.display = 'none';
        olddiv.style.display = 'none';
        submitHandler();
    
        document.getElementById('productform').reset();
        
        
      }
    

}



