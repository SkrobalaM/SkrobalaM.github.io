// Populate the page from a single data object so it’s easy to tweak.
const DATA = {
  title: 'SkrobalaM', // from your sketch (edit as needed)
  stack: ['C', 'CUDA', 'VHDL', 'Python', 'React Native'],
  projects: [
    {
      label: 'Ascii Shader',
      img: 'images/shader.png',
      desc: 'ASCII shader running on the GPU using CUDA and C. It maps downscaled pixel luminance from a video to ASCII characters.',
      href: ''
    },
    {
      label: 'DES on Logisim',
      img: 'images/DES.png',
      desc: 'Implementation of the Data Encryption Standard (DES) using digital logic blocks in Logisim, simulating real wire connections. This project showcases key scheduling and the standard DES encryption rounds—originally developed at IBM and standardized by NIST.',
      href: ''
    },
    {
      label: 'SionnaRT guide',
      img: 'images/SionnaRT.png',
      desc: 'Guide to getting started with the SionnaRT library for wireless simulations, performing ray tracing on a custom 3D map built from OpenStreetMap data.',
      href: ''
    },
    {
      label: 'Berghain challenge by ListenLab',
      desc: 'Challenge brief:\nYou are the bouncer at a nightclub. Fill the venue with N=1000 people while satisfying constraints like "at least 40% Berlin locals" and "at least 80% wearing all black." People arrive one by one, and you must immediately decide whether to let them in or turn them away. The challenge is to meet all minimum requirements with as few rejections as possible.\n\nThis project uses stochastic decisions to find an optimal solution based on constraints, initial probabilities, and correlations.\n\nFinal ranking achieved: 68/1330.',
      href: ''
    },
  ],
  working: [
    { label: 'Minimalist PDF scanner mobile app in React Native' },
  ],
};

// Render helpers
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

let PROJECT_UID = 0;

function renderList(list, targetId) {
  const ul = document.getElementById(targetId);
  ul.innerHTML = '';
  list.forEach(item => {
    const li = el('li');

    // If item has any extended content, build a collapsible block
    if (item.img || item.desc) {
      const wrapper = el('div', { class: 'project' });

      // Toggle row (title)
      const detailsId = `project-details-${PROJECT_UID++}`;

      const toggle = el('button', {
        class: 'project-toggle',
        'aria-expanded': 'false',
        'aria-controls': detailsId,
        type: 'button'
      });
      const titleNode = item.href
        ? el('a', { href: item.href, target: '_blank', rel: 'noopener', class: 'project-title' }, item.label)
        : el('span', { class: 'project-title' }, item.label);
      toggle.appendChild(titleNode);
      if (item.meta) toggle.appendChild(el('span', { class: 'meta' }, `  — ${item.meta}`));

      // Subtle inline hint to educate the interaction (removed on first open)
      const hint = el('span', { class: 'toggle-hint' }, 'Info');
      toggle.appendChild(hint);

      // Details area (hidden by default)
      const details = el('div', { class: 'project-details', id: detailsId });
      // Stack image and description under the title (indented by the tree li)
      if (item.img) {
        const img = el('img', {
          class: 'project-thumb',
          src: item.img,
          alt: item.label
        });
        img.addEventListener('error', () => { img.style.display = 'none'; });
        details.appendChild(img);
      }
      if (item.desc) details.appendChild(el('p', { class: 'project-desc' }, item.desc));

      toggle.addEventListener('click', () => {
        const isOpen = wrapper.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (hint && hint.parentNode) hint.remove();
      });

      wrapper.appendChild(toggle);
      wrapper.appendChild(details);
      li.appendChild(wrapper);
    } else {
      // Simple inline item without collapsible details
      if (item.href) {
        li.appendChild(el('a', { href: item.href, target: '_blank', rel: 'noopener' }, item.label));
        if (item.meta) li.appendChild(el('span', { class: 'meta' }, `  — ${item.meta}`));
      } else {
        li.appendChild(document.createTextNode(item.label));
      }
    }

    ul.appendChild(li);
  });
}

// Apply content
document.getElementById('siteTitle').textContent = DATA.title;
document.getElementById('year').textContent = new Date().getFullYear();

const stack = document.getElementById('techStack');
DATA.stack.forEach(s => stack.appendChild(el('li', {}, s)));

renderList(DATA.projects, 'projects');
renderList(DATA.working, 'wip');
