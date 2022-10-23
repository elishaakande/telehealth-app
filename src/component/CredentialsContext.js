import { createContext } from "react";

// credential context
export  const CredentialsContext = createContext({user: {}, setUser: () => {}});