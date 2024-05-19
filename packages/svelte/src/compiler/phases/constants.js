import { AttributeAliases, DOMBooleanAttributes } from '../../constants.js';

export const DOMProperties = [
	...Object.values(AttributeAliases),
	'value',
	'inert',
	...DOMBooleanAttributes
];

export const VoidElements = [
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'menuitem',
	'meta',
	'param',
	'source',
	'track',
	'wbr'
];

export const PassiveEvents = ['wheel', 'touchstart', 'touchmove', 'touchend', 'touchcancel'];

export const Runes = /** @type {const} */ ([
	'$state',
	'$state.frozen',
	'$state.snapshot',
	'$state.is',
	'$props',
	'$bindable',
	'$derived',
	'$derived.by',
	'$effect',
	'$effect.pre',
	'$effect.active',
	'$effect.root',
	'$inspect',
	'$inspect().with',
	'$host'
]);

/**
 * Whitespace inside one of these elements will not result in
 * a whitespace node being created in any circumstances. (This
 * list is almost certainly very incomplete)
 * TODO this is currently unused
 */
export const ElementsWithoutText = ['audio', 'datalist', 'dl', 'optgroup', 'select', 'video'];

export const ReservedKeywords = ['$$props', '$$restProps', '$$slots'];

/** Attributes where whitespace can be compacted */
export const WhitespaceInsensitiveAttributes = ['class', 'style'];

export const ContentEditableBindings = ['textContent', 'innerHTML', 'innerText'];

export const LoadErrorElements = [
	'body',
	'embed',
	'iframe',
	'img',
	'link',
	'object',
	'script',
	'style',
	'track'
];

export const SVGElements = [
	'altGlyph',
	'altGlyphDef',
	'altGlyphItem',
	'animate',
	'animateColor',
	'animateMotion',
	'animateTransform',
	'circle',
	'clipPath',
	'color-profile',
	'cursor',
	'defs',
	'desc',
	'discard',
	'ellipse',
	'feBlend',
	'feColorMatrix',
	'feComponentTransfer',
	'feComposite',
	'feConvolveMatrix',
	'feDiffuseLighting',
	'feDisplacementMap',
	'feDistantLight',
	'feDropShadow',
	'feFlood',
	'feFuncA',
	'feFuncB',
	'feFuncG',
	'feFuncR',
	'feGaussianBlur',
	'feImage',
	'feMerge',
	'feMergeNode',
	'feMorphology',
	'feOffset',
	'fePointLight',
	'feSpecularLighting',
	'feSpotLight',
	'feTile',
	'feTurbulence',
	'filter',
	'font',
	'font-face',
	'font-face-format',
	'font-face-name',
	'font-face-src',
	'font-face-uri',
	'foreignObject',
	'g',
	'glyph',
	'glyphRef',
	'hatch',
	'hatchpath',
	'hkern',
	'image',
	'line',
	'linearGradient',
	'marker',
	'mask',
	'mesh',
	'meshgradient',
	'meshpatch',
	'meshrow',
	'metadata',
	'missing-glyph',
	'mpath',
	'path',
	'pattern',
	'polygon',
	'polyline',
	'radialGradient',
	'rect',
	'set',
	'solidcolor',
	'stop',
	'svg',
	'switch',
	'symbol',
	'text',
	'textPath',
	'tref',
	'tspan',
	'unknown',
	'use',
	'view',
	'vkern'
];

export const MathMLElements = [
	'annotation',
	'annotation-xml',
	'maction',
	'math',
	'merror',
	'mfrac',
	'mi',
	'mmultiscripts',
	'mn',
	'mo',
	'mover',
	'mpadded',
	'mphantom',
	'mprescripts',
	'mroot',
	'mrow',
	'ms',
	'mspace',
	'msqrt',
	'mstyle',
	'msub',
	'msubsup',
	'msup',
	'mtable',
	'mtd',
	'mtext',
	'mtr',
	'munder',
	'munderover',
	'semantics'
];

export const EventModifiers = [
	'preventDefault',
	'stopPropagation',
	'stopImmediatePropagation',
	'capture',
	'once',
	'passive',
	'nonpassive',
	'self',
	'trusted'
];

export const JsKeywords = [
	'class',
	'break',
	'const',
	'let',
	'var',
	'continue',
	'if',
	'for',
	'while',
	'do',
	'new',
	'static',
	'true',
	'false',
	'void',
	'with',
	'yield',
	'await',
	'typeof',
	'throw',
	'throws',
	'null',
	'delete',
	'default',
	'catch',
	'debugger',
	'case',
	'arguments',
	'else',
	'extends',
	'export',
	'import',
	'extends',
	'switch',
	'instanceof',
	'return',
	'this'
];
