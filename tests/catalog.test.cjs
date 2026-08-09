const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const catalogPath = path.join(__dirname, '..', 'src', 'data', 'catalog.json');
const projects = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

test('le catalogue contient des identifiants uniques', () => {
  const ids = projects.map((project) => project.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('chaque projet possède les métadonnées indispensables', () => {
  for (const project of projects) {
    for (const key of ['id', 'name', 'type', 'summary', 'minecraft', 'loader', 'author', 'size']) {
      assert.equal(typeof project[key], 'string', `${project.id}: ${key} doit être une chaîne`);
      assert.ok(project[key].length > 0, `${project.id}: ${key} ne doit pas être vide`);
    }
    assert.ok(Array.isArray(project.tags) && project.tags.length > 0);
  }
});
