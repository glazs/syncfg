import { readFileSync, writeFileSync } from 'node:fs';

// Store proxy objects
const storage = {}

export default function syncfg (path) {

	// Return existing proxy if it's initialized
	if (storage[path])
		return storage[path]

	// Open or create config file
	let fileContent
	try { 
		fileContent = readFileSync(path, 'utf-8') 
	} catch (error) {
		writeFileSync(path, '{}')
		fileContent = '{}'
	}

	// Initalize proxy
	storage[path] = new Proxy(JSON.parse(fileContent), {
		// Redefine getter
		get() {
			return Reflect.get(...arguments)
		},
		// Redefine setter
		set(target, name, value) {
			target[name] = value
			// Write changes
			writeFileSync(path, JSON.stringify(target, null, 2))
			return Reflect.set(...arguments)
		}
	})

	return storage[path]

}