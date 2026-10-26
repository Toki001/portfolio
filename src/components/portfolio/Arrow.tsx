export function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="arrow"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
