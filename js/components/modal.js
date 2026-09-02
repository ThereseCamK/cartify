export function createModal(id, title, message, buttons){
 
  
    return /*HTML */`
        <dialog id="${id}" class="modal">
        <button class="modal-close x-close" aria-label="Close">
            ×
        </button>
            <div class="modal-content btn">
                <h1>${title}</h1>
                <p class="modal-message">${message}</p>
                ${buttons}
            </div>
        </dialog>
    `;
}

export function showModal(id, message){
   
    const modal = document.querySelector(`#${id}`);
    if(!modal) return;

    const messageElement = modal.querySelector(".modal-message");

    if(messageElement){
        messageElement.textContent = message;
    }

    modal.showModal();
}

export function initModal(id){
   
    const modal = document.querySelector(`#${id}`);
   
    
    if(!modal) return;

    const closeButton = modal.querySelectorAll(".modal-close");

    closeButton.forEach(button => {
        button.addEventListener("click", () => {
           
            modal.close();
        });
        
    });
}