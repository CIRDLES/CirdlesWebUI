import React from "react";
import { DefaultOptions } from "./constants/defaults";

export const OptionsContext = React.createContext(DefaultOptions);

export const OptionsProvider = OptionsContext.Provider;
export const OptionsConsumer = OptionsContext.Consumer;