import NivoChat from './NivoChat';
import { useForgeT } from '../hooks/useForgeT';
import { useAuthStore } from '../auth/authContext';

// Nivo, l'assistant de support NOXEL, sur toutes les pages de NOXEL FORGE (faits de FORGE, API de NOXEL SEO)
export default function ForgeNivo() {
  const { lang } = useForgeT();
  const { user } = useAuthStore();
  return <NivoChat locale={lang} site="forge" accountEmail={user?.email ?? null} />;
}
