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


document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productName = e.target.getAttribute('data-id');
    
    showToast(`🛒 ${productName} added to cart!`);
  });
});