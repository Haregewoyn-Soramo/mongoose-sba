const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector('.searchToggle'),
      sidebarOpen = document.querySelector('.sidebarOpen'),
      sidebarClose= document.querySelector('.sidebarClose');

      let getMode = localStorage.getItem("mode");
        if(getMode && getMode === "night-mode"){
           body.classList.add("dark")
        }
      

  //  for dark and light mode
    modeToggle.addEventListener("click", () =>{
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark")

    if(!body.classList.contains("dark")){
      localStorage.setItem("mode", "light-mode")
    }
    else{
      localStorage.setItem("mode", "night-mode")
    }
    
})

  //  for search and cancel mode
    searchToggle.addEventListener("click", () =>{
    searchToggle.classList.toggle("active");
    }) 
  
  //  for sidebar open
     sidebarOpen.addEventListener("click", () =>{
      nav.classList.add("active");
     }) 

     body.addEventListener("click", e =>{
      let clickedItem = e.target;

      if(!clickedItem.classList.contains("sidebarOpen") && !clickedItem.classList.contains("menu")){
        nav.classList.remove("active");
      }
     }) 
   



