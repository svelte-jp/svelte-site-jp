export { hmr } from './dev/hmr.js';
export {
	ADD_OWNER,
	add_owner,
	mark_module_start,
	mark_module_end,
	add_owner_effect
} from './dev/ownership.js';
export { inspect } from './dev/inspect.js';
export { await_block as await } from './dom/blocks/await.js';
export { if_block as if } from './dom/blocks/if.js';
export { key_block as key } from './dom/blocks/key.js';
export { css_props } from './dom/blocks/css-props.js';
export { index, each } from './dom/blocks/each.js';
export { html } from './dom/blocks/html.js';
export { snippet, wrap_snippet } from './dom/blocks/snippet.js';
export { component } from './dom/blocks/svelte-component.js';
export { element } from './dom/blocks/svelte-element.js';
export { head } from './dom/blocks/svelte-head.js';
export { action } from './dom/elements/actions.js';
export {
	remove_input_attr_defaults,
	set_attribute,
	set_attributes,
	set_custom_element_data,
	set_dynamic_element_attributes,
	set_xlink_attribute
} from './dom/elements/attributes.js';
export { set_class, set_svg_class, set_mathml_class, toggle_class } from './dom/elements/class.js';
export { event, delegate } from './dom/elements/events.js';
export { autofocus, remove_textarea_child } from './dom/elements/misc.js';
export { set_style } from './dom/elements/style.js';
export { animation, transition } from './dom/elements/transitions.js';
export { bind_checked, bind_files, bind_group, bind_value } from './dom/elements/bindings/input.js';
export {
	bind_buffered,
	bind_current_time,
	bind_ended,
	bind_muted,
	bind_paused,
	bind_playback_rate,
	bind_played,
	bind_ready_state,
	bind_seekable,
	bind_seeking,
	bind_volume
} from './dom/elements/bindings/media.js';
export { bind_online } from './dom/elements/bindings/navigator.js';
export { bind_prop } from './dom/elements/bindings/props.js';
export { bind_select_value, init_select, select_option } from './dom/elements/bindings/select.js';
export { bind_element_size, bind_resize_observer } from './dom/elements/bindings/size.js';
export { bind_this } from './dom/elements/bindings/this.js';
export {
	bind_content_editable,
	bind_property,
	bind_focused
} from './dom/elements/bindings/universal.js';
export { bind_window_scroll, bind_window_size } from './dom/elements/bindings/window.js';
export {
	once,
	preventDefault,
	self,
	stopImmediatePropagation,
	stopPropagation,
	trusted
} from './dom/legacy/event-modifiers.js';
export { init } from './dom/legacy/lifecycle.js';
export {
	add_legacy_event_listener,
	bubble_event,
	reactive_import,
	update_legacy_props
} from './dom/legacy/misc.js';
export {
	append,
	comment,
	svg_template,
	svg_template_with_script,
	mathml_template,
	template,
	template_with_script,
	text
} from './dom/template.js';
export { derived, derived_safe_equal } from './reactivity/deriveds.js';
export {
	effect_active,
	effect_root,
	legacy_pre_effect,
	legacy_pre_effect_reset,
	render_effect,
	user_effect,
	user_pre_effect
} from './reactivity/effects.js';
export { mutable_source, mutate, source, set } from './reactivity/sources.js';
export {
	prop,
	rest_props,
	legacy_rest_props,
	spread_props,
	update_pre_prop,
	update_prop
} from './reactivity/props.js';
export {
	invalidate_store,
	mutate_store,
	store_get,
	store_set,
	store_unsub,
	unsubscribe_on_destroy,
	update_pre_store,
	update_store
} from './reactivity/store.js';
export { append_styles, sanitize_slots, set_text, slot, stringify } from './render.js';
export {
	get,
	invalidate_inner_signals,
	flush_sync,
	tick,
	untrack,
	update,
	update_pre,
	value_or_fallback,
	value_or_fallback_async,
	exclude_from_object,
	pop,
	push,
	unwrap,
	freeze,
	deep_read,
	deep_read_state,
	getAllContexts,
	getContext,
	setContext,
	hasContext
} from './runtime.js';
export {
	validate_dynamic_component,
	validate_each_keys,
	validate_prop_bindings
} from './validate.js';
export { raf } from './timing.js';
export { proxy, snapshot } from './proxy.js';
export { create_custom_element } from './dom/elements/custom-element.js';
export {
	child,
	first_child,
	sibling,
	$window as window,
	$document as document
} from './dom/operations.js';
export { noop } from '../shared/utils.js';
export {
	add_snippet_symbol,
	validate_component,
	validate_dynamic_element_tag,
	validate_snippet,
	validate_store,
	validate_void_dynamic_element
} from '../shared/validate.js';
