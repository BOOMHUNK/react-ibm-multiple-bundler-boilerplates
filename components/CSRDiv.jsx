import dynamic from 'next/dynamic';
import React from 'react';

const CSRDiv = (props) => <div {...props}>{props.children}</div>;

export default dynamic(() => Promise.resolve(CSRDiv), {
  ssr: false,
});
