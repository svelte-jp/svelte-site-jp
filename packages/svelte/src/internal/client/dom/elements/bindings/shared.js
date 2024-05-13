import { render_effect } from '../../../reactivity/effects.js';

/**
 * Fires the handler once immediately (unless corresponding arg is set to `false`),
 * then listens to the given events until the render effect context is destroyed
 * @param {Element | Window} target
 * @param {Array<string>} events
 * @param {() => void} handler
 * @param {any} call_handler_immediately
 */
export function listen(target, events, handler, call_handler_immediately = true) {
	if (call_handler_immediately) {
		handler();
	}

	for (var name of events) {
		target.addEventListener(name, handler);
	}

	render_effect(() => {
		return () => {
			for (var name of events) {
				target.removeEventListener(name, handler);
			}
		};
	});
}

let listening_to_form_reset = false;

/**
 * Listen to the given event, and then instantiate a global form reset listener if not already done,
 * to notify all bindings when the form is reset
 * @param {HTMLElement} element
 * @param {string} event
 * @param {() => void} handler
 * @param {() => void} [on_reset]
 */
export function listen_to_event_and_reset_event(element, event, handler, on_reset = handler) {
	element.addEventListener(event, handler);
	// @ts-expect-error
	const prev = element.__on_r;
	if (prev) {
		// special case for checkbox that can have multiple binds (group & checked)
		// @ts-expect-error
		element.__on_r = () => {
			prev();
			on_reset();
		};
	} else {
		// @ts-expect-error
		element.__on_r = on_reset;
	}

	if (!listening_to_form_reset) {
		listening_to_form_reset = true;
		document.addEventListener(
			'reset',
			(evt) => {
				// Needs to happen one tick later or else the dom properties of the form
				// elements have not updated to their reset values yet
				Promise.resolve().then(() => {
					if (!evt.defaultPrevented) {
						for (const e of /**@type {HTMLFormElement} */ (evt.target).elements) {
							// @ts-expect-error
							e.__on_r?.();
						}
					}
				});
			},
			// In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
			{ capture: true }
		);
	}
}
