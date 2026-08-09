import { CatalogController, projectCard } from './catalog.js';
import { ProfileStore } from './profiles.js';
import { DownloadSimulator } from './downloads.js';

const state = {
  view: 'discover',
  projects: [],
  selectedProject: null,
  downloads: [],
  account: JSON.parse(window.localStorage.getItem('voxelaris.demo.account') || 'null'),
};

const view = document.querySelector('#view');
const title = document.querySelector('#view-title');
const modalRoot = document.querySelector('#modal-root');
const toastRoot = document.querySelector('#toast-root');
const profileStore = new ProfileStore();
let catalog;

const downloads = new DownloadSimulator((tasks) => {
  state.downloads = tasks;
  document.querySelector('#download-count').textContent = tasks.length;
  if (state.view === 'downloads') renderDownloads();
});

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

function showToast(message, tone = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast--${tone}`;
  toast.textContent = message;
  toastRoot.append(toast);
  setTimeout(() => toast.remove(), 3200);
}

function closeModal() {
  modalRoot.replaceChildren();
}

function updateAccountButton() {
  const button = document.querySelector('#connect-button');
  button.textContent = state.account ? state.account.name : 'Connexion Microsoft';
}

function openConnectionDialog() {
  modalRoot.innerHTML = `
    <div class="modal-backdrop" data-close-modal>
      <form class="modal modal--small" id="connection-form">
        <button type="button" class="modal-close" data-close-modal aria-label="Fermer">×</button>
        <p class="eyebrow">AUTHENTIFICATION DU PROTOTYPE</p>
        <h2>${state.account ? 'Compte de démonstration' : 'Se connecter'}</h2>
        ${state.account ? `
          <div class="demo-account"><span class="avatar">${escapeHtml(state.account.name.slice(0, 1).toUpperCase())}</span><div><strong>${escapeHtml(state.account.name)}</strong><small>Session locale de démonstration</small></div></div>
          <p>Cette session est enregistrée uniquement sur cet ordinateur et ne communique pas avec Microsoft.</p>
          <button class="secondary-button secondary-button--wide" type="button" id="disconnect-account">Se déconnecter</button>
        ` : `
          <div class="notice"><strong>Pourquoi ce n'est pas encore une vraie connexion Microsoft ?</strong><p>Une authentification réelle nécessite d'enregistrer officiellement Voxelaris auprès de Microsoft, de recevoir un identifiant d'application et d'implémenter le flux OAuth sécurisé.</p></div>
          <label>Pseudonyme de démonstration<input name="name" required minlength="2" maxlength="24" placeholder="Ex. Alex"></label>
          <button class="primary-button primary-button--wide" type="submit">Continuer en mode démonstration</button>
          <small>Aucun mot de passe n'est demandé ou conservé.</small>
        `}
      </form>
    </div>`;
  document.querySelector('#connection-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get('name')).trim();
    state.account = { name };
    window.localStorage.setItem('voxelaris.demo.account', JSON.stringify(state.account));
    updateAccountButton();
    closeModal();
    showToast(`Bienvenue ${name}. Connexion de démonstration active.`);
  });
  document.querySelector('#disconnect-account')?.addEventListener('click', () => {
    state.account = null;
    window.localStorage.removeItem('voxelaris.demo.account');
    updateAccountButton();
    closeModal();
    showToast('Session de démonstration fermée.', 'info');
  });
}

function openProject(project) {
  state.selectedProject = project;
  const profiles = profileStore.list();
  modalRoot.innerHTML = `
    <div class="modal-backdrop" data-close-modal>
      <article class="modal" role="dialog" aria-modal="true" aria-labelledby="project-title">
        <button class="modal-close" data-close-modal aria-label="Fermer">×</button>
        <div class="detail-hero project-art--${project.accent}">
          <div><span class="badge">${project.type}</span><p>${project.author}</p><h2 id="project-title">${project.name}</h2><p>${project.summary}</p></div>
          <strong>${project.name.slice(0, 2).toUpperCase()}</strong>
        </div>
        <div class="detail-content">
          <div><h3>À propos</h3><p>${project.description}</p><div class="tag-row">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div>
          <aside class="install-panel">
            <div class="compatibility"><span>Version</span><strong>${project.minecraft}</strong></div>
            <div class="compatibility"><span>Chargeur</span><strong>${project.loader}</strong></div>
            <div class="compatibility"><span>Taille</span><strong>${project.size}</strong></div>
            <label for="profile-select">Installer dans</label>
            <select id="profile-select">${profiles.map((profile) => `<option value="${profile.id}">${escapeHtml(profile.name)}</option>`).join('')}</select>
            <button class="primary-button primary-button--wide" id="install-project">Télécharger la démo</button>
            <small>Le prototype n'écrit pas dans votre dossier Minecraft.</small>
          </aside>
        </div>
      </article>
    </div>`;

  document.querySelector('#install-project').addEventListener('click', async () => {
    closeModal();
    showToast(`Téléchargement de ${project.name} démarré.`);
    await downloads.start(project);
    showToast(`${project.name} a été vérifié et peut être installé.`);
  });
}

function renderDiscover() {
  title.textContent = 'Découvrez votre prochain monde';
  view.innerHTML = `
    <section class="hero">
      <div><span class="badge badge--light">SÉLECTION DE LA SEMAINE</span><h2>Explorez. Installez.<br><em>Jouez autrement.</em></h2><p>Un aperçu du futur catalogue indépendant Voxelaris, conçu pour rendre le contenu Minecraft Java plus simple à découvrir et à gérer.</p><button class="hero-button" id="explore-button">Explorer le catalogue <span>→</span></button></div>
      <div class="voxel-scene" aria-hidden="true"><div class="cube cube-a"></div><div class="cube cube-b"></div><div class="cube cube-c"></div><div class="orb"></div></div>
    </section>
    <section class="catalog-section" id="catalog">
      <div class="section-heading"><div><p class="eyebrow">CATALOGUE DE DÉMONSTRATION</p><h2>Contenus populaires</h2></div><div class="search-wrap"><input id="catalog-search" type="search" placeholder="Rechercher un projet…" aria-label="Rechercher dans le catalogue"></div></div>
      <div class="filter-row" role="group" aria-label="Filtrer par type">${['Tous', 'Mod', 'Modpack', 'Resource pack', 'Shader'].map((type) => `<button class="filter-button ${type === catalog.type ? 'is-active' : ''}" data-type="${type}">${type}</button>`).join('')}</div>
      <div class="project-grid" id="project-grid"></div>
    </section>`;

  const grid = document.querySelector('#project-grid');
  const updateGrid = () => {
    const results = catalog.getFiltered();
    grid.innerHTML = results.length ? results.map(projectCard).join('') : '<div class="empty-state"><strong>Aucun résultat</strong><p>Essayez une autre recherche ou un autre filtre.</p></div>';
    grid.querySelectorAll('.project-card').forEach((card) => {
      const open = () => openProject(catalog.getById(card.dataset.projectId));
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') open(); });
    });
  };
  updateGrid();
  document.querySelector('#catalog-search').addEventListener('input', (event) => { catalog.setQuery(event.target.value); updateGrid(); });
  document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => { catalog.setType(button.dataset.type); renderDiscover(); }));
  document.querySelector('#explore-button').addEventListener('click', () => document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' }));
}

function renderProfiles() {
  title.textContent = 'Vos profils Minecraft';
  const profiles = profileStore.list();
  view.innerHTML = `
    <div class="page-intro"><div><p>Créez des environnements séparés pour vos aventures, versions et contenus.</p></div><button class="primary-button" id="new-profile">＋ Nouveau profil</button></div>
    <div class="profile-grid">${profiles.map((profile) => `
      <article class="profile-card"><div class="profile-icon">◇</div><div><p class="eyebrow">${profile.minecraft} · ${profile.loader}</p><h3>${escapeHtml(profile.name)}</h3><p>${profile.installed.length} contenu${profile.installed.length > 1 ? 's' : ''} installé${profile.installed.length > 1 ? 's' : ''}</p></div><button class="secondary-button" data-profile-id="${profile.id}">Ouvrir</button></article>`).join('')}</div>`;
  document.querySelector('#new-profile').addEventListener('click', openProfileForm);
  document.querySelectorAll('[data-profile-id]').forEach((button) => button.addEventListener('click', () => openProfileDetails(button.dataset.profileId)));
}

function openProfileDetails(profileId) {
  const profile = profileStore.list().find((item) => item.id === profileId);
  if (!profile) return showToast('Profil introuvable.', 'info');
  const installed = profile.installed.map((id) => catalog.getById(id)).filter(Boolean);
  modalRoot.innerHTML = `<div class="modal-backdrop" data-close-modal><article class="modal modal--small"><button class="modal-close" data-close-modal aria-label="Fermer">×</button><p class="eyebrow">${profile.minecraft} · ${profile.loader}</p><h2>${escapeHtml(profile.name)}</h2><p>Profil local de démonstration. L'ouverture de Minecraft sera ajoutée avec la gestion réelle des installations.</p><h3>Contenus installés</h3>${installed.length ? `<div class="mini-list">${installed.map((project) => `<div><strong>${project.name}</strong><span>${project.type}</span></div>`).join('')}</div>` : '<div class="notice"><p>Aucun contenu installé dans ce profil.</p></div>'}<button class="primary-button primary-button--wide" data-close-modal>Fermer</button></article></div>`;
}

function openProfileForm() {
  modalRoot.innerHTML = `
    <div class="modal-backdrop" data-close-modal><form class="modal modal--small" id="profile-form"><button type="button" class="modal-close" data-close-modal aria-label="Fermer">×</button><p class="eyebrow">NOUVEL ENVIRONNEMENT</p><h2>Créer un profil</h2><label>Nom du profil<input name="name" required minlength="2" maxlength="40" placeholder="Ex. Survie entre amis"></label><div class="form-row"><label>Version<select name="minecraft"><option>1.21.1</option><option>1.20.6</option><option>1.20.1</option></select></label><label>Chargeur<select name="loader"><option>Fabric</option><option>NeoForge</option><option>Forge</option><option>Vanilla</option></select></label></div><button class="primary-button primary-button--wide" type="submit">Créer le profil</button></form></div>`;
  document.querySelector('#profile-form').addEventListener('submit', (event) => {
    event.preventDefault();
    profileStore.create(Object.fromEntries(new FormData(event.currentTarget)));
    closeModal();
    renderProfiles();
    showToast('Le profil a été créé localement.');
  });
}

function renderDownloads() {
  title.textContent = 'Téléchargements';
  view.innerHTML = state.downloads.length ? `<div class="download-list">${state.downloads.map((task) => `<article class="download-item"><div class="download-symbol">↓</div><div class="download-main"><div><strong>${task.name}</strong><span>${task.state}</span></div><div class="progress"><i style="width:${task.progress}%"></i></div>${task.hash ? `<code title="${task.hash}">SHA-256 · ${task.hash.slice(0, 24)}…</code>` : ''}</div>${task.state === 'Prêt à installer' ? `<button class="secondary-button" data-install-id="${task.id}">Installer</button>` : `<b>${task.progress}%</b>`}</article>`).join('')}</div>` : '<div class="empty-state empty-state--large"><span>↓</span><strong>Aucun téléchargement</strong><p>Les téléchargements de démonstration et leur vérification apparaîtront ici.</p><button class="primary-button" data-view="discover">Parcourir le catalogue</button></div>';
  bindViewButtons();
  document.querySelectorAll('[data-install-id]').forEach((button) => button.addEventListener('click', () => openInstallDialog(button.dataset.installId)));
}

function openInstallDialog(projectId) {
  const project = catalog.getById(projectId);
  const profiles = profileStore.list();
  modalRoot.innerHTML = `<div class="modal-backdrop" data-close-modal><form class="modal modal--small" id="install-form"><button type="button" class="modal-close" data-close-modal aria-label="Fermer">×</button><p class="eyebrow">PAQUET VÉRIFIÉ</p><h2>Installer ${project.name}</h2><p>Cette opération associe le contenu au profil choisi. Aucun fichier Minecraft réel ne sera modifié.</p><label>Profil Minecraft<select name="profileId">${profiles.map((profile) => `<option value="${profile.id}">${escapeHtml(profile.name)} · ${profile.minecraft}</option>`).join('')}</select></label><button class="primary-button primary-button--wide" type="submit">Confirmer l'installation simulée</button></form></div>`;
  document.querySelector('#install-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const profileId = new FormData(event.currentTarget).get('profileId');
    profileStore.install(profileId, projectId);
    downloads.remove(projectId);
    closeModal();
    showToast(`${project.name} a été ajouté au profil.`);
  });
}

function renderLibrary() {
  title.textContent = 'Ma bibliothèque';
  const installedIds = new Set(profileStore.list().flatMap((profile) => profile.installed));
  const installed = state.projects.filter((project) => installedIds.has(project.id));
  view.innerHTML = installed.length ? `<div class="project-grid">${installed.map(projectCard).join('')}</div>` : '<div class="empty-state empty-state--large"><span>▦</span><strong>Votre bibliothèque est vide</strong><p>Dans ce prototype, un contenu vérifié peut ensuite être associé à un profil.</p><button class="primary-button" data-view="discover">Découvrir les projets</button></div>';
  bindViewButtons();
}

async function renderAbout() {
  title.textContent = 'À propos de Voxelaris';
  const info = await window.voxelaris.getAppInfo();
  view.innerHTML = `<div class="about-card"><div class="brand-mark brand-mark--large">V</div><p class="eyebrow">VERSION ${info.version}</p><h2>Une plateforme ouverte, pensée pour Minecraft Java.</h2><p>Ce prototype fonctionne entièrement en local. Il démontre l'interface, le catalogue, les profils et une chaîne de téléchargement avec vérification d'empreinte simulée.</p><div class="about-grid"><div><span>Licence</span><strong>AGPL-3.0-only</strong></div><div><span>Plateforme</span><strong>${info.platform}</strong></div><div><span>État</span><strong>Prototype public</strong></div></div><p class="legal-note">Voxelaris est indépendant et n'est pas affilié à Mojang Studios ou Microsoft.</p></div>`;
}

function bindViewButtons() {
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => navigate(button.dataset.view)));
}

function navigate(nextView) {
  state.view = nextView;
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('is-active', item.dataset.view === nextView));
  ({ discover: renderDiscover, profiles: renderProfiles, downloads: renderDownloads, library: renderLibrary, about: renderAbout }[nextView] ?? renderDiscover)();
}

async function initialize() {
  state.projects = await window.voxelaris.getDemoCatalog();
  catalog = new CatalogController(state.projects);
  bindViewButtons();
  document.querySelector('#connect-button').addEventListener('click', openConnectionDialog);
  updateAccountButton();
  document.querySelector('#theme-button').addEventListener('click', () => { document.body.classList.toggle('light'); showToast('Thème modifié localement.', 'info'); });
  document.addEventListener('click', (event) => { if (event.target.matches('[data-close-modal]')) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  renderDiscover();
}

initialize().catch((error) => {
  view.innerHTML = `<div class="empty-state empty-state--large"><strong>Le prototype n'a pas pu démarrer</strong><p>${escapeHtml(error.message)}</p></div>`;
});
