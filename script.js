const card = document.querySelector('.card');
const dragHandle = document.querySelector('.drag-handle');
const dragHandleBack = document.querySelector('.drag-handle-back');

let isDragging = false;
let startY = 0;
const threshold = 50; // Ajusta este valor para cambiar la sensibilidad del arrastre

dragHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    dragHandle.style.cursor = 'grabbing';
    createHearts();
});

dragHandleBack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    dragHandleBack.style.cursor = 'grabbing';
    createHearts();
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentY = e.clientY;
        if (startY - currentY > threshold) { // Arrastrar hacia arriba
            card.classList.add('flipped');
            isDragging = false;
            dragHandle.style.cursor = 'grab';
        } else if (currentY - startY > threshold) { // Arrastrar hacia abajo
            card.classList.remove('flipped');
            isDragging = false;
            dragHandleBack.style.cursor = 'grab';
        }
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    dragHandle.style.cursor = 'grab';
    dragHandleBack.style.cursor = 'grab';
});

function createHearts() {
    for (let i = 0; i < 20; i++) { // Ajusta este valor para cambiar la cantidad de corazones
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 3000); // Ajusta este valor para cambiar la duración de los corazones (en milisegundos)
    }
}