import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers, Wallet } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";
import { useAccount } from "wagmi";
import contractABI from "../contractABI.json";
import { CONTRACT_ADDRESS, PRIVATE_KEY, PROVIDER_URL } from "../config";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { isConnected } = useAccount({
    onConnect: ({ address, isReconnected, connector }) => {
      console.log("Wallet has been connected");
      if (address) {
        setAddress(address);
      } else {
        setMessage("Wallet not connected");
      }
    },
  });

  const handleClaimClick = async () => {
    const timeStamp = new Date().toISOString();
    const newMessage = `${address}`;
    setMessage(newMessage);

    try {
      const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
      const wallet = new Wallet(PRIVATE_KEY, provider);
      const abi: any[] = contractABI;
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
      const transaction = await contract.claim(address);
      await transaction.wait();
      const transactionHash = transaction.hash;
      setMessage(`ID: ${transactionHash} claimed!`);
    } catch (error) {
      console.error(error);
      setMessage("Failed 101");
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <nav className={styles.navbar}>
          <ConnectButton />
        </nav>
        <div className={styles.claimButtonContainer}>
          <button
		  suppressHydrationWarning
            className={`${styles.claimButton} ${
              !isConnected && styles.disabledClaimButton
            }`}
            onClick={handleClaimClick}
            disabled={!isConnected}
          >
            {isConnected ? "Claim" : "404"}
          </button>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </main>
    </div>
  );
};
export default Home;