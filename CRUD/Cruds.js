let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ad = document.getElementById('ad')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')



let mood = 'create';
let tmp ;

// get total


function getTotal()
{
    if(
        price.value !=''
    ){
        let result = (+price.value + +taxes.value + +ad.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background =' #040';
    }else{

        total.innerHTML ='';
        total.style.background = '#a00d02';
    }
}

// create products


let dataPro;

if(
    localStorage.product != null
){
    dataPro = JSON.parse(localStorage.product)
}else{
     dataPro = [];
}





submit.onclick = function(){
    let nwePro = {

        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ad:ad.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
        
    }
  
// count
if(title.value != ''
&& price.value !='' 
&& category.value != ''
&& nwePro.count < 100 )
{
    if(mood === 'create'){
    if(nwePro.count > 1){
        for(let i = 0; i < nwePro.count;i++){
            dataPro.push(nwePro);
        }
    }else{
        dataPro.push(nwePro);
    }
}else{
    dataPro[      tmp      ] = nwePro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block';
}
   
}


    // save localstorage
    localStorage.setItem('product',    JSON.stringify(dataPro)     )
     


    clearData()
    showdate()
}



// clear inputs


function clearData(){
    title.value = '';
    discount.value = '';
    price.value = '';
    taxes.value = '';
    ad.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showdate(){
    getTotal()
    let table ='';
    for(let i = 1; i < dataPro.length;i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ad}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button  onclick = 'updateData(   ${i}   )' id="update">update</button>
            <td><button onclick = 'deleteData(   ${i}   )'  id="delete">delete</button></td>
        </tr>` ;
        
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick = 'deleteAll() '>delete All (${dataPro.length})</button> `
    }else{
        btnDelete.innerHTML = '';
    }
}



// delete


function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showdate()
}

 function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showdate()
}


// update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ad.value = dataPro[i].ad;
    discount.value = dataPro[i].discount;


    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML  = 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}



// sraech


let sraechMood = 'title';

function getsraechMood(id)
{
    let sraech = document.getElementById('sraech');
    
   if(id == 'searchTitle'){
    searchMood = 'title';

   }else{
    searchMood = 'category';
   }
   search.placeholder = 'Search By '+ searchMood;
search.focus()
search.value = '';
showdate();

}


function searchData(value)
{
    let table = '';



    
   if(searchMood == 'title')
   {

   

    
    for(let i = 0; i < dataPro.length; i++){
        if(dataPro[i].title.includes(value)){
          table += `
          <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ad}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button  onclick = 'updateData(   ${i}   )' id="update">update</button>
              <td><button onclick = 'deleteData(   ${i}   )'  id="delete">delete</button></td>
          </tr>` ;
     



        }
    }


} 

  
  else{

    for(let i = 0; i < dataPro.length; i++){
        if(dataPro[i].category.includes(value)){
          table += `
          <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ad}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button  onclick = 'updateData(   ${i}   )' id="update">update</button>
              <td><button onclick = 'deleteData(   ${i}   )'  id="delete">delete</button></td>
          </tr>` ;
     



        }
    }
  }


  document.getElementById('tbody').innerHTML = table;

}



// cleaan date
