/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type StrategyParamsStruct = {
  performanceFee: PromiseOrValue<BigNumberish>;
  activation: PromiseOrValue<BigNumberish>;
  debtRatio: PromiseOrValue<BigNumberish>;
  minDebtPerHarvest: PromiseOrValue<BigNumberish>;
  maxDebtPerHarvest: PromiseOrValue<BigNumberish>;
  lastReport: PromiseOrValue<BigNumberish>;
  totalDebt: PromiseOrValue<BigNumberish>;
  totalGain: PromiseOrValue<BigNumberish>;
  totalLoss: PromiseOrValue<BigNumberish>;
};

export type StrategyParamsStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  performanceFee: BigNumber;
  activation: BigNumber;
  debtRatio: BigNumber;
  minDebtPerHarvest: BigNumber;
  maxDebtPerHarvest: BigNumber;
  lastReport: BigNumber;
  totalDebt: BigNumber;
  totalGain: BigNumber;
  totalLoss: BigNumber;
};

export interface VaultAPIInterface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "apiVersion()": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "creditAvailable()": FunctionFragment;
    "debtOutstanding()": FunctionFragment;
    "decimals()": FunctionFragment;
    "deposit(uint256,address)": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "deposit()": FunctionFragment;
    "depositLimit()": FunctionFragment;
    "expectedReturn()": FunctionFragment;
    "governance()": FunctionFragment;
    "guardian()": FunctionFragment;
    "management()": FunctionFragment;
    "maxAvailableShares()": FunctionFragment;
    "name()": FunctionFragment;
    "permit(address,address,uint256,uint256,bytes)": FunctionFragment;
    "pricePerShare()": FunctionFragment;
    "report(uint256,uint256,uint256)": FunctionFragment;
    "revokeStrategy()": FunctionFragment;
    "strategies(address)": FunctionFragment;
    "symbol()": FunctionFragment;
    "token()": FunctionFragment;
    "totalAssets()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "withdraw(uint256,address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "allowance"
      | "apiVersion"
      | "approve"
      | "balanceOf"
      | "creditAvailable"
      | "debtOutstanding"
      | "decimals"
      | "deposit(uint256,address)"
      | "deposit(uint256)"
      | "deposit()"
      | "depositLimit"
      | "expectedReturn"
      | "governance"
      | "guardian"
      | "management"
      | "maxAvailableShares"
      | "name"
      | "permit"
      | "pricePerShare"
      | "report"
      | "revokeStrategy"
      | "strategies"
      | "symbol"
      | "token"
      | "totalAssets"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
      | "withdraw(uint256,address)"
      | "withdraw(uint256)"
      | "withdraw()"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "allowance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "apiVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "creditAvailable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "debtOutstanding",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit(uint256,address)",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit(uint256)",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "deposit()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "depositLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "expectedReturn",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "guardian", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "management",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxAvailableShares",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "pricePerShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "report",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeStrategy",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "strategies",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalAssets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw(uint256,address)",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw(uint256)",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw()",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "apiVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "creditAvailable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "debtOutstanding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deposit(uint256,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deposit(uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "expectedReturn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "guardian", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "management", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxAvailableShares",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pricePerShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "report", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "revokeStrategy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "strategies", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdraw(uint256,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdraw(uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw()", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface ApprovalEventObject {
  owner: string;
  spender: string;
  value: BigNumber;
}
export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  ApprovalEventObject
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface TransferEventObject {
  from: string;
  to: string;
  value: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface VaultAPI extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VaultAPIInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    apiVersion(overrides?: CallOverrides): Promise<[string]>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    creditAvailable(overrides?: CallOverrides): Promise<[BigNumber]>;

    debtOutstanding(overrides?: CallOverrides): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[BigNumber]>;

    "deposit(uint256,address)"(
      amount: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "deposit(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "deposit()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    expectedReturn(overrides?: CallOverrides): Promise<[BigNumber]>;

    governance(overrides?: CallOverrides): Promise<[string]>;

    guardian(overrides?: CallOverrides): Promise<[string]>;

    management(overrides?: CallOverrides): Promise<[string]>;

    maxAvailableShares(overrides?: CallOverrides): Promise<[BigNumber]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    permit(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expiry: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    pricePerShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    report(
      _gain: PromiseOrValue<BigNumberish>,
      _loss: PromiseOrValue<BigNumberish>,
      _debtPayment: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeStrategy(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    strategies(
      _strategy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[StrategyParamsStructOutput]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    totalAssets(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "withdraw(uint256,address)"(
      maxShares: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "withdraw(uint256)"(
      maxShares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "withdraw()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  allowance(
    owner: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  apiVersion(overrides?: CallOverrides): Promise<string>;

  approve(
    spender: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balanceOf(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  creditAvailable(overrides?: CallOverrides): Promise<BigNumber>;

  debtOutstanding(overrides?: CallOverrides): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<BigNumber>;

  "deposit(uint256,address)"(
    amount: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "deposit(uint256)"(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "deposit()"(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositLimit(overrides?: CallOverrides): Promise<BigNumber>;

  expectedReturn(overrides?: CallOverrides): Promise<BigNumber>;

  governance(overrides?: CallOverrides): Promise<string>;

  guardian(overrides?: CallOverrides): Promise<string>;

  management(overrides?: CallOverrides): Promise<string>;

  maxAvailableShares(overrides?: CallOverrides): Promise<BigNumber>;

  name(overrides?: CallOverrides): Promise<string>;

  permit(
    owner: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    expiry: PromiseOrValue<BigNumberish>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;

  report(
    _gain: PromiseOrValue<BigNumberish>,
    _loss: PromiseOrValue<BigNumberish>,
    _debtPayment: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeStrategy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  strategies(
    _strategy: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<StrategyParamsStructOutput>;

  symbol(overrides?: CallOverrides): Promise<string>;

  token(overrides?: CallOverrides): Promise<string>;

  totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    sender: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "withdraw(uint256,address)"(
    maxShares: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "withdraw(uint256)"(
    maxShares: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "withdraw()"(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    apiVersion(overrides?: CallOverrides): Promise<string>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    creditAvailable(overrides?: CallOverrides): Promise<BigNumber>;

    debtOutstanding(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    "deposit(uint256,address)"(
      amount: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "deposit(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "deposit()"(overrides?: CallOverrides): Promise<BigNumber>;

    depositLimit(overrides?: CallOverrides): Promise<BigNumber>;

    expectedReturn(overrides?: CallOverrides): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<string>;

    guardian(overrides?: CallOverrides): Promise<string>;

    management(overrides?: CallOverrides): Promise<string>;

    maxAvailableShares(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    permit(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expiry: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;

    report(
      _gain: PromiseOrValue<BigNumberish>,
      _loss: PromiseOrValue<BigNumberish>,
      _debtPayment: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    revokeStrategy(overrides?: CallOverrides): Promise<void>;

    strategies(
      _strategy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<StrategyParamsStructOutput>;

    symbol(overrides?: CallOverrides): Promise<string>;

    token(overrides?: CallOverrides): Promise<string>;

    totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "withdraw(uint256,address)"(
      maxShares: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "withdraw(uint256)"(
      maxShares: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "withdraw()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter;

    "Transfer(address,address,uint256)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    apiVersion(overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    creditAvailable(overrides?: CallOverrides): Promise<BigNumber>;

    debtOutstanding(overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    "deposit(uint256,address)"(
      amount: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "deposit(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "deposit()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositLimit(overrides?: CallOverrides): Promise<BigNumber>;

    expectedReturn(overrides?: CallOverrides): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<BigNumber>;

    guardian(overrides?: CallOverrides): Promise<BigNumber>;

    management(overrides?: CallOverrides): Promise<BigNumber>;

    maxAvailableShares(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    permit(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expiry: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;

    report(
      _gain: PromiseOrValue<BigNumberish>,
      _loss: PromiseOrValue<BigNumberish>,
      _debtPayment: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeStrategy(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    strategies(
      _strategy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "withdraw(uint256,address)"(
      maxShares: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "withdraw(uint256)"(
      maxShares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "withdraw()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    apiVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    creditAvailable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    debtOutstanding(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "deposit(uint256,address)"(
      amount: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "deposit(uint256)"(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "deposit()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    expectedReturn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    guardian(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    management(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxAvailableShares(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    permit(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expiry: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    pricePerShare(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    report(
      _gain: PromiseOrValue<BigNumberish>,
      _loss: PromiseOrValue<BigNumberish>,
      _debtPayment: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeStrategy(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    strategies(
      _strategy: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalAssets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256,address)"(
      maxShares: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256)"(
      maxShares: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "withdraw()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
