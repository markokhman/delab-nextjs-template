import {
  DeLabConnecting,
  DeLabEvent,
  DeLabTransaction,
} from "@delab-team/connect";
import { useState } from "react";
import { useDeLab } from "../shared/DeLabHook";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectConfig, setConnectConfig] = useState<DeLabConnecting>();

  const { DeLabConnector, DeLabModal, DeLabButton } = useDeLab({
    connectInfo: {
      url: "https://example.com",
      name: "Example",
      network: "testnet",
    },
    callbacks: {
      onConnect: async (event: DeLabEvent) => handleConnect(event),
      onDisconnect: () => {
        console.log("disconect");
      },
      onErrorTransaction: (event: DeLabEvent) => handleErrorTransaction(event),
      // ... other callbacks handled in our hook
    },
  });

  const handleConnect = async (event: DeLabEvent) => {
    setIsConnected(true);
    setConnectConfig(event.data);
  };

  const handleErrorTransaction = async (event: DeLabEvent) => {
    console.log("error transaction", event.data);
  };

  const triggerDisconnect = async () => {
    await DeLabConnector!.disconnect();
    setIsConnected(false);
  };

  const triggerRequestTransaction = async () => {
    const trans: DeLabTransaction = {
      to: "EQCkR1cGmnsE45N4K0otPl5EnxnRakmGqeJUNua5fkWhales",
      value: "1000000", // string value in nano-coins
    };
    const data = await DeLabConnector!.sendTransaction(trans);
    if (connectConfig!.typeConnect === "tonkeeper") {
      // display qrcode code ...
      console.log("tonkeeper link: ", data);
    }
  };

  return (
    <div>
      {DeLabModal}
      {isConnected ? (
        <>
          <p>Connected</p>
          <button onClick={triggerDisconnect}>Disconnect</button>
          <button onClick={triggerRequestTransaction}>
            Request transaction
          </button>
        </>
      ) : (
        <div className='w-[200px]'>{DeLabButton}</div>
      )}
    </div>
  );
}
