import { Bell } from "lucide-react";

function Topbar() {
  return (
    <article className="shadow-sm border-b border-slate-300 flex justify-between items-center px-8 py-4">
      {/* Branding */}
      <article className="flex gap-4 items-cente">
        <article className="flex flex-col">
          <h1 className="text-2xl font-semibold">Aurix</h1>
        </article>
      </article>

      <article>
        <article className="border-b-2 font-semibold border-sky-700 p-4 text-sky-700">
          Job listings
        </article>
      </article>

      {/* Profile and notifications bell */}
      <Bell className="text-sky-700" size={28} strokeWidth={1.5} />
    </article>
  );
}

export default Topbar;
