import { ReactNode } from "react";

import ProviderQueryClient from "./ProviderQueryClient";

const Providers = async ({ children }: { children: ReactNode }) => {
  return <ProviderQueryClient>{children}</ProviderQueryClient>;
};

export default Providers;
