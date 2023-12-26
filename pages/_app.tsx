import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
	arbitrum,
	base,
	goerli,
	mainnet,
	optimism,
	polygon,
	zora,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";
import { chains } from "../wagmi";

const { publicClient, webSocketPublicClient } = configureChains(
	[
		mainnet,
		polygon,
		optimism,
		arbitrum,
		base,
		zora,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
	],
	[publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "RainbowKit App",
	projectId: "ee56c353983496c87480ff2ae841a933",
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
export default MyApp;