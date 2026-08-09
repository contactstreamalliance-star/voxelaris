export class CatalogController {
  constructor(projects) {
    this.projects = projects;
    this.query = '';
    this.type = 'Tous';
  }

  setQuery(value) {
    this.query = value.trim().toLocaleLowerCase('fr');
  }

  setType(value) {
    this.type = value;
  }

  getFiltered() {
    return this.projects.filter((project) => {
      const matchesType = this.type === 'Tous' || project.type === this.type;
      const haystack = [project.name, project.summary, project.author, ...project.tags]
        .join(' ')
        .toLocaleLowerCase('fr');
      return matchesType && haystack.includes(this.query);
    });
  }

  getById(id) {
    return this.projects.find((project) => project.id === id) ?? null;
  }
}

export function projectCard(project) {
  return `
    <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="Ouvrir ${project.name}">
      <div class="project-art project-art--${project.accent}">
        <span>${project.type}</span>
        <strong>${project.name.slice(0, 2).toUpperCase()}</strong>
      </div>
      <div class="project-card__body">
        <div class="project-card__heading">
          <div><p class="eyebrow">${project.author}</p><h3>${project.name}</h3></div>
          <span class="rating">★ ${project.rating}</span>
        </div>
        <p>${project.summary}</p>
        <div class="tag-row">${project.tags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join('')}</div>
        <div class="project-card__meta"><span>${project.minecraft}</span><span>${project.loader}</span><span>${project.downloads.toLocaleString('fr-FR')} téléchargements</span></div>
      </div>
    </article>`;
}
