import type { ComponentProps } from 'react';
import { useHref, useLinkClickHandler } from 'react-router-dom';
import { HudLink } from './hud/HudButton';

type Props = Omit<ComponentProps<typeof HudLink>, 'href'> & { to: string };

/**
 * HudLink pour les routes internes : navigation côté client (comme <Link>),
 * tout en gardant le vrai href (clic molette, Ctrl/Cmd+clic, nouvel onglet).
 */
export default function HudRouterLink({ to, onClick, target, ...rest }: Props) {
  const href = useHref(to);
  const handleClick = useLinkClickHandler<HTMLAnchorElement>(to, { target });
  return (
    <HudLink
      {...rest}
      href={href}
      target={target}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) handleClick(e);
      }}
    />
  );
}
