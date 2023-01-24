import Header from "./components/Header";
import RootLayout from "./components/RootLayout";
import WorkingArea from "./components/WorkingArea";

const App: React.FC = () => {
  return (
    <RootLayout>
      <Header />
      <WorkingArea />
    </RootLayout>
  );
};

export default App;