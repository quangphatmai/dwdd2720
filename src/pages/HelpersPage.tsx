import HelperComponent from "../helpers/HelperComponent";
import Render from "../components/Render";

export default function HelpersPage() {
  return (
    <section className="card p-6">
      <h1 className="title-md">Helpers</h1>
      <p className="mt-1 text-sm text-muted">
        Utility demonstrations and helper-function output.
      </p>
      <div className="mt-4 card-soft px-4 py-3 text-sm text-muted">
        <HelperComponent />
      </div>
      <div className="mt-6">
        <Render />
      </div>
    </section>
  );
}