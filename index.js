import { readFileSync, writeFileSync } from 'node:fs'

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

	const target = JSON.parse(fileContent)

	// Initalize proxy
	storage[path] = new Proxy(target, {
		// Redefine setter
		set(target, name, value) {
			// Protect setMultiple method
			if (name == 'setMultiple') {
				console.log('setMultiple is protected method')
				return false
			}
			target[name] = value
			// Write changes
			writeFileSync(path, JSON.stringify(target, null, 2))
			return Reflect.set(...arguments)
		},
		// Handle native delete
		deleteProperty(target, property) {
			if (property in target) {
				delete target[property]
				writeFileSync(path, JSON.stringify(target, null, 2))
			}
			return true
		}
	})

	// Define non-enumerable property setMultiple
	Object.defineProperty(target, 'setMultiple', {
		enumerable: false,
		writable: true
	})

	// Set multiple parameter but write once
	target.setMultiple = (values) => {
		for (let key in values) {
			console.log(key)
			target[key] = values[key]
		}
		writeFileSync(path, JSON.stringify(target, null, 2))
	}

	return storage[path]

}