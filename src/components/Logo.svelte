<script lang="ts">
  let { class: className = '' } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="8 28 84 64"
  class={className}
  width="24"
  height="24"
>
  <path
    d="M 15 50 Q 32.5 20, 50 50 T 85 50"
    stroke="currentColor"
    stroke-width="10"
    stroke-linecap="round"
    fill="none"
  />
  <path
    d="M 15 70 Q 32.5 40, 50 70 T 85 70"
    stroke="currentColor"
    stroke-width="10"
    stroke-linecap="round"
    fill="none"
    opacity="0.4"
  />
</svg>
