
const page = () => {

    return (
        <>
            <section className="w-screen h-max px-4 pt-5">
                <h1 className="text-3xl font-bold">Halaman Admin</h1>
                <h2 className="text-sm">Kamu Login Sebagai : [nama]</h2>
                <h2 className="text-sm">Dengan Role : [Role]</h2>
            </section>
            <section className="mt-6 px-4">
                <div className="w-full bg-blue-500 shadow-2xl flex justify-center rounded-md py-1 px-4">
                    <h1 className="text-xl font-bold text-white">Dashboard Admin</h1>
                </div>
                <div className="w-full flex justify-around gap-2 mt-2">
                    <div className="w-45 bg-blue-500 shadow-2xl flex justify-center rounded-md py-1 px-4">
                        <h1 className="text-xl font-bold text-white">Orders</h1>
                    </div>
                    <div className="w-45 bg-blue-500 shadow-2xl flex justify-center rounded-md py-1 px-4">
                        <h1 className="text-xl font-bold text-white">Produks</h1>
                    </div>
                </div>
                <div className="w-full bg-blue-500 shadow-2xl flex justify-center rounded-md py-1 px-4 mt-2">
                    <h1 className="text-xl font-bold text-white">Manajemen User</h1>
                </div>
            </section>
        </>
    )
}

export default page;