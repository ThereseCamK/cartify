export function createValidationModal() {
    return `
        <dialog id="validationModal" class="validation-modal">
            
            <div class="modal-content">
                <h2>Something went wrong</h2>

                <p id="validationMessage"></p>

                <button
                    id="closeValidationModal"
                    type="button"
                    class="btn primary-color"
                >
                    Try again
                </button>
            </div>
        </dialog>
    `;
}
export function showValidationModal(message) {
    const modal = document.querySelector("#validationModal");
    const messageElement =
        document.querySelector("#validationMessage");

    messageElement.textContent = message;

    modal.showModal();
}

export function initValidationModal() {
    const modal = document.querySelector("#validationModal");
    const closeButton =
        document.querySelector("#closeValidationModal");

    closeButton.addEventListener("click", () => {
        console.log("try again funker ?")
        modal.close();
    });
}