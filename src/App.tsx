import { LazyMotion, domAnimation } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <LazyMotion features={domAnimation} strict>
    {window.location.pathname === "/" ? <Index /> : <NotFound />}
  </LazyMotion>
);

export default App;
