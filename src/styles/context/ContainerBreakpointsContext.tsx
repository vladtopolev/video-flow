import { createContext, ReactNode, useContext } from 'react';
import { useContainerQuery } from 'react-container-query';

const query = {
  xs: {
    minWidth: 0,
    maxWidth: 299,
  },
  sm: {
    minWidth: 300,
    maxWidth: 599,
  },
  md: {
    minWidth: 600,
    maxWidth: 899,
  },
  lg: {
    minWidth: 900,
    maxWidth: 1199,
  },
};

export type Breakpoints = { [K in keyof typeof query]: boolean };

type ContainerBreakpointsContextType = { breakpoints: Breakpoints };
const ContainerBreakpointsContext =
  createContext<ContainerBreakpointsContextType>(
    {} as ContainerBreakpointsContextType,
  );

const ContainerBreakpointsContextComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [params, containerRef] = useContainerQuery(query, {});
  const breakpoints = params as Breakpoints;

  return (
    <ContainerBreakpointsContext.Provider value={{ breakpoints }}>
      <div ref={containerRef}>{children}</div>
    </ContainerBreakpointsContext.Provider>
  );
};

export default ContainerBreakpointsContextComponent;

export const useContainerBreakpoints = () =>
  useContext(ContainerBreakpointsContext);
