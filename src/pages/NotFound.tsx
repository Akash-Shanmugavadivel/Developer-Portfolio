import { ArrowUpRight } from "lucide-react";

const NotFound = () => (
  <main className="not-found">
    <div className="not-found-inner">
      <span className="section-kicker">ERROR / 404</span>
      <h1>This route went<br /><em>off course.</em></h1>
      <p>The page you were looking for is no longer here.</p>
      <a className="button button-primary" href="/">Back to the portfolio <ArrowUpRight size={17} /></a>
    </div>
  </main>
);

export default NotFound;
