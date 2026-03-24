// Adjust this import path to where your StatusFilter type/union is defined.
import type { StatusFilter } from "../models/project";

type ProjectFilterBarProps = {
  value: StatusFilter;
  count: number;
  onChange: (value: StatusFilter) => void;
};

export function ProjectFilterBar(props: ProjectFilterBarProps) {
  const { value, count, onChange } = props;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-700">Status</span>
        <select
          className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
          value={value}
          onChange={(e) => {
            // HTML <select> values are strings, so we cast to our union type.
            // This is safe as long as the <option value> strings match StatusFilter.
            onChange(e.target.value as StatusFilter);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
          <option value="planned">Planned</option>
          <option value="blocked">Blocked</option>
          <option value="draft">Draft</option>
          <option value="paused">Paused</option>
        </select>
      </label>

      <div className="text-sm text-slate-600">
        Showing <span className="font-semibold text-slate-900">{count}</span>{" "}
        projects
      </div>
    </div>
  );
}
