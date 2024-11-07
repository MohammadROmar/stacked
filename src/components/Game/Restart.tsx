export default function Restart({ onRestart }: { onRestart(): void }) {
  return (
    <section className="section w-auto absolute top-4 right-4 p-0 rounded-full">
      <button onClick={onRestart} className="p-2">
        Restart
      </button>
    </section>
  );
}
