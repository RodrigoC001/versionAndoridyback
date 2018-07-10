import React from 'react';

/* If you need to decorate everyComponent with a Wrapper
 * you can use this decorator: NextProxy will become the component
const DecoratorProxy = ({ nextProxy, ...rest }) => {
  const { value: NextProxy, next } = nextProxy;
  return (
    <Provider>
      <NextProxy {...rest} nextProxy={next()} />
    </Provider>
  );
};
*/


export default [
  // Not all proxies have options, and often relying on defaults is good enough
  // DecoratorProxy,
];
