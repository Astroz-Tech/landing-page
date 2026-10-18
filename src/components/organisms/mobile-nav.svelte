<script lang="ts">
  import { Menu } from "@lucide/svelte";
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { buttonVariants } from "$lib/components/ui/button/index";

  let {
    items,
    contactHref,
    contactLabel,
    menuLabel,
    title,
    description,
    closeLabel,
  }: {
    items: { href: string; label: string }[];
    contactHref: string;
    contactLabel: string;
    menuLabel: string;
    title: string;
    description: string;
    closeLabel: string;
  } = $props();
</script>

<Sheet.Root>
  <Sheet.Trigger
    class="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors duration-200 hover:bg-accent md:hidden"
    aria-label={menuLabel}
  >
    <Menu class="h-5 w-5" strokeWidth={1.5} />
  </Sheet.Trigger>
  <Sheet.Content side="right" showCloseButton={false} class="flex w-[85vw] max-w-sm flex-col">
    <Sheet.Header>
      <Sheet.Title class="sr-only">{title}</Sheet.Title>
      <Sheet.Description class="sr-only">{description}</Sheet.Description>
    </Sheet.Header>
    <div class="flex flex-col gap-1 px-4">
      {#each items as item (item.href)}
        <a
          href={item.href}
          class="rounded-md px-3 py-3 font-semibold text-2xl leading-tight text-foreground transition-[background-color,color,translate] duration-200 hover:translate-x-1 hover:bg-accent hover:text-primary"
        >
          {item.label}
        </a>
      {/each}
    </div>
    <div class="mt-auto flex flex-col gap-2 p-4">
      <a href={contactHref} class={buttonVariants({ size: "lg", class: "font-semibold duration-200 hover:-translate-y-0.5" })}>{contactLabel}</a>
      <Sheet.Close class={buttonVariants({ variant: "ghost", size: "lg" })}>{closeLabel}</Sheet.Close>
    </div>
  </Sheet.Content>
</Sheet.Root>
