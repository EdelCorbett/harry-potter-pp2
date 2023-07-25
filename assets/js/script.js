const openModalBtn = document.querySelectorAll('[data-modal-target]');
const closeModalBtn = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

//event listener for open modal button
openModalBtn.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

// event listener for overlay
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

//event listener for close modal button
closeModalBtn.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

//function to open modal
function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

//function to close modal
function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}