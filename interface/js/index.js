window.onload = getDrinks;

function getDrinks(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var drinks = this.responseText.split("<br>");
            var names = new Array();
            var nums = new Array();
            var Imgs = new Array();
            var Total = 0;
            var parent = document.getElementsByClassName("inventory-container")[0]
            parent.innerHTML = "";
            for(i=0;i<drinks.length-1;i++){
                names.push(drinks[i].split(",")[0]);
                nums.push(drinks[i].split(",")[1]);
                Imgs.push(drinks[i].split(",")[2]);
                if(!isNaN(parseInt(drinks[i].split(",")[1]))){
                    Total+= parseInt(drinks[i].split(",")[1]);
                }
                var div = document.createElement("div");
                div.className = "inv-tile";
                var img = document.createElement("img");
                img.src = Imgs[i];
                var h4 = document.createElement("h4");
                h4.innerHTML = names[i];
                var p = document.createElement("p");
                p.innerHTML = nums[i];
                div.appendChild(img);
                div.appendChild(h4);
                div.appendChild(p);
                
                parent.appendChild(div);
            }
            
            document.getElementById("beeropen").getElementsByTagName("h2")[0].innerHTML = Total;
        }
    };
    xhttp.open("POST", "php/getDrinks.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function sendPython(input){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == "thrue"){
                $.ajax({
                    type: "POST",
                    url: "/addDrink.py",
                    data: { param: input },
                    success: callbackFunc
                });
            } else {
                error("Please place a drink on the beer mat to start.");
            }
        }
    };
    xhttp.open("POST", "drinkReady.txt", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function error(message){
    var error = document.getElementById("error");
    error.style.display = "block";
    setTimeout(function(){
        error.getElementsByTagName("p")[0].innerHTML = message;
        error.style.top = "0px";
        error.style.opacity = "1";
    }, 10);
}