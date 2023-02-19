import React, { useState } from "react";
import { ethers } from "ethers";
import ArtworkRegistry from "./artifacts/contracts/ArtworkRegistry.sol/ArtworkRegistry.json";

function App() {
  const [artistName, setArtistName] = useState("");
  const [artworkTitle, setArtworkTitle] = useState("");
  const [dateOfCreation, setDateOfCreation] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const network = await provider.getNetwork();
        const deployedNetwork = ArtworkRegistry.networks[network.chainId];
        const contract = new ethers.Contract(
          deployedNetwork.address,
          ArtworkRegistry.abi,
          signer
        );
        setStatus("Connected to wallet");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask to connect to the Ethereum network");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>Status: {status}</div>
    </div>
  );
}

export default App;
