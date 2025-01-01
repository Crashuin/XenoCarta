const card = document.querySelector('.card');
const dragHandle = document.querySelector('.drag-handle');
const dragHandleBack = document.querySelector('.drag-handle-back');

let isDragging = false;
let startY = 0;
const threshold = 50; // Ajusta este valor para cambiar la sensibilidad del arrastre

function startDrag(e) {
    isDragging = true;
    startY = e.clientY || e.touches[0].clientY;
    if (e.type === 'mousedown') {
        dragHandle.style.cursor = 'grabbing';
        dragHandleBack.style.cursor = 'grabbing';
    }
    createHearts();
}

function onDrag(e) {
    if (isDragging) {
        const currentY = e.clientY || e.touches[0].clientY;
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
}

function endDrag() {
    isDragging = false;
    dragHandle.style.cursor = 'grab';
    dragHandleBack.style.cursor = 'grab';
}

dragHandle.addEventListener('mousedown', startDrag);
dragHandle.addEventListener('touchstart', startDrag);

dragHandleBack.addEventListener('mousedown', startDrag);
dragHandleBack.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

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

function downloadImage() {
    const image = document.getElementById('card-image');
    const link = document.createElement('a');
    link.href = image.src;
    link.download = 'amoremio.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}