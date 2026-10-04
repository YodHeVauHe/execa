#!/usr/bin/env node
import {execFileSync} from 'node:child_process';
import process from 'node:process';
import {execa} from '../../index.js';

// Lower this process's soft limit so the next spawn fails with EMFILE/ENFILE
// and Node returns a child whose stdio is unset.
execFileSync('prlimit', [`--pid=${process.pid}`, '--nofile=3:']);

try {
	await execa('node', ['--version']);
	console.log(JSON.stringify({name: 'resolved'}));
} catch (error) {
	await new Promise(resolve => {
		setImmediate(resolve);
	});
	console.log(JSON.stringify({name: error.name, code: error.code}));
}
