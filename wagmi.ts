import { Chain } from "@rainbow-me/rainbowkit";
import { configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const riveraTestnetMantle: Chain = {
	id: 5000,
	name: "Rivera Testnet Mantle",
	network: "ETH",
	nativeCurrency: {
		decimals: 18,
		name: "Rivera Testnet Mantle",
		symbol: "ETH",
	},
	rpcUrls: {
		default: {
			http: ["https://node.rivera.money/"],
		},
		public: {
			http: ["https://node.rivera.money/"],
		},
	},
};

const { chains, publicClient } = configureChains(
	[riveraTestnetMantle],
	[
		alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
		publicProvider(),
	]
);
export { chains };