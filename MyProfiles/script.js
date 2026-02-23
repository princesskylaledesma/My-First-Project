// script.js

// 1. "Explore Labs" button – scrolls smoothly to the labs grid
document.getElementById('exploration')?.addEventListener('click', () => {
  const labsSection = document.getElementById('labs-grid');
  if (labsSection) {
    labsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center' 
    });
  }
});

// 2. Optional: Add a little "active" style to the nav button when section is visible
// (nice visual feedback – works well with anchor links)
window.addEventListener('scroll', () => {
  const bioSection = document.getElementById('biodata-skills');
  const navLink = document.querySelector('a[href="#biodata-skills"]');
  
  if (!bioSection || !navLink) return;
  
  const rect = bioSection.getBoundingClientRect();
  const isVisible = rect.top <= 150 && rect.bottom >= 150;
  
  if (isVisible) {
    navLink.classList.add('active');
  } else {
    navLink.classList.remove('active');
  }
});

