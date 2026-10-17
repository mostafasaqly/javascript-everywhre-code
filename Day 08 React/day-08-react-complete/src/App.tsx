import { Navigate, Route, Routes } from "react-router";

import { Home, About, Lesson, Lessons, NotFound, Shell } from "./routing/pages";
import { Fruit } from "./routing/Fruit";
import { PageA, PageB, SharedLayout } from "./routing/Shared";

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="lessons" element={<Lessons />} />

        <Route path="lessons/:n" element={<Lesson />} />

        <Route path="old-about" element={<Navigate to="/about" replace />} />
        <Route path="fruit" element={<Fruit />} />

        <Route path="shared" element={<SharedLayout />}>
          <Route index element={<PageA />} />
          <Route path="b" element={<PageB />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
