import "../styles/globals.css";

import type { AppProps } from "next/app";
import NonSSRWrapper from "../shared/NoSSR";
import { DeLabWrapper } from "../shared/DeLabWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <NonSSRWrapper>
    // <DeLabWrapper>
    <Component {...pageProps} />
    // </DeLabWrapper>
    // </NonSSRWrapper>
  );
}
