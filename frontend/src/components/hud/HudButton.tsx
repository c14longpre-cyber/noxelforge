/// <reference path="./assets.d.ts" />
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { HUD_MARKUP, HUD_ACTIONS, type HudAction } from './hud-data';
import './hud-buttons.css';

type VisualProps = {
  action: HudAction;
  label?: string;
  compact?: boolean;
  iconOnly?: boolean;
};
export type HudButtonProps = VisualProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  busy?: boolean;
  busyLabel?: string;
  /** Progression réelle, de 0 à 100. Omettre si elle n’est pas connue. */
  progress?: number;
  selected?: boolean;
};

function Graphic({action,busy=false,progress}: {action:HudAction;busy?:boolean;progress?:number}) {
  const percentage=typeof progress==='number' && Number.isFinite(progress) ? Math.min(100,Math.max(0,Math.round(progress))) : undefined;
  return <span className="noxel-hud__graphic" aria-hidden="true">
    {/* Chaînes SVG internes fournies dans ce kit, jamais du contenu utilisateur. */}
    <svg className="noxel-hud__svg" viewBox="0 0 128 128" focusable="false" dangerouslySetInnerHTML={{__html:HUD_MARKUP[action]}} />
    {busy && <span className="noxel-hud__loading">{percentage===undefined ? <span>···</span> : `${percentage}%`}</span>}
    {busy && percentage!==undefined && <svg className="noxel-hud__progress" viewBox="0 0 128 128">
      <circle cx="64" cy="64" r="31" fill="none" stroke="#3DDC84" strokeWidth="2.5" pathLength="100" strokeDasharray={`${percentage} 100`} transform="rotate(-90 64 64)" />
    </svg>}
  </span>;
}
function classes(compact?:boolean,iconOnly?:boolean,className?:string) {
  return ['noxel-hud',compact && 'noxel-hud--compact',iconOnly && 'noxel-hud--icon-only',className].filter(Boolean).join(' ');
}
export function HudButton({action,label,compact,iconOnly,busy=false,busyLabel,progress,selected,className,disabled,type='button',...rest}:HudButtonProps) {
  const text=label??HUD_ACTIONS[action].label;
  const pending=busyLabel??(HUD_ACTIONS[action].busyLabel || 'En cours…');
  const finiteProgress=typeof progress==='number' && Number.isFinite(progress) ? Math.min(100,Math.max(0,Math.round(progress))) : undefined;
  return <button {...rest} type={type} className={classes(compact,iconOnly,className)} disabled={disabled || busy}
    aria-busy={busy || undefined} aria-pressed={selected} aria-label={busy ? `${pending}${finiteProgress===undefined?'':` ${finiteProgress}%`}` : text} title={iconOnly ? text : rest.title}>
    <Graphic action={action} busy={busy} progress={progress}/>
    <span className="noxel-hud__label">{busy ? pending : text}</span>
  </button>;
}

/** Les téléchargements gardent leur sémantique de lien et leur attribut download. */
export function HudLink({action,label,compact,iconOnly,className,...rest}:VisualProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {href:string}) {
  const text=label??HUD_ACTIONS[action].label;
  return <a {...rest} className={classes(compact,iconOnly,className)} aria-label={text} title={iconOnly ? text : rest.title}>
    <Graphic action={action}/><span className="noxel-hud__label">{text}</span>
  </a>;
}
