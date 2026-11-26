const projectModal = document.getElementById('project-modal');
const projectDetails = projectModal.querySelectorAll('.project-detail');
const HASH_PREFIX = '#project-';

function openProject(name, { push = true } = {}) {
    const target = projectModal.querySelector(`.project-detail[data-project="${name}"]`);
    if (!target) return false;

    projectDetails.forEach(detail => { detail.hidden = detail !== target; });
    projectModal.scrollTop = 0;

    if (!projectModal.open) projectModal.showModal();
    if (push) history.pushState({ projectModal: true }, '', HASH_PREFIX + name);
    return true;
}

// "Click for info" links: open the overlay
document.querySelectorAll('.project-hint[data-project]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        openProject(link.dataset.project);
    });
});

// X button
projectModal.querySelector('.modal-close').addEventListener('click', () => projectModal.close());

// Click on the dimmed area
projectModal.addEventListener('click', e => {
    if (e.target === projectModal) projectModal.close();
});

// Runs for every way of closing
projectModal.addEventListener('close', () => {
    if (history.state && history.state.projectModal) {
        history.back(); // remove the entry we pushed
    } else if (location.hash.startsWith(HASH_PREFIX)) {
        history.replaceState(null, '', location.pathname + location.search);
    }
});

// Browser back / forward
window.addEventListener('popstate', () => {
    if (location.hash.startsWith(HASH_PREFIX)) {
        openProject(location.hash.slice(HASH_PREFIX.length), { push: false });
    } else if (projectModal.open) {
        projectModal.close();
    }
});

// Page opened directly on #project
if (location.hash.startsWith(HASH_PREFIX)) {
    openProject(location.hash.slice(HASH_PREFIX.length), { push: false });
}
