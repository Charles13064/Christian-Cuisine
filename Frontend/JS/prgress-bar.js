window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const scrolledFromTop = window.scrollY;
    
    const totalScrollable = fullHeight - windowHeight;
    
    // Avoid division by zero if the page content is shorter than the viewport
    if (totalScrollable > 0) {
        const scrollPercentage = (scrolledFromTop / totalScrollable) * 100;
        document.getElementById('scrollBar').style.width = scrollPercentage + '%';
    }
});
