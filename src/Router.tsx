import { createHashRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './components/RootLayout/RootLayout';
import { CoreVocabQuizPage } from './pages/CoreVocabQuiz.page';
import { CoreVocabQuizMenuPage } from './pages/CoreVocabQuizMenu.page';
import { CourseMenuPage } from './pages/CourseMenu.page';
import { GlossaryPage } from './pages/Glossary.page';
import { HomePage } from './pages/Home.page';
import { VocabBuilderQuizPage } from './pages/VocabBuilderQuiz.page';
import { VocabBuilderQuizMenuPage } from './pages/VocabBuilderQuizMenu.page';

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/course/:courseId', element: <CourseMenuPage /> },
      { path: '/course/:courseId/core-vocab-quiz', element: <CoreVocabQuizMenuPage /> },
      { path: '/course/:courseId/vocab-builder-quiz', element: <VocabBuilderQuizMenuPage /> },
      {
        path: '/course/:courseId/core-vocab-quiz/:chapterId/:translationDirection',
        element: <CoreVocabQuizPage />,
      },
      {
        path: '/course/:courseId/vocab-builder-quiz/:chapterId/:translationDirection',
        element: <VocabBuilderQuizPage />,
      },
    ],
  },
  { path: '/course/:courseId/glossary', element: <GlossaryPage /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
