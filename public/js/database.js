function searchDB () {
	var content = document.querySelector('#inputSearch2').value;
	console.log(content)
	if (content != "") {
	fetch('/dbSearched?' + new URLSearchParams({
    dbName: content
	}), {
    method: 'GET'
  	}).then(function(response) {
  	console.log(response);
    response.json().then(data=>{
    	console.log(data);
    	var m = data.dbSearched;
    	console.log(m);
    	removeElement('ejemplo');
    	appendSearch(m);

    })
  		}).then(function(data) {
  			console.log(data);
  		});
  	}
}


var submitBtn = document.querySelector('#buttonSearch2');
submitBtn.addEventListener('click', searchDB);


function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);

}


function appendSearch (argument) {
	var d1 = document.getElementById('created');
	d1.innerHTML += '<div id="ejemplo"></div>';
	var d2 = document.getElementById('ejemplo');
	d2.innerHTML += "<div class='dbs' id=" + argument[0].name + "><img src='./img/full.svg' width='60px;'' height='60px' class='imageCard'><p class='titleCard'>" + argument[0].name + "</p><p class='pMongo'>A mongo DB</p><button onClick='goToDB(this.id)' class='buttonDB' id=" + argument[0].name + ">Go to DB</button></div>"	

}


function goToDB (id){
	fetch('/dbSearched/db?' + new URLSearchParams({
    dbName: id
	}), {
    method: 'GET'
  	}).then(function(response) {
  	console.log(response);    
  		}).then(function(data) {
  			console.log(data);
  		});
}