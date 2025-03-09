import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { createPublicClient, http, createWalletClient, parseEther, formatEther } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { hardhat } from "viem/chains"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

// Constants
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key"
const MESSAGE = "Please sign this message to log in"
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS

// Viem Setup
const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
})

const account = privateKeyToAccount(process.env.PRIVATE_KEY)
const walletClient = createWalletClient({
  account,
  chain: hardhat,
  transport: http(),
})

// Middleware: Verify JWT Token
const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]
  if (!token) return res.status(403).json({ message: "Token required" })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

// Routes
app.post("/api/request-message", (req, res) => {
  const { address } = req.body
  if (!address) {
    return res.status(400).json({ message: "Ethereum address is required" })
  }
  return res.json({ message: MESSAGE })
})

app.post("/api/authenticate", async (req, res) => {
  const { address, signature } = req.body
  try {
    const recoveredAddress = await publicClient.verifyMessage({
      message: MESSAGE,
      signature,
    })

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(400).json({ message: "Invalid signature" })
    }

    const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: "1h" })
    return res.json({ token })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: String(error) })
  }
})

app.get("/api/token/balance/:address", async (req, res) => {
  try {
    const balance = await publicClient.readContract({
      address: TOKEN_ADDRESS,
      abi: [
        {
          name: "balanceOf",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "account", type: "address" }],
          outputs: [{ name: "", type: "uint256" }],
        },
      ],
      functionName: "balanceOf",
      args: [req.params.address],
    })

    res.json({ balance: formatEther(balance) })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch balance", error: String(error) })
  }
})

app.post("/api/token/transfer", verifyJWT, async (req, res) => {
  const { recipient, amount } = req.body

  if (!recipient || !amount) {
    return res.status(400).json({ message: "Recipient address and amount are required" })
  }

  try {
    const { request } = await publicClient.simulateContract({
      address: TOKEN_ADDRESS,
      abi: [
        {
          name: "transfer",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            { name: "recipient", type: "address" },
            { name: "amount", type: "uint256" },
          ],
          outputs: [{ name: "", type: "bool" }],
        },
      ],
      functionName: "transfer",
      args: [recipient, parseEther(amount)],
    })

    const hash = await walletClient.writeContract(request)
    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    res.json({
      message: "Transfer successful",
      txHash: receipt.transactionHash,
    })
  } catch (error) {
    res.status(500).json({
      message: "Transfer failed",
      error: String(error),
    })
  }
})

// Staking endpoints
app.post("/api/token/stake", verifyJWT, async (req, res) => {
  const { amount } = req.body

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" })
  }

  try {
    const { request } = await publicClient.simulateContract({
      address: TOKEN_ADDRESS,
      abi: [
        {
          name: "stake",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [{ name: "amount", type: "uint256" }],
          outputs: [],
        },
      ],
      functionName: "stake",
      args: [parseEther(amount)],
    })

    const hash = await walletClient.writeContract(request)
    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    res.json({
      message: "Staking successful",
      txHash: receipt.transactionHash,
    })
  } catch (error) {
    res.status(500).json({
      message: "Staking failed",
      error: String(error),
    })
  }
})

app.post("/api/token/unstake", verifyJWT, async (req, res) => {
  const { amount } = req.body

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" })
  }

  try {
    const { request } = await publicClient.simulateContract({
      address: TOKEN_ADDRESS,
      abi: [
        {
          name: "unstake",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [{ name: "amount", type: "uint256" }],
          outputs: [],
        },
      ],
      functionName: "unstake",
      args: [parseEther(amount)],
    })

    const hash = await walletClient.writeContract(request)
    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    res.json({
      message: "Unstaking successful",
      txHash: receipt.transactionHash,
    })
  } catch (error) {
    res.status(500).json({
      message: "Unstaking failed",
      error: String(error),
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


