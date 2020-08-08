import React, { useState } from "react";
import { Tree } from "phylo-react";
import "./App.css";

function App() {
  const [tree, setTree] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  return (
    <div className="App">
      <form
        onSubmit={async () => {
          setLoading(true);
          const result = await fetch(
            "/genetree/id/ENSGT00390000003602?prune_species=cow;prune_taxon=9526;content-type=text/x-nh;nh_format=simple"
          );
          if (!result.ok) {
            setError(result.statusText);
            setLoading(false);
            return;
          }
          const text = await result.text();
          setTree(text);
          setError(undefined);
          setLoading(false);
        }}
      >
        <label>
          Enter Ensembl gene ID
          <input id="geneid" type="text" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <Tree tree={tree} />
    </div>
  );
}

export default App;
