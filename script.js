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