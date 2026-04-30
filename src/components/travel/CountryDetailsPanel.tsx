import type { CountryDetails } from "@/data/travelData";
import { COUNTRY_TOTAL, STATE_TOTAL, visitedStates } from "@/data/travelData";
import { UsaStatesMap } from "./UsaStatesMap";

interface CountryDetailsPanelProps {
  selection: CountryDetails | null;
  onClose: () => void;
}

export function CountryDetailsPanel({
  selection,
  onClose,
}: CountryDetailsPanelProps) {
  if (!selection) {
    return (
      <aside className="details-panel details-panel--empty" aria-label="Travel details">
        <p className="eyebrow">Explore the map</p>
        <h3>Click a highlighted country.</h3>
        <p>
          Visited destinations open a compact detail card. The United States
          reveals the state-by-state travel breakdown.
        </p>
      </aside>
    );
  }

  const isUnitedStates = selection.isUnitedStates;

  return (
    <aside className="details-panel" aria-live="polite" aria-label="Travel details">
      <button className="details-panel__close" type="button" onClick={onClose}>
        <span aria-hidden="true">×</span>
        <span className="sr-only">Close travel details</span>
      </button>
      <p className="eyebrow">{isUnitedStates ? "State breakdown" : "Country"}</p>
      <h3>{selection.name}</h3>
      <dl className="details-panel__meta">
        <div>
          <dt>Status</dt>
          <dd>{selection.status}</dd>
        </div>
        {isUnitedStates ? (
          <div>
            <dt>States visited</dt>
            <dd>
              {STATE_TOTAL} of 50
            </dd>
          </div>
        ) : null}
      </dl>
      {isUnitedStates ? (
        <>
          <UsaStatesMap />
          <p className="details-panel__note">
            Highlighting {STATE_TOTAL} visited U.S. states as part of{" "}
            {COUNTRY_TOTAL} countries visited.
          </p>
          <div className="details-panel__state-list" aria-label="Visited U.S. states">
            {visitedStates.map((state) => (
              <span key={state}>{state}</span>
            ))}
          </div>
        </>
      ) : (
        <p className="details-panel__note">
          {selection.name} is included in the visited countries list.
        </p>
      )}
    </aside>
  );
}
