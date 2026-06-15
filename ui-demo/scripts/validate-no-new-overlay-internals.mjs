import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const directory = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(directory, '..')
const manifest = JSON.parse(fs.readFileSync(
  path.join(root, 'packages/design-system/specs/edit-overlay-templates.json'),
  'utf8'
))
const scanDirectories = ['components', 'scenarios', 'demos']
const extensions = new Set(['.html', '.jsx', '.js', '.css'])
const legacyAllowlist = new Set([
  'components/modal-components.html',
])
const errors = []

function collectFiles(folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(folder, entry.name)
    if (entry.isDirectory()) return collectFiles(target)
    return extensions.has(path.extname(entry.name)) ? [target] : []
  })
}

for (const folder of scanDirectories) {
  const folderPath = path.join(root, folder)
  for (const file of collectFiles(folderPath)) {
    const relative = path.relative(root, file)
    if (legacyAllowlist.has(relative)) continue
    const source = fs.readFileSync(file, 'utf8')
    const matches = manifest.generation.forbiddenPageSelectors
      .filter((selector) => source.includes(selector))
    if (matches.length) {
      errors.push(`${relative}: ${matches.join(', ')}`)
    }
  }
}

if (errors.length) {
  console.error('New pages must use scene-level overlay components instead of internal selectors:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log('No new page copies edit overlay internals.')
}
