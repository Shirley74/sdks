import {Address, HexString} from '@1inch/sdk-shared'

/**
 * SwapVM Protocol types for the core methods
 */

export type Order = {
    maker: Address
    traits: bigint
    /**
     * List of instructions to be executed (8 bit index, 8 bit args length, args)
     */
    program: HexString
}

export type QuoteArgs = {
    order: Order
    tokenIn: Address
    tokenOut: Address
    amount: bigint
    takerTraitsAndData: HexString
}

export type QuoteNonViewArgs = {
    order: Order
    tokenIn: Address
    tokenOut: Address
    amount: bigint
    takerTraitsAndData: HexString
}

export type SwapArgs = {
    order: Order
    tokenIn: Address
    tokenOut: Address
    amount: bigint
    sigPlusTakerTraitsAndData: HexString
}

export type QuoteResult = {
    amountIn: bigint
    amountOut: bigint
}

export type SwapResult = {
    amountIn: bigint
    amountOut: bigint
    orderHash: HexString
}

export type QuoteDecodedResult = {
    functionName: string
    decodedArgs: QuoteArgs
}

export type QuoteNonViewDecodedResult = {
    functionName: string
    decodedArgs: QuoteNonViewArgs
}

export type SwapDecodedResult = {
    functionName: string
    decodedArgs: SwapArgs
}
