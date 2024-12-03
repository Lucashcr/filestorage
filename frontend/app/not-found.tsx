export default function NotFoundPage() {
  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="w-[400px] bg-secondary p-6 rounded-xl shadow flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Ops!</h1>
        <p>Não encontramos a página que você está buscando.</p>
      </div>
    </div>
  );
}
