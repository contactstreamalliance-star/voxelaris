const STORAGE_KEY = 'voxelaris.demo.profiles.v1';

const DEFAULT_PROFILE = Object.freeze({
  id: 'demo-survie',
  name: 'Survie principale',
  minecraft: '1.21.1',
  loader: 'Fabric',
  installed: [],
});

export class ProfileStore {
  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  list() {
    try {
      const parsed = JSON.parse(this.storage.getItem(STORAGE_KEY));
      return Array.isArray(parsed) && parsed.length ? parsed : [{ ...DEFAULT_PROFILE }];
    } catch {
      return [{ ...DEFAULT_PROFILE }];
    }
  }

  save(profiles) {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }

  create({ name, minecraft, loader }) {
    const profiles = this.list();
    const profile = {
      id: `profile-${Date.now()}`,
      name: name.trim().slice(0, 40),
      minecraft,
      loader,
      installed: [],
    };
    profiles.push(profile);
    this.save(profiles);
    return profile;
  }

  install(profileId, projectId) {
    const profiles = this.list();
    const profile = profiles.find((item) => item.id === profileId);
    if (!profile) throw new Error('Profil introuvable.');
    if (!profile.installed.includes(projectId)) profile.installed.push(projectId);
    this.save(profiles);
    return profile;
  }
}
