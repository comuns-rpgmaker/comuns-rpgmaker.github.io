function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("es-include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Arquivo não encontrado.";}
            elmnt.removeAttribute("es-include-html");
            includeHTML();
          }
        } 
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }
  
  function loadDoc(page_name) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("post_area").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", page_name + ".html", true);
    xhttp.send();
  
    var buttons = document.getElementsByTagName('button')
    var id = "i_" + page_name
    for (var i in buttons) {
        if (buttons[i].id == id) {
            buttons[i].classList.toggle("active");
        } else {
            buttons[i].classList.remove("active");
        }
    }
  
  }
  
  function pageChange() {
      var url = document.URL
      var section = url.substr(url.lastIndexOf('/') + 1);
      var name = section.substr(section.lastIndexOf('#') + 1);
      
      if (name == ""){
          name = "home"
      }
  
      loadDoc(name);
  
  }