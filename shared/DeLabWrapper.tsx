import {
  DeLabConnecting,
  DeLabEvent,
  DeLabTransaction,
} from "@delab-team/connect";
import React from "react";
import { createElement, useEffect, useState } from "react";

export const DeLabWrapper = (props: any) => {
  const [DeLabConnect, setDeLabConnect] = useState<any>();
  const [DeLabModal, setDeLabModal] = useState<any>(null);
  const [DeLabButton, setDeLabButton] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const DeLab = await import("@delab-team/connect");

        const DeLabConnector = new DeLab.DeLabConnect(
          "https://example.com",
          "Example",
          "testnet"
        );
        setDeLabConnect(DeLabConnector);
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

        DeLabConnector.on("connect", async (event: DeLabEvent) => {
          const connectConfig: DeLabConnecting = event.data;
          const trans: DeLabTransaction = {
            to: "EQCkR1cGmnsE45N4K0otPl5EnxnRakmGqeJUNua5fkWhales",
            value: "1000000", // string value in nano-coins
          };
          const data = await DeLabConnector.sendTransaction(trans);
          if (connectConfig.typeConnect === "tonkeeper") {
            // display qrcode code ...
            console.log("tonkeeper link: ", data);
          }
        });

        DeLabConnector.on("disconnect", () => {
          console.log("disconect");
        });

        DeLabConnector.loadWallet();
      }
    })();
  }, []);

  return (
    <>
      {DeLabConnect && DeLabButton}
      {DeLabConnect && DeLabModal}
      {props.children}
    </>
  );
};
