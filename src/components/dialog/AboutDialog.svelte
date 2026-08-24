<script lang="ts">
  import { dialogs } from '@/lib/dialogs.svelte';
  import { openExternalLink } from '@/lib/utils';
  import Logo from '../Logo.svelte';
  import Dialog from '../ui/Dialog.svelte';
  import Button from '../ui/Button.svelte';
</script>

<Dialog bind:open={dialogs.isAboutOpen}>
  <h2 class="text-lg font-bold mb-2 flex items-center gap-2 text-foreground font-heading">
    <a
      href="https://github.com/sebilune/noisium"
      target="_blank"
      rel="noopener noreferrer"
      onclick={(e) => openExternalLink('https://github.com/sebilune/noisium', e)}
      class="transition-colors duration-150 cursor-pointer text-muted hover:text-foreground flex items-center"
      aria-label="GitHub Repository"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        class="w-5 h-5"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    </a>
    <span class="text-muted/30 font-normal">|</span>
    <Logo class="w-5.5 h-5.5 text-primary" />
    <span>Noisium</span>
  </h2>

  <p class="text-xs leading-relaxed mb-5 text-muted">
    A lightweight, ad-free, and open-source local ambient sound mixer. Customize your background audio
    environment to focus, relax, or block out unwanted noise.
  </p>

  <div class="mt-5 flex items-center justify-between">
    <Button
      href="https://ko-fi.com/Y0S621Z5JU"
      target="_blank"
      rel="noopener noreferrer"
      onclick={(e) => openExternalLink('https://ko-fi.com/Y0S621Z5JU', e)}
      class="w-fit gap-1.5"
      variant="secondary"
    >
      <img
        src="/kofi_symbol.png"
        alt="Ko-fi symbol"
        class="w-4.5 h-4.5 object-contain"
      />
      <span>Support me on Ko-fi</span>
    </Button>

    <Button variant="primary" onclick={() => dialogs.closeAbout()} autofocus>
      Close
    </Button>
  </div>
</Dialog>
