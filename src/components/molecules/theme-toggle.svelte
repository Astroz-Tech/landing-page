<script lang="ts">
  import { onMount } from "svelte";
  import { Moon, Sun } from "@lucide/svelte";

  interface Props {
    label: string;
  }

  let { label }: Props = $props();

  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    root.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  onMount(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      document.documentElement.classList.toggle("dark", event.matches);
      document.documentElement.style.colorScheme = event.matches ? "dark" : "light";
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  });
</script>

<button
  type="button"
  onclick={toggle}
  aria-label={label}
  class="group inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
  <Sun class="hidden h-[18px] w-[18px] transition-[rotate] duration-200 group-hover:rotate-45 dark:block" strokeWidth={1.5} />
  <Moon class="block h-[18px] w-[18px] transition-[rotate] duration-200 group-hover:-rotate-12 dark:hidden" strokeWidth={1.5} />
</button>
