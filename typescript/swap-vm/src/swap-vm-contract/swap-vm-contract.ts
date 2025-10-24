import {encodeFunctionData, decodeFunctionData} from 'viem'
import {CallInfo, Address, HexString} from '@1inch/sdk-shared'
import {
    QuoteArgs,
    QuoteNonViewArgs,
    SwapArgs,
    QuoteDecodedResult,
    QuoteNonViewDecodedResult,
    SwapDecodedResult
} from './types'
import SWAP_VM_ABI from '../abi/SwapVM.abi.json' with {type: 'json'}

// todo: think a bit about traits, maybe it makes sense to have them as domain class
/**
 * SwapVM contract encoding/decoding utilities
 */
export class SwapVMContract {
    /**
     * Encode quote function call data
     * @see https://github.com/1inch/swap-vm/blob/main/src/SwapVM.sol#L84
     */
    static encodeQuoteCallData(args: QuoteArgs): HexString {
        const result = encodeFunctionData({
            abi: SWAP_VM_ABI,
            functionName: 'quote',
            args: [
                {
                    maker: args.order.maker.toString(),
                    traits: args.order.traits,
                    program: args.order.program.toString()
                },
                args.tokenIn.toString(),
                args.tokenOut.toString(),
                args.amount,
                args.takerTraitsAndData.toString()
            ]
        })

        return new HexString(result)
    }

    /**
     * Encode quoteNonView function call data
     * @see https://github.com/1inch/swap-vm/blob/main/src/SwapVM.sol#L109
     */
    static encodeQuoteNonViewCallData(args: QuoteNonViewArgs): HexString {
        const result = encodeFunctionData({
            abi: SWAP_VM_ABI,
            functionName: 'quoteNonView',
            args: [
                {
                    maker: args.order.maker.toString(),
                    traits: args.order.traits,
                    program: args.order.program.toString()
                },
                args.tokenIn.toString(),
                args.tokenOut.toString(),
                args.amount,
                args.takerTraitsAndData.toString()
            ]
        })

        return new HexString(result)
    }

    /**
     * Encode swap function call data
     * @see https://github.com/1inch/swap-vm/blob/main/src/SwapVM.sol#L124
     */
    static encodeSwapCallData(args: SwapArgs): HexString {
        const result = encodeFunctionData({
            abi: SWAP_VM_ABI,
            functionName: 'swap',
            args: [
                {
                    maker: args.order.maker.toString(),
                    traits: args.order.traits,
                    program: args.order.program.toString()
                },
                args.tokenIn.toString(),
                args.tokenOut.toString(),
                args.amount,
                args.sigPlusTakerTraitsAndData.toString()
            ]
        })

        return new HexString(result)
    }

    /**
     * Decode quote function call data
     */
    static decodeQuoteResult(data: HexString): QuoteDecodedResult {
        const decoded = decodeFunctionData({
            abi: SWAP_VM_ABI,
            data: data.toString()
        })

        const args = decoded.args as readonly [
            {maker: string; traits: bigint; program: string},
            string,
            string,
            bigint,
            string
        ]

        const [order, tokenIn, tokenOut, amount, takerTraitsAndData] = args

        return {
            functionName: decoded.functionName,
            decodedArgs: {
                order: {
                    maker: new Address(order.maker),
                    traits: order.traits,
                    program: new HexString(order.program)
                },
                tokenIn: new Address(tokenIn),
                tokenOut: new Address(tokenOut),
                amount,
                takerTraitsAndData: new HexString(takerTraitsAndData)
            }
        }
    }

    /**
     * Decode quoteNonView function call data
     */
    static decodeQuoteNonViewResult(
        data: HexString
    ): QuoteNonViewDecodedResult {
        const decoded = decodeFunctionData({
            abi: SWAP_VM_ABI,
            data: data.toString()
        })

        const args = decoded.args as readonly [
            {maker: string; traits: bigint; program: string},
            string,
            string,
            bigint,
            string
        ]

        const [order, tokenIn, tokenOut, amount, takerTraitsAndData] = args

        return {
            functionName: decoded.functionName,
            decodedArgs: {
                order: {
                    maker: new Address(order.maker),
                    traits: order.traits,
                    program: new HexString(order.program)
                },
                tokenIn: new Address(tokenIn),
                tokenOut: new Address(tokenOut),
                amount,
                takerTraitsAndData: new HexString(takerTraitsAndData)
            }
        }
    }

    /**
     * Decode swap function call data
     */
    static decodeSwapResult(data: HexString): SwapDecodedResult {
        const decoded = decodeFunctionData({
            abi: SWAP_VM_ABI,
            data: data.toString()
        })

        const args = decoded.args as readonly [
            {maker: string; traits: bigint; program: string},
            string,
            string,
            bigint,
            string
        ]

        const [order, tokenIn, tokenOut, amount, sigPlusTakerTraitsAndData] =
            args

        return {
            functionName: decoded.functionName,
            decodedArgs: {
                order: {
                    maker: new Address(order.maker),
                    traits: order.traits,
                    program: new HexString(order.program)
                },
                tokenIn: new Address(tokenIn),
                tokenOut: new Address(tokenOut),
                amount,
                sigPlusTakerTraitsAndData: new HexString(
                    sigPlusTakerTraitsAndData
                )
            }
        }
    }

    /**
     * Build quote transaction
     */
    static buildQuoteTx(contractAddress: Address, args: QuoteArgs): CallInfo {
        return {
            to: contractAddress.toString(),
            data: this.encodeQuoteCallData(args).toString(),
            value: 0n
        }
    }

    /**
     * Build quoteNonView transaction
     */
    static buildQuoteNonViewTx(
        contractAddress: Address,
        args: QuoteNonViewArgs
    ): CallInfo {
        return {
            to: contractAddress.toString(),
            data: this.encodeQuoteNonViewCallData(args).toString(),
            value: 0n
        }
    }

    /**
     * Build swap transaction
     */
    static buildSwapTx(contractAddress: Address, args: SwapArgs): CallInfo {
        return {
            to: contractAddress.toString(),
            data: this.encodeSwapCallData(args).toString(),
            value: 0n
        }
    }
}
