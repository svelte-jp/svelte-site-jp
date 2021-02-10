<script>
    export let visible = false;
    export const toggleVisiblity = () => (visible = !visible);

    function hide() {
        visible = false;
    }

    function clickOutside(node) {
        const handleClick = (event) => {
            if (
                node &&
                !node.contains(event.target) &&
                !event.defaultPrevented
            ) {
                node.dispatchEvent(new CustomEvent("click_outside", node));
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            },
        };
    }
</script>

<style>
    .activator {
        vertical-align: middle;
        outline: 0;
        padding: 0 2.0rem 0 0.8rem;
        box-shadow: none;
        display: inline-flex;
        transition: color 0.2s, border 0.2s, padding 0.2s;
        font-size: 16px;
    }

    .activator:hover {
        color: var(--flash);
    }

    .current {
        position: relative;
    }

    .current::after {
        /* prevent clicks from registering if nav is closed */
        background: url(/icons/chevron.svg) calc(100% - 1em) 0.05em no-repeat;
        background-size: 1em 1em;
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        left: 2.0em;
        top: 4px;
    }

    :global(button.activator > svg) {
        top: auto;
    }

    @media (max-width: 839px) {
        :global(ul.open li) button.activator {
            padding: 1.5rem 3.7rem 1.5rem 4rem;
        }

        .list {
            left: calc(10px - var(--side-nav));
        }
    }

    .list {
        position: absolute;
        display: inline-block;
        overflow: auto;
        contain: content;
        z-index: 1;
        will-change: transform;

        padding: 0 0 0 0;
        background: white;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        border-radius: 0 0 var(--border-r) var(--border-r);
        align-self: start;

        top: var(--nav-h);
        transform: translate(-70%, -30px);
    }
</style>

<li use:clickOutside on:click_outside={hide}>
    <button class="activator primary" on:click={toggleVisiblity}>
        <div class="current" style="display:inline;">
            <slot name="title" />
        </div>
    </button>
    {#if visible}
        <div style="display:inline; position:relative; z-idnex: 2;">
            <ul class="list">
                <slot />
            </ul>
        </div>
    {/if}
</li>
