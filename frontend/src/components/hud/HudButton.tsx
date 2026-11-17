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
  /** Après une exécution réussie : le cadran reste plein à 100 % jusqu'à la prochaine (comme le scan) */
  done?: boolean;
  selected?: boolean;
};

function Graphic({action,busy=false,progress,done=false}: {action:HudAction;busy?:boolean;progress?:number;done?:boolean}) {
  const shown=done && !busy ? 100 : progress;
  const percentage=typeof shown==='number' && Number.isFinite(shown) ? Math.min(100,Math.max(0,Math.round(shown))) : undefined;
  return <span className="noxel-hud__graphic" aria-hidden="true">
    {/* Chaînes SVG internes fournies dans ce kit, jamais du contenu utilisateur. */}
    <svg className="noxel-hud__svg" viewBox="0 0 128 128" focusable="false" dangerouslySetInnerHTML={{__html:HUD_MARKUP[action]}} />
    {/* En cours : cadran façon test de vitesse (piste violette qui se remplit de vert). Pourcentage réel seulement
        s'il est connu ; sinon un segment vert parcourt la piste, sans chiffre inventé. */}
    {(busy || done) && <svg className="noxel-hud__gauge" viewBox="0 0 128 128" focusable="false">
      <path d="M 18 92 A 46 46 0 0 1 110 92" fill="none" stroke="#A855F7" strokeWidth="11" strokeLinecap="round" />
      <path d="M 18 92 A 46 46 0 0 1 110 92" fill="none" stroke="#3DDC84" strokeWidth="11" strokeLinecap="round" pathLength="100"
        className={percentage===undefined ? 'noxel-hud__gauge-sweep' : 'noxel-hud__gauge-fill'}
        strokeDasharray={percentage===undefined ? '28 100' : `${percentage} 100`} />
      <text x="64" y="88" textAnchor="middle" className="noxel-hud__gauge-text">{percentage===undefined ? '···' : `${percentage}%`}</text>
    </svg>}
  </span>;
}
function classes(compact?:boolean,iconOnly?:boolean,className?:string) {
  return ['noxel-hud',compact && 'noxel-hud--compact',iconOnly && 'noxel-hud--icon-only',className].filter(Boolean).join(' ');
}
export function HudButton({action,label,compact,iconOnly,busy=false,busyLabel,progress,done,selected,className,disabled,type='button',...rest}:HudButtonProps) {
  const text=label??HUD_ACTIONS[action].label;
  const pending=busyLabel??(HUD_ACTIONS[action].busyLabel || 'En cours…');
  const finiteProgress=typeof progress==='number' && Number.isFinite(progress) ? Math.min(100,Math.max(0,Math.round(progress))) : undefined;
  return <button {...rest} type={type} className={classes(compact,iconOnly,className)} disabled={disabled || busy}
    aria-busy={busy || undefined} aria-pressed={selected} aria-label={busy ? `${pending}${finiteProgress===undefined?'':` ${finiteProgress}%`}` : text} title={iconOnly ? text : rest.title}>
    <Graphic action={action} busy={busy} progress={progress} done={done}/>
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
