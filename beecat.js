class BeeCat {
    counter = 0;
    root = null;
    templates = {};

    constructor(node) {
        this.counter = parseInt(node.dataset.start.trim() || 0, 10);
        document.querySelectorAll('[data-template-for="beecat"]').forEach(templateNode => {
            this.templates[templateNode.dataset.templateId] = templateNode;
        });
        this.root = node;
        this.render();
    }

    render() {
        this.removeEventListeners();
        this.root.innerHTML = '';

        const isBee = this.counter > 0 && this.counter % 5 === 0;
        const isCat = this.counter > 0 && this.counter % 7 === 0;
        
        const span = document.createElement('span');
        span.textContent = this.counter;

        if (!isBee && !isCat) {
            this.root.appendChild(span);
        }

        if (isBee) {
            this.root.appendChild(this.templates['bee'].content.cloneNode(true));
        }

        if (isCat) {
            this.root.appendChild(this.templates['cat'].content.cloneNode(true));
        }

        this.addEventListeners();
    }

    addEventListeners() {
        this.root.addEventListener('click', this.handleClick);
    }

    removeEventListeners() {
        this.root.removeEventListener('click', this.handleClick);
    }

    handleClick = (event) => {
        this.counter++;
        this.render();
    }
}

document.querySelectorAll('[data-component="beecat"]').forEach(node => {
    new BeeCat(node);
});
