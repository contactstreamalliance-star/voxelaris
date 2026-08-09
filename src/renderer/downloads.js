export class DownloadSimulator {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.active = new Map();
  }

  async start(project) {
    if (this.active.has(project.id)) return;
    const task = { id: project.id, name: project.name, progress: 0, state: 'Téléchargement' };
    this.active.set(project.id, task);
    this.onUpdate([...this.active.values()]);

    while (task.progress < 100) {
      await new Promise((resolve) => setTimeout(resolve, 90));
      task.progress = Math.min(100, task.progress + 5 + Math.floor(Math.random() * 12));
      this.onUpdate([...this.active.values()]);
    }

    task.state = 'Vérification SHA-256';
    this.onUpdate([...this.active.values()]);
    const verification = await window.voxelaris.verifyDemoPackage(project.id);
    task.state = verification.verified ? 'Prêt à installer' : 'Échec de vérification';
    task.hash = verification.hash;
    this.onUpdate([...this.active.values()]);
    return task;
  }

  remove(projectId) {
    this.active.delete(projectId);
    this.onUpdate([...this.active.values()]);
  }
}
