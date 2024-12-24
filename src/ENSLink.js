import React from "react";
import { resolveENS } from "../utils/resolveENS";

const ENSLink = ({ domain }) => (
  <a href={resolveENS(domain)} target="_blank" rel="noopener noreferrer">
    Visit {domain}
  </a>
);

export default ENSLink;
