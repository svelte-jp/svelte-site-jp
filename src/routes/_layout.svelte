<script context="module">
  import { waitLocale } from 'svelte-i18n';
  export async function preload(page) {
    return waitLocale();
  }
</script>

<script>
	import { setContext } from 'svelte';
	import { stores } from '@sapper/app';
	import { Icon, Icons, Nav, NavItem } from '@sveltejs/site-kit';
	import PreloadingIndicator from '../components/PreloadingIndicator.svelte';
	import { _, locale, locales } from 'svelte-i18n';

	export let segment;

	const { page, preloading, session } = stores();

	setContext('app', {
		login: () => {
			const login_window = window.open(`${window.location.origin}/auth/login`, 'login', 'width=600,height=400');

			window.addEventListener('message', function handler(event) {
				login_window.close();
				window.removeEventListener('message', handler);
				$session.user = event.data.user;
			});
		},

		logout: async () => {
			const r = await fetch(`/auth/logout`, {
				credentials: 'include'
			});

			if (r.ok) $session.user = null;
		}
	});

	let visible = false;
	function toggleVisiblity() {
		visible = !visible;
	}

</script>

<Icons/>

{#if $preloading}
	<PreloadingIndicator/>
{/if}

{#if $page.path !== '/repl/embed'}
	<Nav {segment} {page} logo="svelte-logo-horizontal.svg">
		<NavItem segment="tutorial">Tutorial</NavItem>
		<NavItem segment="docs">API</NavItem>
		<NavItem segment="examples">Examples</NavItem>
		<NavItem segment="repl">REPL</NavItem>
		<NavItem segment="blog">Blog</NavItem>
		<NavItem segment="faq">FAQ</NavItem>

		<NavItem external="https://sapper.svelte.dev">Sapper</NavItem>

		<NavItem external="chat" title="Discord Chat">
			<Icon name="message-square"/>
		</NavItem>

		<NavItem external="https://github.com/sveltejs/svelte" title="GitHub Repo">
			<Icon name="github"/>
		</NavItem>
		<li>
			<button class="languages-button primary" on:click={toggleVisiblity} title="languages">
				<span class="current-language">{$_('languages.' + $locale.replace('-', '_'))}</span>
			</button>
			{#if visible}
			<div class="languages-container" style="display:inline; position:relative;">
				<ul class="languages">
					{#each $locales as item}
						<li style="text-align:center;">
							<span
								class="a"
								class:selected={$locale.includes(item)}
								href={`#!${item}`}
								on:click={() => ($locale = item, visible = !visible)}>
								{$_('languages.' + item.replace('-', '_'))}
							</span>
						</li>
					{/each}
				</ul>
			</div>
			{/if}
		</li>
	</Nav>
{/if}

<main>
	<slot></slot>
</main>

<style>
	main {
		position: relative;
		margin: 0 auto;
		/* padding: var(--nav-h) var(--side-nav) 0 var(--side-nav); */
		padding: var(--nav-h) 0 0 0;
		overflow-x: hidden;
	}

	.languages-button {
		vertical-align: middle;
		outline: 0;
		padding: 0 .8rem;
		box-shadow: none;
		display: inline-flex;
		transition: color .2s, border .2s, padding .2s;
		font-size: 16px;
	}

	.current-language {
		position: relative;
	}

	.current-language::after {
		/* prevent clicks from registering if nav is closed */
		background: url(/icons/chevron.svg) calc(100% - 1em) 0.05em no-repeat;
		background-size: 1em 1em;
		position: absolute;
		content: '';
		width: 100%;
		height: 100%;
		right: -33px;
		top: 4px;
	}

	.a.selected {
		color: var(--prime);
	}
	.languages-button:hover, .a:hover {
		color: var(--flash);
	}

	:global(.languages-button > svg) {
		top: auto;
	}

	@media (max-width: 839px) {
		:global(ul.open li) button.languages-button {
		    padding: 1.5rem 3.7rem 1.5rem 4rem;
		}
	}
	.languages {
		position: absolute;
    	display: inline-block;
    	overflow: auto;
    	contain: content;
    	will-change: transform;

		right:0px;
		top:24px;
	}

	ul.languages {
		padding: 0 0 0 0;
		background: white;
		border-top: 1px solid #eee;
		border-left: 1px solid #eee;
		border-right: 1px solid #eee;
		border-bottom: 1px solid #eee;
		border-radius: 0 0 var(--border-r) var(--border-r);
		align-self: start;
	}

	ul.languages li {
		display: block;
		text-align: right
	}
	ul.languages::after {
		display: none;
	}

	ul.languages li span {
		padding: 0.7rem 3.7rem 0.7rem 3.7rem;
		display: block;
	}

</style>
