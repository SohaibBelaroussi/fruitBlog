document.addEventListener('DOMContentLoaded', function() {
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const fruitCards = document.querySelectorAll('.fruit-card');
    fruitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const fruitSearchInput = document.getElementById('fruit-search');
    if (fruitSearchInput) {
        const fruitCategories = document.querySelectorAll('.fruit-category');
        const resultsCount = document.getElementById('search-results-count');
        const noResultsMessage = document.getElementById('no-results-message');

        const filterFruits = function() {
            const query = fruitSearchInput.value.trim().toLowerCase();
            let totalVisible = 0;

            fruitCategories.forEach(category => {
                const cards = category.querySelectorAll('.fruit-card');
                let visibleInCategory = 0;

                cards.forEach(card => {
                    const name = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    const matches = query === '' || name.includes(query) || description.includes(query);

                    card.hidden = !matches;
                    if (matches) {
                        visibleInCategory++;
                    }
                });

                category.hidden = visibleInCategory === 0;
                totalVisible += visibleInCategory;
            });

            if (noResultsMessage) {
                noResultsMessage.hidden = !(query !== '' && totalVisible === 0);
            }

            if (resultsCount) {
                if (query === '') {
                    resultsCount.textContent = '';
                } else {
                    resultsCount.textContent = `${totalVisible} fruit${totalVisible === 1 ? '' : 's'} found`;
                }
            }
        };

        fruitSearchInput.addEventListener('input', filterFruits);
    }

    const spotlight = document.getElementById('fruit-of-the-month');
    if (spotlight) {
        const emojiByFruit = {
            Orange: '🍊',
            Lemon: '🍋',
            Lime: '🍈',
            Mango: '🥭',
            Pineapple: '🍍',
            Strawberry: '🍓',
            Blueberry: '🫐',
            Grape: '🍇',
            Cherry: '🍒',
            Peach: '🍑'
        };

        const emojiEl = document.getElementById('fotm-emoji');
        const nameEl = document.getElementById('fotm-name');
        const seasonEl = document.getElementById('fotm-season');
        const descriptionEl = document.getElementById('fotm-description');

        fetch('data/fruits.json')
            .then(response => response.json())
            .then(fruits => {
                if (!Array.isArray(fruits) || fruits.length === 0) {
                    throw new Error('No fruit data available');
                }

                // Deterministic pick: current calendar month (0-11) wraps
                // around the fruit list, so the same fruit always shows for
                // a given month.
                const monthIndex = new Date().getMonth();
                const fruit = fruits[monthIndex % fruits.length];

                if (emojiEl) emojiEl.textContent = emojiByFruit[fruit.name] || '🍉';
                if (nameEl) nameEl.textContent = fruit.name;
                if (seasonEl) seasonEl.textContent = `Peak season: ${fruit.season}`;
                if (descriptionEl) descriptionEl.textContent = fruit.description;
            })
            .catch(() => {
                if (nameEl) nameEl.textContent = "This Month's Fruit";
                if (seasonEl) seasonEl.textContent = '';
                if (descriptionEl) descriptionEl.textContent = "We couldn't load this month's featured fruit. Check back soon!";
            });
    }

    const missionBox = document.querySelector('.mission-box');
    if (missionBox) {
        missionBox.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }

    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.fontSize = '1.1em';
            this.style.transition = 'font-size 0.2s ease';
        });

        highlight.addEventListener('mouseleave', function() {
            this.style.fontSize = '';
        });
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
});