document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('no');
    const yesButton = document.getElementById('yes');
    const backButton = document.getElementById('back');
    const mainView = document.getElementById('main-view');
    const infoView = document.getElementById('info-view');
    const container = document.querySelector('.container');
    const moveSound = document.getElementById('move-sound');
    const overlay = document.getElementById('click-to-enable-sound');
    const cancelImgContainer = document.getElementById('cancel-img-container');
    const closeCancelImgButton = document.getElementById('close-cancel-img');

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    const moveNoButton = () => {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        const newTop = Math.random() * (containerRect.height - buttonRect.height);
        const newLeft = Math.random() * (containerRect.width - buttonRect.width);

        noButton.style.position = 'absolute';
        noButton.style.top = `${newTop}px`;
        noButton.style.left = `${newLeft}px`;

        createSpamImage();
    };

    noButton.addEventListener('mouseover', moveNoButton);
    noButton.addEventListener('touchstart', moveNoButton);

    yesButton.addEventListener('click', () => {
        removeSpamImages();
        mainView.classList.add('hidden');
        infoView.classList.remove('hidden');
    });

    backButton.addEventListener('click', () => {
        infoView.classList.add('hidden');
        mainView.classList.remove('hidden');
        cancelImgContainer.classList.remove('hidden');
    });

    closeCancelImgButton.addEventListener('click', () => {
        cancelImgContainer.classList.add('hidden');
    });

    function createSpamImage() {
        const img = document.createElement('img');
        img.src = 'assets/no.jpg'; // Cambia la ruta a tu imagen de spam
        img.alt = 'Imagen sorpresa';
        img.classList.add('spam-img');

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let randomTop, randomLeft;
        let overlap;

        do {
            randomTop = Math.random() * (windowHeight - 100); // Ajusta el tamaño de la imagen
            randomLeft = Math.random() * (windowWidth - 100);

            overlap = checkOverlap(randomTop, randomLeft, img.width, img.height);
        } while (overlap);

        img.style.top = `${randomTop}px`;
        img.style.left = `${randomLeft}px`;

        document.body.appendChild(img);

        // Reinicia y reproduce el sonido
        moveSound.currentTime = 0;
        moveSound.play();
    }

    function removeSpamImages() {
        const spamImages = document.querySelectorAll('.spam-img');
        spamImages.forEach(img => img.remove());
    }

    function checkOverlap(top, left, width, height) {
        const yesRect = yesButton.getBoundingClientRect();
        const noRect = noButton.getBoundingClientRect();

        const imgRect = {
            top: top,
            left: left,
            right: left + width,
            bottom: top + height
        };

        return (
            (imgRect.left < yesRect.right && imgRect.right > yesRect.left && imgRect.top < yesRect.bottom && imgRect.bottom > yesRect.top) ||
            (imgRect.left < noRect.right && imgRect.right > noRect.left && imgRect.top < noRect.bottom && imgRect.bottom > noRect.top)
        );
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 500);
});