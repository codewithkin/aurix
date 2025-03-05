import React from "react";
import Search from "./main/Search";

function MainContent() {
  return (
    <article className="flex gap-8 items-center justify-between">
      {/* Filters sidebar */}
      <aside className="p-8 w-1/4">
        <article className="p-4 rounded-md border border-gray-200">
          <h2>Hi</h2>
        </article>
      </aside>

      {/* Main content */}
      <main className="w-3/4">
            <Search />
      </main>
    </article>
  );
}

export default MainContent;
