import React, { useState } from 'react';

// Mark the function as a generic using P (or whatever variable you want)
export function withExtraInfo() {
  const [extraInfo, setExtraInfo] = useState('');
  setExtraInfo('important data.');

  const ComponentWithExtraInfo = (props) => {
    // At this point, the props being passed in are the original props the component expects.
    return <WrappedComponent {...props} extraInfo={extraInfo} />;
  };
  return ComponentWithExtraInfo;
}