/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { YWETH, YWETHInterface } from "../YWETH";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address",
        name: "_registry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "allVaults",
    outputs: [
      {
        internalType: "contract VaultAPI[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bestVault",
    outputs: [
      {
        internalType: "contract VaultAPI",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositETH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract VaultAPI[]",
        name: "vaults",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]",
      },
    ],
    name: "migrate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxMigrationLoss",
        type: "uint256",
      },
    ],
    name: "migrate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract VaultAPI[]",
        name: "vaults",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "migrate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "migrate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "migrate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract VaultAPI[]",
        name: "vaults",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "migrate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract VaultAPI[]",
        name: "vaults",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]",
      },
    ],
    name: "permitAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [
      {
        internalType: "contract RegistryAPI",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract VaultAPI[]",
        name: "vaults",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]",
      },
    ],
    name: "revokeAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_registry",
        type: "address",
      },
    ],
    name: "setRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "totalVaultBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawETH",
    outputs: [
      {
        internalType: "uint256",
        name: "withdrawn",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200319e3803806200319e83398101604081905262000034916200006b565b6001600081905580546001600160a01b039384166001600160a01b03199182161790915560038054929093169116179055620000c2565b600080604083850312156200007e578182fd5b82516200008b81620000a9565b60208401519092506200009e81620000a9565b809150509250929050565b6001600160a01b0381168114620000bf57600080fd5b50565b6130cc80620000d26000396000f3fe6080604052600436106101d15760003560e01c80637b103999116100f7578063b02b7cc311610095578063e95b2de811610064578063e95b2de81461052b578063f14210a614610540578063f6326fb314610560578063fc0c546a14610568576101f4565b8063b02b7cc3146104ab578063b6b55f25146104cb578063c8e801ed146104eb578063dd62ed3e1461050b576101f4565b806395d89b41116100d157806395d89b4114610436578063a457c2d71461044b578063a9059cbb1461046b578063a91ee0dc1461048b576101f4565b80637b103999146103df57806380134801146104015780638fd3ab8014610421576101f4565b80632e1a7d4d1161016f5780633e54bacb1161013e5780633e54bacb1461035f5780633f7046f91461037f578063454b06081461039f57806370a08231146103bf576101f4565b80632e1a7d4d146102ea57806330e5065e1461030a578063313ce5671461032a578063395093511461033f576101f4565b806306fdde03116101ab57806306fdde0314610266578063095ea7b31461028857806318160ddd146102b557806323b872dd146102ca576101f4565b806301e1d114146101f95780630309beaf14610224578063063effeb14610244576101f4565b366101f4576001546001600160a01b031633146101f2576101f061057d565b505b005b600080fd5b34801561020557600080fd5b5061020e6105f5565b60405161021b9190612ff0565b60405180910390f35b34801561023057600080fd5b5061020e61023f3660046128ad565b6106ac565b34801561025057600080fd5b506102596106cf565b60405161021b9190612c82565b34801561027257600080fd5b5061027b610937565b60405161021b9190612cda565b34801561029457600080fd5b506102a86102a3366004612882565b6109dc565b60405161021b9190612ccf565b3480156102c157600080fd5b5061020e6109f3565b3480156102d657600080fd5b506102a86102e5366004612842565b610a02565b3480156102f657600080fd5b5061020e610305366004612ac1565b610a54565b34801561031657600080fd5b5061020e6103253660046127d2565b610a63565b34801561033657600080fd5b5061020e610c3d565b34801561034b57600080fd5b506102a861035a366004612882565b610cc2565b34801561036b57600080fd5b5061020e61037a366004612af1565b610cf8565b34801561038b57600080fd5b5061020e61039a36600461299f565b610d05565b3480156103ab57600080fd5b5061020e6103ba366004612ac1565b610d28565b3480156103cb57600080fd5b5061020e6103da3660046127d2565b610d34565b3480156103eb57600080fd5b506103f4610d3f565b60405161021b9190612bd0565b34801561040d57600080fd5b506101f261041c3660046128ad565b610d4e565b34801561042d57600080fd5b5061020e610e42565b34801561044257600080fd5b5061027b610e4d565b34801561045757600080fd5b506102a8610466366004612882565b610ede565b34801561047757600080fd5b506102a8610486366004612882565b610f14565b34801561049757600080fd5b506101f26104a63660046127d2565b610f21565b3480156104b757600080fd5b5061020e6104c6366004612916565b611078565b3480156104d757600080fd5b5061020e6104e6366004612ac1565b61109c565b3480156104f757600080fd5b506101f26105063660046128ad565b6110ab565b34801561051757600080fd5b5061020e61052636600461280a565b6110be565b34801561053757600080fd5b506103f46110db565b34801561054c57600080fd5b5061020e61055b366004612ac1565b611163565b61020e61057d565b34801561057457600080fd5b506103f461121d565b60015460408051630d0e30db60e41b8152905160009234926001600160a01b039091169163d0e30db09184916004808301928892919082900301818588803b1580156105c857600080fd5b505af11580156105dc573d6000803e3d6000fd5b50505050506105ee303383600061122c565b9150505b90565b600060606106016106cf565b905060005b81518110156106a75761069d82828151811061061e57fe5b60200260200101516001600160a01b03166301e1d1146040518163ffffffff1660e01b815260040160206040518083038186803b15801561065e57600080fd5b505afa158015610672573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106969190612ad9565b849061164a565b9250600101610606565b505090565b60006106bb338686868661166f565b6106c433611766565b90505b949350505050565b60025460035460015460405163f9c7bba560e01b8152606093926000926001600160a01b039182169263f9c7bba59261070c921690600401612bd0565b60206040518083038186803b15801561072457600080fd5b505afa158015610738573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075c9190612ad9565b9050808214156107ca5760028054806020026020016040519081016040528092919081815260200182805480156107bc57602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161079e575b5050505050925050506105f2565b60608167ffffffffffffffff811180156107e357600080fd5b5060405190808252806020026020018201604052801561080d578160200160208202803683370190505b50905060005b83811015610872576002818154811061082857fe5b9060005260206000200160009054906101000a90046001600160a01b031682828151811061085257fe5b6001600160a01b0390921660209283029190910190910152600101610813565b50825b8281101561092f57600354600154604051633ddfe34f60e11b81526001600160a01b0392831692637bbfc69e926108b3929116908590600401612c69565b60206040518083038186803b1580156108cb57600080fd5b505afa1580156108df573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090391906127ee565b82828151811061090f57fe5b6001600160a01b0390921660209283029190910190910152600101610875565b509250505090565b600154604080516306fdde0360e01b815290516060926001600160a01b0316916306fdde03916004808301926000929190829003018186803b15801561097c57600080fd5b505afa158015610990573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109b89190810190612a30565b6040516020016109c89190612b79565b604051602081830303815290604052905090565b60006109e9338484611774565b5060015b92915050565b60006109fd6105f5565b905090565b6000610a0f848484611828565b6001600160a01b038416600090815260046020908152604080832033808552925290912054610a49918691610a4490866118a9565b611774565b5060015b9392505050565b60006109ed33338460016118eb565b60006060610a6f6106cf565b905060005b8151811015610c3657610c2c610696838381518110610a8f57fe5b60200260200101516001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015610acf57600080fd5b505afa158015610ae3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b079190612ad9565b600a0a610c26858581518110610b1957fe5b60200260200101516001600160a01b03166399530b066040518163ffffffff1660e01b815260040160206040518083038186803b158015610b5957600080fd5b505afa158015610b6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b919190612ad9565b868681518110610b9d57fe5b60200260200101516001600160a01b03166370a082318a6040518263ffffffff1660e01b8152600401610bd09190612bd0565b60206040518083038186803b158015610be857600080fd5b505afa158015610bfc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c209190612ad9565b906120d5565b9061210f565b9250600101610a74565b5050919050565b6001546040805163313ce56760e01b815290516000926001600160a01b03169163313ce567916004808301926020929190829003018186803b158015610c8257600080fd5b505afa158015610c96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cba9190612b12565b60ff16905090565b3360008181526004602090815260408083206001600160a01b038716845290915281205490916109e9918590610a44908661164a565b6000610a4d338484612151565b6000610d14338787878761166f565b610d1e33836122eb565b9695505050505050565b60006109ed33836122eb565b60006109ed82610a63565b6003546001600160a01b031681565b828114610d5a57600080fd5b60005b83811015610e3b57848482818110610d7157fe5b9050602002016020810190610d8691906127d2565b6001600160a01b0316639fd5a6cf3330600080888888818110610da557fe5b9050602002810190610db79190613010565b6040518763ffffffff1660e01b8152600401610dd896959493929190612be4565b602060405180830381600087803b158015610df257600080fd5b505af1158015610e06573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e2a9190612a10565b610e3357600080fd5b600101610d5d565b5050505050565b60006109fd33611766565b600154604080516395d89b4160e01b815290516060926001600160a01b0316916395d89b41916004808301926000929190829003018186803b158015610e9257600080fd5b505afa158015610ea6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ece9190810190612a30565b6040516020016109c89190612ba7565b3360008181526004602090815260408083206001600160a01b038716845290915281205490916109e9918590610a4490866118a9565b60006109e9338484611828565b600360009054906101000a90046001600160a01b03166001600160a01b0316635aa6e6756040518163ffffffff1660e01b815260040160206040518083038186803b158015610f6f57600080fd5b505afa158015610f83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa791906127ee565b6001600160a01b0316336001600160a01b031614610fc457600080fd5b600380546001600160a01b0319166001600160a01b03838116919091179182905560408051635aa6e67560e01b815290519290911691635aa6e67591600480820192602092909190829003018186803b15801561102057600080fd5b505afa158015611034573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061105891906127ee565b6001600160a01b0316336001600160a01b03161461107557600080fd5b50565b6000611087838888888861166f565b61109183836122eb565b979650505050505050565b60006109ed333384600161122c565b6110b8338585858561166f565b50505050565b600460209081526000928352604080842090915290825290205481565b600354600154604051630e177dc760e41b81526000926001600160a01b039081169263e177dc70926111139290911690600401612bd0565b60206040518083038186803b15801561112b57600080fd5b505afa15801561113f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109fd91906127ee565b6000600260005414156111915760405162461bcd60e51b815260040161118890612f63565b60405180910390fd5b60026000556111a333308460016118eb565b600154604051632e1a7d4d60e01b81529192506001600160a01b031690632e1a7d4d906111d4908490600401612ff0565b600060405180830381600087803b1580156111ee57600080fd5b505af1158015611202573d6000803e3d6000fd5b5061121392503391504790506122f9565b6001600055919050565b6001546001600160a01b031681565b6000806112376110db565b905082156112ff57600019841461126557600154611260906001600160a01b031687308761239a565b6112ff565b6001546040516370a0823160e01b81526112ff91889130916001600160a01b0316906370a082319061129b908590600401612bd0565b60206040518083038186803b1580156112b357600080fd5b505afa1580156112c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112eb9190612ad9565b6001546001600160a01b031692919061239a565b600154604051636eb1769f60e11b815285916001600160a01b03169063dd62ed3e906113319030908690600401612c2b565b60206040518083038186803b15801561134957600080fd5b505afa15801561135d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113819190612ad9565b10156113b85760015461139f906001600160a01b03168260006123f2565b6001546113b8906001600160a01b0316826000196123f2565b6001546040516370a0823160e01b81526000916001600160a01b0316906370a08231906113e9903090600401612bd0565b60206040518083038186803b15801561140157600080fd5b505afa158015611415573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114399190612ad9565b90506001600160a01b03861630146114d157604051636e553f6560e01b81526001600160a01b03831690636e553f65906114799088908a90600401612ff9565b602060405180830381600087803b15801561149357600080fd5b505af11580156114a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114cb9190612ad9565b5061157b565b60001985146115065760405163b6b55f2560e01b81526001600160a01b0383169063b6b55f2590611479908890600401612ff0565b816001600160a01b031663d0e30db06040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561154157600080fd5b505af1158015611555573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115799190612ad9565b505b6001546040516370a0823160e01b81526000916001600160a01b0316906370a08231906115ac903090600401612bd0565b60206040518083038186803b1580156115c457600080fd5b505afa1580156115d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115fc9190612ad9565b905061160882826118a9565b93506001600160a01b03881630148015906116235750600081115b1561163f5760015461163f906001600160a01b031689836124b5565b505050949350505050565b600082820183811015610a4d5760405162461bcd60e51b815260040161118890612d92565b82811461167b57600080fd5b60005b8381101561175e5784848281811061169257fe5b90506020020160208101906116a791906127d2565b6001600160a01b0316639fd5a6cf873060001960008888888181106116c857fe5b90506020028101906116da9190613010565b6040518763ffffffff1660e01b81526004016116fb96959493929190612be4565b602060405180830381600087803b15801561171557600080fd5b505af1158015611729573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061174d9190612a10565b61175657600080fd5b60010161167e565b505050505050565b60006109ed826000196122eb565b6001600160a01b03831661179a5760405162461bcd60e51b815260040161118890612e9e565b6001600160a01b0382166117c05760405162461bcd60e51b815260040161118890612d50565b6001600160a01b0380841660008181526004602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061181b908590612ff0565b60405180910390a3505050565b6001600160a01b03821661184e5760405162461bcd60e51b815260040161118890612d0d565b61185b83838360016118eb565b811461186657600080fd5b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161181b9190612ff0565b6000610a4d83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506124d4565b6000806118f66110db565b905060606119026106cf565b905061190d81612500565b60005b8151811015611e67578415801561194b5750826001600160a01b031682828151811061193857fe5b60200260200101516001600160a01b0316145b1561195557611e5f565b600082828151811061196357fe5b60200260200101516001600160a01b03166370a082318a6040518263ffffffff1660e01b81526004016119969190612bd0565b60206040518083038186803b1580156119ae57600080fd5b505afa1580156119c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119e69190612ad9565b90506001600160a01b0389163014611a9557611a9281848481518110611a0857fe5b60200260200101516001600160a01b031663dd62ed3e8c306040518363ffffffff1660e01b8152600401611a3d929190612c2b565b60206040518083038186803b158015611a5557600080fd5b505afa158015611a69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a8d9190612ad9565b612522565b90505b611ae581848481518110611aa557fe5b60200260200101516001600160a01b03166375de29026040518163ffffffff1660e01b815260040160206040518083038186803b158015611a5557600080fd5b90508015611e5d576001600160a01b0389163014611b9457828281518110611b0957fe5b60200260200101516001600160a01b03166323b872dd8a30846040518463ffffffff1660e01b8152600401611b4093929190612c45565b602060405180830381600087803b158015611b5a57600080fd5b505af1158015611b6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b929190612a10565b505b6000198714611dbd576000611cba848481518110611bae57fe5b60200260200101516001600160a01b03166399530b066040518163ffffffff1660e01b815260040160206040518083038186803b158015611bee57600080fd5b505afa158015611c02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c269190612ad9565b610c26868681518110611c3557fe5b60200260200101516001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015611c7557600080fd5b505afa158015611c89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cad9190612ad9565b600a0a610c208c8b6118a9565b9050600081118015611ccb57508181105b15611d7257611d6b848481518110611cdf57fe5b60200260200101516001600160a01b0316632e1a7d4d836040518263ffffffff1660e01b8152600401611d129190612ff0565b602060405180830381600087803b158015611d2c57600080fd5b505af1158015611d40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d649190612ad9565b879061164a565b9550611db7565b611db4848481518110611d8157fe5b60200260200101516001600160a01b0316632e1a7d4d846040518263ffffffff1660e01b8152600401611d129190612ff0565b95505b50611e50565b611e4d838381518110611dcc57fe5b60200260200101516001600160a01b0316633ccfd60b6040518163ffffffff1660e01b8152600401602060405180830381600087803b158015611e0e57600080fd5b505af1158015611e22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e469190612ad9565b869061164a565b94505b848711611e5d5750611e67565b505b600101611910565b508483118015611f665750611f5a826001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015611eae57600080fd5b505afa158015611ec2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ee69190612ad9565b600a0a836001600160a01b03166399530b066040518163ffffffff1660e01b815260040160206040518083038186803b158015611f2257600080fd5b505afa158015611f36573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c269190612ad9565b611f6484876118a9565b115b156120a457611f7583866118a9565b600154604051636eb1769f60e11b81526001600160a01b039091169063dd62ed3e90611fa79030908790600401612c2b565b60206040518083038186803b158015611fbf57600080fd5b505afa158015611fd3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ff79190612ad9565b101561201657600154612016906001600160a01b0316836000196123f2565b6001600160a01b038216636e553f6561202f85886118a9565b896040518363ffffffff1660e01b815260040161204d929190612ff9565b602060405180830381600087803b15801561206757600080fd5b505af115801561207b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061209f9190612ad9565b508492505b6001600160a01b03861630146120cb576001546120cb906001600160a01b031687856124b5565b5050949350505050565b6000826120e4575060006109ed565b828202828482816120f157fe5b0414610a4d5760405162461bcd60e51b815260040161118890612e5d565b6000610a4d83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250612538565b60008061215c6110db565b90506000816001600160a01b031663ecf708586040518163ffffffff1660e01b815260040160206040518083038186803b15801561219957600080fd5b505afa1580156121ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121d19190612ad9565b90506000826001600160a01b03166301e1d1146040518163ffffffff1660e01b815260040160206040518083038186803b15801561220e57600080fd5b505afa158015612222573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122469190612ad9565b905080821161225b5760009350505050610a4d565b856000198310801561226e575060001981105b1561228f57600061227f84846118a9565b90508082111561228d578091505b505b80156122e05760006122a489308460006118eb565b9050806122b957600095505050505050610a4d565b6122c6308a83600061122c565b9550866122d382886118a9565b11156122de57600080fd5b505b505050509392505050565b6000610a4d83836000612151565b804710156123195760405162461bcd60e51b815260040161118890612e26565b6000826001600160a01b031682604051612332906105f2565b60006040518083038185875af1925050503d806000811461236f576040519150601f19603f3d011682016040523d82523d6000602084013e612374565b606091505b50509050806123955760405162461bcd60e51b815260040161118890612dc9565b505050565b6110b8846323b872dd60e01b8585856040516024016123bb93929190612c45565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915261256f565b80158061247a5750604051636eb1769f60e11b81526001600160a01b0384169063dd62ed3e906124289030908690600401612c2b565b60206040518083038186803b15801561244057600080fd5b505afa158015612454573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124789190612ad9565b155b6124965760405162461bcd60e51b815260040161118890612f9a565b6123958363095ea7b360e01b84846040516024016123bb929190612c69565b6123958363a9059cbb60e01b84846040516024016123bb929190612c69565b600081848411156124f85760405162461bcd60e51b81526004016111889190612cda565b505050900390565b6002548151111561107557805161251e906002906020840190612705565b5050565b60008183106125315781610a4d565b5090919050565b600081836125595760405162461bcd60e51b81526004016111889190612cda565b50600083858161256557fe5b0495945050505050565b60606125c4826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166125fe9092919063ffffffff16565b80519091501561239557808060200190518101906125e29190612a10565b6123955760405162461bcd60e51b815260040161118890612f19565b60606106c784846000856060612613856126cc565b61262f5760405162461bcd60e51b815260040161118890612ee2565b60006060866001600160a01b0316858760405161264c9190612b5d565b60006040518083038185875af1925050503d8060008114612689576040519150601f19603f3d011682016040523d82523d6000602084013e61268e565b606091505b509150915081156126a25791506106c79050565b8051156126b25780518082602001fd5b8360405162461bcd60e51b81526004016111889190612cda565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708181148015906106c7575050151592915050565b82805482825590600052602060002090810192821561275a579160200282015b8281111561275a57825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190612725565b5061276692915061276a565b5090565b5b808211156127665780546001600160a01b031916815560010161276b565b60008083601f84011261279a578182fd5b50813567ffffffffffffffff8111156127b1578182fd5b60208301915083602080830285010111156127cb57600080fd5b9250929050565b6000602082840312156127e3578081fd5b8135610a4d81613081565b6000602082840312156127ff578081fd5b8151610a4d81613081565b6000806040838503121561281c578081fd5b823561282781613081565b9150602083013561283781613081565b809150509250929050565b600080600060608486031215612856578081fd5b833561286181613081565b9250602084013561287181613081565b929592945050506040919091013590565b60008060408385031215612894578182fd5b823561289f81613081565b946020939093013593505050565b600080600080604085870312156128c2578081fd5b843567ffffffffffffffff808211156128d9578283fd5b6128e588838901612789565b909650945060208701359150808211156128fd578283fd5b5061290a87828801612789565b95989497509550505050565b6000806000806000806080878903121561292e578182fd5b863567ffffffffffffffff80821115612945578384fd5b6129518a838b01612789565b90985096506020890135915080821115612969578384fd5b5061297689828a01612789565b909550935050604087013561298a81613081565b80925050606087013590509295509295509295565b6000806000806000606086880312156129b6578081fd5b853567ffffffffffffffff808211156129cd578283fd5b6129d989838a01612789565b909750955060208801359150808211156129f1578283fd5b506129fe88828901612789565b96999598509660400135949350505050565b600060208284031215612a21578081fd5b81518015158114610a4d578182fd5b600060208284031215612a41578081fd5b815167ffffffffffffffff80821115612a58578283fd5b818401915084601f830112612a6b578283fd5b815181811115612a79578384fd5b604051601f8201601f191681016020018381118282101715612a99578586fd5b604052818152838201602001871015612ab0578485fd5b610d1e826020830160208701613055565b600060208284031215612ad2578081fd5b5035919050565b600060208284031215612aea578081fd5b5051919050565b60008060408385031215612b03578182fd5b50508035926020909101359150565b600060208284031215612b23578081fd5b815160ff81168114610a4d578182fd5b60008284528282602086013780602084860101526020601f19601f85011685010190509392505050565b60008251612b6f818460208701613055565b9190910192915050565b60006502cb2b0b937160d51b82528251612b9a816006850160208701613055565b9190910160060192915050565b6000607960f81b82528251612bc3816001850160208701613055565b9190910160010192915050565b6001600160a01b0391909116815260200190565b6001600160a01b03878116825286166020820152604081018590526060810184905260a060808201819052600090612c1f9083018486612b33565b98975050505050505050565b6001600160a01b0392831681529116602082015260400190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6020808252825182820181905260009190848201906040850190845b81811015612cc35783516001600160a01b031683529284019291840191600101612c9e565b50909695505050505050565b901515815260200190565b6000602082528251806020840152612cf9816040850160208701613055565b601f01601f19169190910160400192915050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b6020808252603a908201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260408201527f6563697069656e74206d61792068617665207265766572746564000000000000606082015260800190565b6020808252601d908201527f416464726573733a20696e73756666696369656e742062616c616e6365000000604082015260600190565b60208082526021908201527f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f6040820152607760f81b606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b6020808252601d908201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604082015260600190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6040820152691bdd081cdd58d8d9595960b21b606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b60208082526036908201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60408201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b606082015260800190565b90815260200190565b9182526001600160a01b0316602082015260400190565b6000808335601e19843603018112613026578283fd5b83018035915067ffffffffffffffff821115613040578283fd5b6020019150368190038213156127cb57600080fd5b60005b83811015613070578181015183820152602001613058565b838111156110b85750506000910152565b6001600160a01b038116811461107557600080fdfea264697066735822122077bb22507519202aa80837617b4b4efeab84fa13bc9e433dc5be86938ac8e2f064736f6c634300060c0033";

type YWETHConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YWETHConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YWETH__factory extends ContractFactory {
  constructor(...args: YWETHConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _weth: PromiseOrValue<string>,
    _registry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YWETH> {
    return super.deploy(_weth, _registry, overrides || {}) as Promise<YWETH>;
  }
  override getDeployTransaction(
    _weth: PromiseOrValue<string>,
    _registry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_weth, _registry, overrides || {});
  }
  override attach(address: string): YWETH {
    return super.attach(address) as YWETH;
  }
  override connect(signer: Signer): YWETH__factory {
    return super.connect(signer) as YWETH__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YWETHInterface {
    return new utils.Interface(_abi) as YWETHInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): YWETH {
    return new Contract(address, _abi, signerOrProvider) as YWETH;
  }
}
