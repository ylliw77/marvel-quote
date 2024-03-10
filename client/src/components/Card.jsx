

export default function Card({char}) {

  return (
    <>
    
      <a
        href="#"
        className="block max-w-sm p-6 bg-black border border-gray-200 rounded-lg shadow"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-500">
          {char?.name}
        </h5>
        <p className="font-bold text-white">
          {char?.quotes ? char.quotes[0] : '' }
        </p>
      </a>
    </>
  );
}
