import SparqlEndpointContent from "./SparqlEndpointContent";

const SparqlEndpoint = () => {
  return (
      <>
          <div className="p-24">
              <h4><b>Write SPARQL queries!</b></h4>
          </div>
          <div className="p-24">
              <br />
              <SparqlEndpointContent/>
          </div>
      </>
  );
};

export default SparqlEndpoint;
