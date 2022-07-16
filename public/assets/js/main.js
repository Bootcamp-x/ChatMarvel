// lógica central de la aplicación
let channels = document.querySelectorAll(".channel");

channels.forEach((element) => {
    element.addEventListener("click", function (e){
        const previos = document.querySelectorAll(".channel.-active")
        previos.forEach((element) => {
          element.classList.remove("-active");
        });

    const nameChannel = e.currentTarget.dataset.name;
    let channelsSelected = document.querySelectorAll(`[data-name="${nameChannel}"]`);
    channelsSelected.forEach((element) => {
      element.classList.add("-active")
    })
        
    })
})