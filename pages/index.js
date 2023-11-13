// pages/index.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

const Page = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [tokenInfo, setTokenInfo] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const provider = new Web3Provider(ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);

      ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Erreur lors de la connexion au portefeuille', error);
    }
  };

  const handleGetTokenInfo = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, ['function name() returns (string)', 'function symbol() returns (string)', 'function balanceOf(address) returns (uint)'], signer);
      const name = await contract.name();
      const symbol = await contract.symbol();
      const balance = await contract.balanceOf(account);

      setTokenInfo({ name, symbol, balance: balance.toString() });
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du token', error);
    }
  };

  const handleTransfer = async () => {
    try {
      setTransactionStatus('En attente de la transaction...');

      const contract = new ethers.Contract(contractAddress, ['function transfer(address,uint256)'], signer);
      const transaction = await contract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 'ether'));

      await transaction.wait();
      setTransactionStatus('Transaction terminée avec succès!');
    } catch (error) {
      console.error('Erreur lors du transfert de tokens', error);
      setTransactionStatus('Erreur lors de la transaction');
    }
  };

  return (
    <div>
      <h1>Application de Portefeuille Ethereum</h1>
      {account ? (
        <p>Connecté avec succès en tant que {account}</p>
      ) : (
        <button onClick={handleConnectWallet}>Se connecter au portefeuille</button>
      )}

      <div>
        <h2>Informations du Token ERC-20</h2>
        <label>
          Adresse du Contrat ERC-20:
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </label>
        <button onClick={handleGetTokenInfo}>Obtenir les informations du token</button>
        {tokenInfo && (
          <div>
            <p>Nom: {tokenInfo.name}</p>
            <p>Symbole: {tokenInfo.symbol}</p>
            <p>Solde: {tokenInfo.balance}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Transfert de Token ERC-20</h2>
        <label>
          Adresse du destinataire:
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </label>
        <label>
          Montant à transférer:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button onClick={handleTransfer}>Transférer</button>
        {transactionStatus && <p>Statut de la transaction: {transactionStatus}</p>}
      </div>
    </div>
  );
};

export default Page;
