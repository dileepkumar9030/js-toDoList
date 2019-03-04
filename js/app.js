//get elements

const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.getElementById('clear-list');
const feedback = document.querySelector('.feedback'); 

//let itemData=[];

let itemData = JSON.parse(localStorage.getItem('list')) || [];
//console.log(itemData);
if(itemData.length>0){
    itemData.forEach(function(singleItem){
        itemList.insertAdjacentHTML("beforeend", 
        `
            <div class="item my-3">
                <h5 class="item-name text-capitalize">${singleItem}</h5>
                <div class="item-icons">
                <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
                <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
                <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
                </div>
            </div>
        `
        );
        handleItem(singleItem);
    });
}




//form submission
itemForm.addEventListener('submit', function(event){
    event.preventDefault();

    const textValue= itemInput.value;
    //console.log(textValue)
    if(textValue===''){
        showFeedback('Please enter valid value', 'danger');
    }else{
        //add item
        addItem(textValue);
        //clear the form
        itemInput.value='';
        //add item to itemData
        itemData.push(textValue);
        //console.log(itemData);

        //local storage
        localStorage.setItem('list', JSON.stringify(itemData));


        //add listeners to icons
        handleItem(textValue);
    }
});


//showFeedback function
function showFeedback(text, action){
    feedback.classList.add('showItem', `alert-${action}`);
    feedback.innerHTML = `<p>${text}</p>`;
    setTimeout(function(){
        feedback.classList.remove('showItem', 'alert-${action}');
    }, 3000);
}

//addItem function
function addItem(value){
    const div=document.createElement('div');
    div.classList.add('item', 'my-3');
    div.innerHTML=`<h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;
    //console.log(div);
    itemList.appendChild(div);
}

//document.querySelector('.item-icon').classList.add('showItem'); --- this doesnot works due to JS asynchronous behaviour

//handleItem function ---- this works
function handleItem(textValue){
    const items = itemList.querySelectorAll('.item');
    //console.log(items);
    items.forEach(function(item){
        if(item.querySelector('.item-name').textContent===textValue){
            //Complete event listener
            item.querySelector('.complete-item').addEventListener('click', function(){
                item.querySelector('.item-name').classList.toggle('completed');
                //console.log(this);
                this.classList.toggle('visibility');
            });

            //Edit event listener
            item.querySelector('.edit-item').addEventListener('click', function(){
                itemInput.value=textValue;
                itemList.removeChild(item);
                //console.log(itemList);
                //console.log(itemData);
                itemData=itemData.filter(function(item){
                    return item !== textValue;
                });
                //console.log(itemData);
                localStorage.setItem('list', JSON.stringify(itemData));
            });

             //Delete event listener
             item.querySelector('.delete-item').addEventListener('click', function(){
                itemList.removeChild(item);
                //console.log(itemList);
                //console.log(itemData);
                itemData=itemData.filter(function(item){
                    return item !== textValue;
                });
                //console.log(itemData);
                localStorage.setItem('list', JSON.stringify(itemData));
                showFeedback('Item deleted', 'success');
            });
        }
    }); 
}

//ClearBtn

clearBtn.addEventListener('click', function(){
    itemData=[];
    localStorage.removeItem('list');
    const items= itemList.querySelectorAll('.item');
    if(items.length>0){
        items.forEach(function(item){
            itemList.removeChild(item);
        });
    }
});

