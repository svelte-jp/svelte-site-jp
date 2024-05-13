// Store the references to globals in case someone tries to monkey patch these, causing the below
// to de-opt (this occurs often when using popular extensions).
export var is_array = Array.isArray;
export var array_from = Array.from;
export var object_keys = Object.keys;
export var object_assign = Object.assign;
export var is_frozen = Object.isFrozen;
export var object_freeze = Object.freeze;
export var define_property = Object.defineProperty;
export var get_descriptor = Object.getOwnPropertyDescriptor;
export var get_descriptors = Object.getOwnPropertyDescriptors;
export var object_prototype = Object.prototype;
export var array_prototype = Array.prototype;
export var get_prototype_of = Object.getPrototypeOf;

/** @type {Map<any, any>} */
var map_prototype = Map.prototype;
var map_set_method = map_prototype.set;
var map_get_method = map_prototype.get;

/**
 * @template K
 * @template V
 * @param {Map<K, V>} map
 * @param {K} key
 * @param {V} value
 */
export function map_set(map, key, value) {
	map_set_method.call(map, key, value);
}

/**
 * @template K
 * @template V
 * @param {Map<K, V>} map
 * @param {K} key
 * @return {V}
 */
export function map_get(map, key) {
	return map_get_method.call(map, key);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
export function is_function(thing) {
	return typeof thing === 'function';
}
