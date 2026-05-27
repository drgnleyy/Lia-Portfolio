const feedbackSlider = document.getElementById('feedbackSlider');
        const feedbackDots = document.querySelectorAll('.feedback-dot');
        const feedbackPrev = document.getElementById('feedbackPrev');
        const feedbackNext = document.getElementById('feedbackNext');
        const contactForm = document.getElementById('contactForm');

        const getSlideStep = () => {
            const firstCard = feedbackSlider.querySelector('.feedback-card');
            const gap = parseFloat(getComputedStyle(feedbackSlider).gap) || 0;
            return firstCard ? firstCard.getBoundingClientRect().width + gap : feedbackSlider.clientWidth;
        };

        const setActiveDot = () => {
            const step = getSlideStep();
            const rawIndex = Math.round(feedbackSlider.scrollLeft / step);
            const index = Math.max(0, Math.min(rawIndex, feedbackDots.length - 1));

            feedbackDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        feedbackPrev.addEventListener('click', () => {
            feedbackSlider.scrollBy({ left: -getSlideStep(), behavior: 'smooth' });
        });

        feedbackNext.addEventListener('click', () => {
            feedbackSlider.scrollBy({ left: getSlideStep(), behavior: 'smooth' });
        });

        feedbackDots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const index = Number(dot.dataset.index);
                feedbackSlider.scrollTo({ left: getSlideStep() * index, behavior: 'smooth' });
            });
        });

        feedbackSlider.addEventListener('scroll', setActiveDot, { passive: true });
        window.addEventListener('resize', setActiveDot);
        setActiveDot();

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            const subject = `Portfolio inquiry from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const gmailUrl = new URL('https://mail.google.com/mail/');

            gmailUrl.searchParams.set('view', 'cm');
            gmailUrl.searchParams.set('fs', '1');
            gmailUrl.searchParams.set('to', 'gelaciolialyn1023@gmail.com');
            gmailUrl.searchParams.set('su', subject);
            gmailUrl.searchParams.set('body', body);

            window.open(gmailUrl.toString(), '_blank', 'noopener,noreferrer');
        });
