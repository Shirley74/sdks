import {Address, HexString} from '@1inch/sdk-shared'
import {MakerTraits} from '../swap-vm/maker-traits'
import {TakerTraits} from '../swap-vm'

/**
 * SwapVM Protocol types for the core methods
 */

export type Order = {
    maker: Address
    traits: MakerTraits
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
    takerTraits: TakerTraits
    takerData: HexString
}

export type QuoteNonViewArgs = {
    order: Order
    tokenIn: Address
    tokenOut: Address
    amount: bigint
    takerTraits: TakerTraits
    takerData: HexString
}

export type SwapArgs = {
    order: Order
    tokenIn: Address
    tokenOut: Address
    amount: bigint
    /**
     * Optional - not needed if using Aqua
     */
    signature?: HexString
    takerTraits: TakerTraits
    /**
     * Optional additional data (hook data, etc.)
     */
    additionalData?: HexString
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
