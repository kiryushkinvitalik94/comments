"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">
        Oops! Что-то пошло не так.
      </h1>
      <p className="text-gray-600">
        Произошла ошибка при загрузке комментариев.
      </p>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
