document.addEventListener('DOMContentLoaded', () => {
    const streakEl = document.getElementById('streak');
    const startDateEl = document.getElementById('start-date');
    const incrementBtn = document.getElementById('increment');
    const resetBtn = document.getElementById('reset');
    const bgMusic = document.getElementById('bg-music');

    let streak = parseInt(localStorage.getItem('streak')) || 0;
    let startDate = localStorage.getItem('startDate') || null;
    let lastMarked = localStorage.getItem('lastMarked') || null;

    // Display initial values
    streakEl.textContent = streak;
    if (startDate) {
        startDateEl.textContent = `Started on: ${startDate}`;
    }

    // Show current date at all times
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    document.body.insertAdjacentHTML('beforeend', `<div style="position:fixed;top:10px;right:10px;font-size:1.2rem;color:white;">${formattedDate}</div>`);

    // Try to autoplay music after a click (browsers block without interaction)
    document.body.addEventListener('click', () => {
        bgMusic.play().catch(() => {});
    }, { once: true });

    // Mark streak for today
    incrementBtn.addEventListener('click', () => {
        const today = new Date().toDateString();
        if (lastMarked === today) {
            alert("You've already marked today!");
            return;
        }

        if (!startDate) {
            startDate = formattedDate;
            localStorage.setItem('startDate', startDate);
            startDateEl.textContent = `Started on: ${startDate}`;
        }

        streak++;
        streakEl.textContent = streak;
        lastMarked = today;
        localStorage.setItem('streak', streak);
        localStorage.setItem('lastMarked', lastMarked);
    });

    // Allow marking a previous day manually
    incrementBtn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        let daysAgo = parseInt(prompt("Mark a past streak: How many days ago? (1 for yesterday)"));
        if (isNaN(daysAgo) || daysAgo < 1) return;

        if (!startDate) {
            startDate = formattedDate;
            localStorage.setItem('startDate', startDate);
            startDateEl.textContent = `Started on: ${startDate}`;
        }

        streak++;
        streakEl.textContent = streak;
        localStorage.setItem('streak', streak);
        alert(`Marked ${daysAgo} day(s) ago!`);
    });

    // Reset streak
    resetBtn.addEventListener('click', () => {
        if (confirm("Reset streak?")) {
            streak = 0;
            startDate = null;
            lastMarked = null;
            streakEl.textContent = 0;
            startDateEl.textContent = '';
            localStorage.clear();
        }
    });

});
