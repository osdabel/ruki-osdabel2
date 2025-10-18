// app/not-found.js
export default function NotFound() {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
<div className="max-w-md text-center p-8 bg-white rounded-2xl shadow">
<h1 className="text-4xl font-extrabold">Coming Soon</h1>
<p className="mt-4 text-lg text-gray-600">Sedang dalam Tahap Developing</p>
<a
href="/"
className="mt-6 inline-block px-4 py-2 rounded-lg border font-medium hover:shadow"
>
Kembali ke Beranda
</a>
</div>
</div>
);
}