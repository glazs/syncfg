import { readFileSync, writeFileSync } from 'node:fs'

// Store proxy objects
const storage: Record<string, unknown> = {}

type Syncfg = {
	[key: string]: any;
	setMultiple?: (values: Record<string, string>) => void;
};

function syncfg (path: string): Syncfg {
	// Return existing proxy if it's initialized
	if (storage[path]){
		return storage[path]
	}

	// Open or create config file
	let fileContent: string
	try { 
		fileContent = readFileSync(path, "utf-8") 
	} catch (error) {
		writeFileSync(path, "{}")
		fileContent = "{}"
	}

	const target = JSON.parse(fileContent)
	const protectedErrorText = "The parameter \"setMultiple\" cannot be set because it is protected and reserved as a method"

	// Initalize proxy
	storage[path] = new Proxy(target, {
		// Redefine setter
		set(target, name, value) {
			if (name == "setMultiple") throw new Error(protectedErrorText)
			target[name] = value
			writeFileSync(path, JSON.stringify(target, null, 2))
			return true
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
	Object.defineProperty(target, "setMultiple", {
		enumerable: false,
		writable: true
	})

	// Set multiple parameter but write once
	target.setMultiple = (values: Record<string, string>) => {
		if ("setMultiple" in values) throw new Error(protectedErrorText)
		for (let key in values) {
			target[key] = values[key]
		}
		writeFileSync(path, JSON.stringify(target, null, 2))
	}

	return storage[path]
}

export default syncfg;