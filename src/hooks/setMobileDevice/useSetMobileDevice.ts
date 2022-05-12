import * as React from 'react';

export const useDevice = () => {
  const [isMobileState, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const isCurrentlyInMobileDevice = window.innerWidth <= 768;
      setIsMobile(isCurrentlyInMobileDevice);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileState]);

  return [isMobileState, setIsMobile] as const;
};
