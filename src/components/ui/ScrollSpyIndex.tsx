import { useEffect, useState } from "react";
import { formatIndex } from "../../utils/format";

export type ScrollSpyIndexItem = {
  id: string;
  title: string;
  meta?: string;
};

export function ScrollSpyIndex({
  ariaLabel,
  label,
  items,
}: {
  ariaLabel: string;
  label: string;
  items: ScrollSpyIndexItem[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const updateActiveItem = () => {
      const scrollPosition = window.scrollY + 140;

      const currentItem = items
        .map((item) => document.getElementById(item.id))
        .filter((element): element is HTMLElement => Boolean(element))
        .filter((element) => element.offsetTop <= scrollPosition)
        .at(-1);

      if (currentItem) setActiveId(currentItem.id);
    };

    updateActiveItem();

    window.addEventListener("scroll", updateActiveItem, { passive: true });
    window.addEventListener("resize", updateActiveItem);

    return () => {
      window.removeEventListener("scroll", updateActiveItem);
      window.removeEventListener("resize", updateActiveItem);
    };
  }, [items]);

  return (
    <nav aria-label={ariaLabel}>
      <p className="module-label">{label}</p>

      <ol>
        {items.map((item, index) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={isActive ? "active" : ""}
                onClick={() => setActiveId(item.id)}
              >
                <span>{formatIndex(index)}</span>

                <span>
                  <strong>{item.title}</strong>
                  {item.meta ? <em>{item.meta}</em> : null}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
