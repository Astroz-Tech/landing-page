<script lang="ts">
  import { ArrowUpRight, Menu } from "@lucide/svelte";
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { buttonVariants } from "$lib/components/ui/button/index";
  import { cn } from "$lib/utils";

  interface NavItem {
    href: string;
    label: string;
  }

  interface Props {
    items: NavItem[];
    currentPath: string;
    contactHref: string;
    contactLabel: string;
    menuLabel: string;
    title: string;
    description: string;
    closeLabel: string;
  }

  let {
    items,
    currentPath,
    contactHref,
    contactLabel,
    menuLabel,
    title,
    description,
    closeLabel,
  }: Props = $props();

  let showDonate = $state(false);
  let open = $state(false);
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  // bits-ui unmounts the sheet the moment `open` flips, which cuts any exit
  // transition. Hold the state for the duration of the close animation.
  function onOpenChange(next: boolean) {
    clearTimeout(closeTimer);
    if (next) {
      open = true;
      return;
    }
    closeTimer = setTimeout(() => (open = false), 220);
  }

  $effect(() => {
    if (!open) showDonate = false;
  });

  $effect(() => () => clearTimeout(closeTimer));

  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);
</script>

<Sheet.Root {open} {onOpenChange}>
  <Sheet.Trigger
    class="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors duration-200 hover:bg-accent md:hidden"
    aria-label={menuLabel}
  >
    <Menu class="h-5 w-5" strokeWidth={1.5} />
  </Sheet.Trigger>
  <Sheet.Content
    side="right"
    showCloseButton={false}
    class="mobile-nav-sheet flex w-[85vw] max-w-sm flex-col overflow-y-auto bg-background"
  >
    <Sheet.Header class="mobile-nav-item border-b border-border px-5 py-4">
      <Sheet.Title
        class="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"
      >
        {title}
      </Sheet.Title>
      <Sheet.Description class="sr-only">{description}</Sheet.Description>
    </Sheet.Header>

    <nav aria-label="Menu">
      <ul class="flex flex-col px-5">
        {#each items as item, index (item.href)}
          <li class="mobile-nav-item border-b border-border" style={`--i: ${index + 1}`}>
            <a
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              class={cn(
                "group flex min-h-14 items-center py-3 text-lg font-semibold tracking-[-0.01em] transition-colors duration-200",
                isActive(item.href) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span class="transition-[translate] duration-200 group-hover:translate-x-1">
                {item.label}
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="mt-auto flex flex-col gap-3 px-5 py-5">
      <div
        id="mobile-donate-qr"
        hidden={!showDonate}
        class="mobile-nav-item rounded-lg border border-border bg-card p-4"
        style={`--i: ${items.length + 1}`}
      >
        <p class="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-primary">
          DONATE VIA SAWERIA
        </p>
        <img
          src="/assets/saweria-qr.png"
          alt="Saweria QR code for Astroz donations"
          width={3000}
          height={3000}
          class="mt-3 w-full rounded-md border border-border"
          loading="lazy"
          decoding="async"
        />
        <a
          href={contactHref}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Open donation page
          <ArrowUpRight class="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>

      <div class="mobile-nav-item flex flex-col gap-2" style={`--i: ${items.length + 1}`}>
        <button
          type="button"
          onclick={() => (showDonate = !showDonate)}
          aria-expanded={showDonate}
          aria-controls="mobile-donate-qr"
          class={buttonVariants({
            size: "lg",
            class: "font-semibold duration-200 hover:-translate-y-0.5",
          })}
        >
          {contactLabel}
        </button>
        <Sheet.Close class={buttonVariants({ variant: "ghost", size: "lg" })}>
          {closeLabel}
        </Sheet.Close>
      </div>
    </div>
  </Sheet.Content>
</Sheet.Root>
