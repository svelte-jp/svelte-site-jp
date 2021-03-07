<script context="module">
	import { waitLocale } from "svelte-i18n";
	export async function preload(page) {
		return await waitLocale();
	}
</script>

<script>
	import { setContext } from 'svelte';
	import { stores } from '@sapper/app';
	import { Icon, Icons, Nav, NavItem } from '@sveltejs/site-kit';
	import PreloadingIndicator from '../components/PreloadingIndicator.svelte';
	import Menu from "../components/Menu.svelte";
	import MenuItem from "../components/MenuItem.svelte";
	import MenuLinkItem from "../components/MenuLinkItem.svelte";
	import { _, locale, locales } from "svelte-i18n";

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

	let langMenu;
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

		<NavItem external="https://github.com/sveltejs/svelte" title="GitHub Repo">
			<Icon name="github"/>
		</NavItem>

		<Menu>
			<span slot="title">Chat</span>
			<MenuLinkItem href="chat">Svelte Discord</MenuLinkItem>
			<MenuLinkItem href="chat-jp">Svelte日本Discord</MenuLinkItem>
		</Menu>

		<Menu bind:this={langMenu}>
			<span slot="title">{$_("languages." + $locale.replace("_", "-"), { default : "English" })}</span>
			{#each $locales as item}
				<MenuItem
					on:click={() => ($locale = item, langMenu.toggleVisiblity())}
					selected={$locale.includes(item)}
					{item}>
					{$_("languages." + item.replace("_", "-"))}
				</MenuItem>
			{/each}
		</Menu>
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
</style>