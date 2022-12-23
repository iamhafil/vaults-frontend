import { useState } from "react";
import { useRouter } from "next/router";
import { useMetaMask } from "../../hooks/useMetaMask";
import { ETHTickets__factory } from "blockchain";
import { ethers } from "ethers";
import { config } from "../../lib/config";

import { SiEthereum } from 'react-icons/si';

import { Button, FlexContainerColumn, FlexItem, } from "../styledComponents/general";
import { VaultsView } from "../styledComponents/vaults";
import { Vault__factory } from "../../lib/factory";


interface Vault {
    name: String,
    token: String,
    description: String,
    address: String,
    image: String
}

interface VaultsProps {
    vaults: Vault[];
}

const VaultItem: React.FC<Vault> = ({
    name,
    token,
    description,
    address,
    image
}) => {

    const { state: {wallet} } = useMetaMask();
    const router = useRouter();
    const [isDepositing, setIsDepositing] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const depositToken = async (tokenAmount: any) => {
        setIsDepositing(true);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // In ethers.js, providers allow you to query data from the blockchain. 
        // They represent the way you connect to the blockchain. 
        // With them you can only call view methods on contracts and get data from those contract.
        // Signers are authenticated providers conected to the current address in MetaMask.
        const signer = provider.getSigner();

        const factory = new Vault__factory(signer);
        const vaultInstance = factory.attach(config.contractAddress);

        vaultInstance.deposit({from: wallet!})

    };
    return (
        <FlexItem>

        </FlexItem>
    );
}


const Vaults = ({ vaults }: VaultsProps) => {
    return (
        <VaultsView>
            <h1>Vaults</h1>
            <FlexContainerColumn gap={1}>
                {vaults.map((ticket) => (
                    <VaultItem {...vault} />
                ))}
            </FlexContainerColumn>
        </VaultsView>
    );

};

export default Vaults;


