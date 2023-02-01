import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    className="coffee-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="159" y="128" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="259" rx="10" ry="10" width="280" height="27" />
    <circle cx="140" cy="120" r="120" />
    <rect x="1" y="313" rx="10" ry="10" width="280" height="88" />
    <rect x="129" y="420" rx="20" ry="20" width="152" height="45" />
    <rect x="0" y="428" rx="10" ry="10" width="91" height="27" />
  </ContentLoader>
);
