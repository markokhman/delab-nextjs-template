import { DeLabConnect, DeLabEvent, DeLabNetwork } from "@delab-team/connect";
import { createElement, useEffect, useState } from "react";

export const useDeLab = (props: {
  connectInfo: {
    url: string;
    name: string;
    network: DeLabNetwork;
  };
  callbacks: {
    onConnect?: (event: DeLabEvent) => void;
    onDisconnect?: () => void;
    onApproveLink?: (event: DeLabEvent) => void;
    onError?: (event: DeLabEvent) => void;
    onErrorTransaction?: (event: DeLabEvent) => void;
    onErrorTonCoinWallet?: (event: DeLabEvent) => void;
    onErrorTonhub?: (event: DeLabEvent) => void;
    onErrorTonkeeper?: (event: DeLabEvent) => void;
  };
}) => {
  const [DeLabConnector, setDeLabConnector] = useState<DeLabConnect>();
  const [DeLabModal, setDeLabModal] = useState<any>(null);
  const [DeLabButton, setDeLabButton] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const DeLab = await import("@delab-team/connect");
        const DeLabConnector = new DeLab.DeLabConnect(
          props.connectInfo.url,
          props.connectInfo.name,
          props.connectInfo.network
        );
        setDeLabConnector(DeLabConnector);
        setDeLabModal(
          createElement(DeLab.DeLabModal, {
            DeLabConnectObject: DeLabConnector,
            scheme: "dark",
          })
        );

        setDeLabButton(
          createElement(DeLab.DeLabButton, {
            DeLabConnectObject: DeLabConnector,
            scheme: "dark",
          })
        );

        DeLabConnector.on("connect", async (event: DeLabEvent) =>
          props.callbacks.onConnect?.(event)
        );

        DeLabConnector.on("disconnect", () => {
          props.callbacks.onDisconnect?.();
        });

        DeLabConnector.on("approve-link", (event: DeLabEvent) => {
          props.callbacks.onApproveLink?.(event);
        });

        DeLabConnector.on("error", (event: DeLabEvent) => {
          props.callbacks.onError?.(event);
        });

        DeLabConnector.on("error-transaction", (event: DeLabEvent) => {
          props.callbacks.onErrorTransaction?.(event);
        });

        DeLabConnector.on("error-toncoinwallet", (event: DeLabEvent) => {
          props.callbacks.onErrorTonCoinWallet?.(event);
        });

        DeLabConnector.on("error-tonhub", (event: DeLabEvent) => {
          props.callbacks.onErrorTonhub?.(event);
        });

        DeLabConnector.on("error-tonkeeper", (event: DeLabEvent) => {
          props.callbacks.onErrorTonkeeper?.(event);
        });

        DeLabConnector.loadWallet();
      }
    })();
  }, []);

  return { DeLabConnector, DeLabModal, DeLabButton };
};
