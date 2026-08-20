export function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container');
  

  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.innerText = message;
  

  container.appendChild(toast);
  
 
  setTimeout(() => {
    toast.classList.add('fade-out');
    
  
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3000);
  
}


