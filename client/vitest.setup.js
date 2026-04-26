import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

const localStorageMock = {
	getItem: vi.fn((key) => {
		return Object.prototype.hasOwnProperty.call(localStorageMock._store, key)
			? localStorageMock._store[key]
			: null;
	}),
	setItem: vi.fn((key, value) => {
		localStorageMock._store[key] = String(value);
	}),
	removeItem: vi.fn((key) => {
		delete localStorageMock._store[key];
	}),
	clear: vi.fn(() => {
		localStorageMock._store = {};
	}),
	_store: {},
};

Object.defineProperty(globalThis, 'localStorage', {
	value: localStorageMock,
	configurable: true,
	writable: true,
});

beforeEach(() => {
	localStorageMock.clear();
	vi.clearAllMocks();
});
