/**
 * @format
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';

const Page = React.forwardRef(({
  title,
  children,
  ...rest
}: any, ref) => {
  const location = useLocation();

  const sendPageViewEvent = React.useCallback(() => {
    // TODO(): pageview
  }, [location]);

  React.useEffect(() => {
    sendPageViewEvent();
  }, [sendPageViewEvent]);

  return (
    <div
      ref={ref}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
