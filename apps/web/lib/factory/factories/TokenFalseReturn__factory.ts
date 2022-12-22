/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  TokenFalseReturn,
  TokenFalseReturnInterface,
} from "../TokenFalseReturn";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_blocked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "value",
        type: "bool",
      },
    ],
    name: "_setBlocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
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
        name: "",
        type: "uint256",
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
        internalType: "uint8",
        name: "",
        type: "uint8",
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
    name: "totalSupply",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000bfc38038062000bfc833981810160405260208110156200003757600080fd5b5051604080518082018252601881527f796561726e2e66696e616e6365207465737420746f6b656e0000000000000000602082810191825283518085019094526004845263151154d560e21b9084015281518493916200009b9160039190620002e8565b508051620000b1906004906020840190620002e8565b50506005805460ff1916601217905550620000cc81620000ea565b620000e23361753060ff8416600a0a0262000100565b505062000384565b6005805460ff191660ff92909216919091179055565b6001600160a01b0382166200015c576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6200016a600083836200020f565b62000186816002546200028660201b620005aa1790919060201c565b6002556001600160a01b03821660009081526020818152604090912054620001b9918390620005aa62000286821b17901c565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b03821660009081526006602052604090205460ff1615620002695760405162461bcd60e51b815260040180806020018281038252603081526020018062000bcc6030913960400191505060405180910390fd5b620002818383836200028160201b6200060b1760201c565b505050565b600082820183811015620002e1576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200032b57805160ff19168380011785556200035b565b828001600101855582156200035b579182015b828111156200035b5782518255916020019190600101906200033e565b50620003699291506200036d565b5090565b5b808211156200036957600081556001016200036e565b61083880620003946000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063395093511161008c578063a457c2d711610066578063a457c2d71461027f578063a51c68d5146102ab578063a9059cbb146102db578063dd62ed3e14610307576100cf565b8063395093511461022557806370a082311461025157806395d89b4114610277576100cf565b806306fdde03146100d4578063095ea7b31461015157806313f73eaa1461019157806318160ddd146101b757806323b872dd146101d1578063313ce56714610207575b600080fd5b6100dc610335565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101165781810151838201526020016100fe565b50505050905090810190601f1680156101435780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017d6004803603604081101561016757600080fd5b506001600160a01b0381351690602001356103cb565b604080519115158252519081900360200190f35b61017d600480360360208110156101a757600080fd5b50356001600160a01b03166103e8565b6101bf6103fd565b60408051918252519081900360200190f35b61017d600480360360608110156101e757600080fd5b506001600160a01b03813581169160208101359091169060400135610403565b61020f61040c565b6040805160ff9092168252519081900360200190f35b61017d6004803603604081101561023b57600080fd5b506001600160a01b038135169060200135610415565b6101bf6004803603602081101561026757600080fd5b50356001600160a01b0316610468565b6100dc610483565b61017d6004803603604081101561029557600080fd5b506001600160a01b0381351690602001356104e4565b6102d9600480360360408110156102c157600080fd5b506001600160a01b038135169060200135151561054c565b005b61017d600480360360408110156102f157600080fd5b506001600160a01b038135169060200135610577565b6101bf6004803603604081101561031d57600080fd5b506001600160a01b038135811691602001351661057f565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103c15780601f10610396576101008083540402835291602001916103c1565b820191906000526020600020905b8154815290600101906020018083116103a457829003601f168201915b5050505050905090565b60006103df6103d8610610565b8484610614565b50600192915050565b60066020526000908152604090205460ff1681565b60025490565b60009392505050565b60055460ff1690565b60006103df610422610610565b846104638560016000610433610610565b6001600160a01b03908116825260208083019390935260409182016000908120918c1681529252902054906105aa565b610614565b6001600160a01b031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103c15780601f10610396576101008083540402835291602001916103c1565b60006103df6104f1610610565b84610463856040518060600160405280602581526020016107de602591396001600061051b610610565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190610700565b6001600160a01b03919091166000908152600660205260409020805460ff1916911515919091179055565b600092915050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600082820183811015610604576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b505050565b3390565b6001600160a01b0383166106595760405162461bcd60e51b81526004018080602001828103825260248152602001806107ba6024913960400191505060405180910390fd5b6001600160a01b03821661069e5760405162461bcd60e51b81526004018080602001828103825260228152602001806107986022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6000818484111561078f5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561075457818101518382015260200161073c565b50505050905090810190601f1680156107815780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50505090039056fe45524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122075d26ebe35c91ec96d3a8935f12753b819932c8cd2917ed1d86771be467cf9d764736f6c634300060c0033546f6b656e207472616e7366657220726566757365642e205265636569766572206973206f6e20626c61636b6c697374";

type TokenFalseReturnConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenFalseReturnConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenFalseReturn__factory extends ContractFactory {
  constructor(...args: TokenFalseReturnConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TokenFalseReturn> {
    return super.deploy(
      _decimals,
      overrides || {}
    ) as Promise<TokenFalseReturn>;
  }
  override getDeployTransaction(
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_decimals, overrides || {});
  }
  override attach(address: string): TokenFalseReturn {
    return super.attach(address) as TokenFalseReturn;
  }
  override connect(signer: Signer): TokenFalseReturn__factory {
    return super.connect(signer) as TokenFalseReturn__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenFalseReturnInterface {
    return new utils.Interface(_abi) as TokenFalseReturnInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenFalseReturn {
    return new Contract(address, _abi, signerOrProvider) as TokenFalseReturn;
  }
}
