var submitBtn = document.querySelector('#seeCols');
submitBtn.addEventListener('click', searchCOL);

function searchCOL() {
	console.log(document.querySelector('#dbName').textContent);

	var content = document.querySelector('#dbName').textContent;
	console.log(content)
	if (content != "") {
	fetch('/dbSearched/db/collections?' + new URLSearchParams({
    dbName: content
	}), {
    method: 'GET'
  	}).then(function(response) {
  	console.log(response);
    response.json().then(data=>{
    	console.log(data);
    	var d1 = document.getElementById('collectionsToSee');
    	for (var i = 0; i < data.length; i++) {
    		d1.innerHTML += '<div class="collectionDiv"><p class="collectionC">' + data[i].name + '</p><button onClick="renderRecords(this.id)"  id=' + data[i].name +' class="buttonCollection">See Records</button></div><div class="recordDown" id=' + data[i].name + '></div>';
    	}
    })
  		}).then(function(data) {
  			console.log(data);
  		});
  	}
}



function renderRecords(colId){
	var content = document.querySelector('#dbName').textContent;
	fetch('/dbSearched/db/col?' + new URLSearchParams({
    colName: colId,
    dbName: content
	}), {
    method: 'GET'
  	}).then(function(response) {
  	console.log(response);
    response.json().then(data=>{
    	console.log(data);
    	var d1 = document.querySelector('div#' + colId);
    	for (var i = 0; i < data.length; i++) {
    		d1.innerHTML += "<div class='dbs' id=" + data[i].name + ">" + data[i].name + "</p><p class='pMongo'>Record</p><button onClick='goToDB(this.id)' class='buttonDB' id=" + data[i].name + ">Delete</button></div>";
    	}
    })
  	}).then(function(data) {
  			console.log(data);
  	});
}

