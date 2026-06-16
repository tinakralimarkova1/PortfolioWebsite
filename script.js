const tabRoot = document.querySelector("[data-tabs]");

if (tabRoot) {
  const tabs = Array.from(tabRoot.querySelectorAll('[role="tab"]'));
  const panels = Array.from(tabRoot.querySelectorAll('[role="tabpanel"]'));

  const activateTab = (nextTab) => {
    tabs.forEach((tab) => {
      const selected = tab === nextTab;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isTarget = panel.id === nextTab.getAttribute("aria-controls");
      panel.classList.toggle("is-active", isTarget);
      panel.hidden = !isTarget;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      const lastIndex = tabs.length - 1;
      let nextIndex = currentIndex;

      if (event.key === "ArrowRight") nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
      if (event.key === "ArrowLeft") nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = lastIndex;

      if (nextIndex !== currentIndex || event.key === "Home" || event.key === "End") {
        event.preventDefault();
        activateTab(tabs[nextIndex]);
        tabs[nextIndex].focus();
      }
    });

    if (index !== 0) tab.tabIndex = -1;
  });
}
