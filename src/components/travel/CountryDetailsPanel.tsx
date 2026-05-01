import type { CountryDetails } from "@/data/travelData";
import type { CountryFactSheet } from "@/data/countryFacts";
import { COUNTRY_TOTAL, STATE_TOTAL } from "@/data/travelData";
import { UsaStatesMap } from "./UsaStatesMap";

interface CountryDetailsPanelProps {
  selection: CountryDetails | null;
  onClose: () => void;
}

function FactSheetBlock({ facts }: { facts: CountryFactSheet }) {
  return (
    <dl className="details-panel__facts">
      <div>
        <dt>Capital</dt>
        <dd>{facts.capital}</dd>
      </div>
      <div>
        <dt>Region</dt>
        <dd>{facts.region}</dd>
      </div>
      <div>
        <dt>Population</dt>
        <dd>{facts.population}</dd>
      </div>
      <div>
        <dt>Languages</dt>
        <dd>{facts.languages}</dd>
      </div>
      <div>
        <dt>Currency</dt>
        <dd>{facts.currency}</dd>
      </div>
      <div className="details-panel__facts-highlight">
        <dt>Did you know?</dt>
        <dd>{facts.fact}</dd>
      </div>
    </dl>
  );
}

export function CountryDetailsPanel({
  selection,
  onClose,
}: CountryDetailsPanelProps) {
  if (!selection) {
    return (
      <aside
        className="details-panel details-panel--empty"
        aria-label="Travel details"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow">Explore the map</p>
        <h3>Click a country.</h3>
        <p>
          Open any country for a quick fact sheet. The United States also
          includes a state-by-state travel breakdown.
        </p>
      </aside>
    );
  }

  const isUnitedStates = selection.isUnitedStates;
  const { facts, factsLoading, factsError } = selection;

  return (
    <aside
      className="details-panel"
      aria-live="polite"
      aria-label="Travel details"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="details-panel__close" type="button" onClick={onClose}>
        <span aria-hidden="true">×</span>
        <span className="sr-only">Close travel details</span>
      </button>
      <p className="eyebrow">{isUnitedStates ? "United States" : "Country"}</p>
      <h3>{selection.name}</h3>

      {factsLoading && !facts ? (
        <p className="details-panel__facts-loading" role="status">
          Loading fact sheet…
        </p>
      ) : null}
      {factsError && !facts ? (
        <p className="details-panel__facts-error" role="alert">
          {factsError}
        </p>
      ) : null}
      {facts ? <FactSheetBlock facts={facts} /> : null}

      <dl className="details-panel__meta">
        <div>
          <dt>Status</dt>
          <dd>{selection.status}</dd>
        </div>
        {isUnitedStates ? (
          <div>
            <dt>States visited</dt>
            <dd className="details-panel__count">
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
        </>
      ) : !facts && !factsLoading && !factsError ? (
        <p className="details-panel__note">
          No fact sheet on file for this country yet — try another destination.
        </p>
      ) : null}
    </aside>
  );
}
