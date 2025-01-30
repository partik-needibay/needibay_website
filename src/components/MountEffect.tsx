"use client"
import { useEffect } from 'react';

const WithMountEffect = (Component) => {
  return (props) => {
    useEffect(() => {
      document.body.classList.remove('before-mount');
    }, []);

    return <Component {...props} />;
  };
};

export default WithMountEffect;