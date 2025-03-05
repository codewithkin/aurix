function Topbar() {
  return (
    <article className="shadow-sm border-b border-slate-600 flex justify-between items-center px-8 py-4">
        {/* Branding */}
        <article className="flex gap-4 items-cente">
            <article className="flex flex-col">
                <h1>Aurix</h1>
            </article>
        </article>

        <article>
            <article className="border-b border-sky-700 p-4 text-sky-700 font-medium">
                Job listings
            </article>
        </article>

        {/* Profile and notifications bell */}
        <Bell size={35} strokeWidth={1.3} />
    </article>
  )
}

export default Topbar
