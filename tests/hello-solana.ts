import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloSolana } from "../target/types/hello_solana";

describe("hello-solana", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloSolana as Program<HelloSolana>;

  const signer = anchor.web3.Keypair.generate();
  const data_account = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    await program.provider.connection.confirmTransaction(await program.provider.connection.requestAirdrop(signer.publicKey, 100*anchor.web3.LAMPORTS_PER_SOL), 'finalized');
    //program.provider.connection.confirmTransaction(await program.provider.connection.requestAirdrop(data_account.publicKey, 100*anchor.web3.LAMPORTS_PER_SOL), 'confirmed');

    // Add your test here.
    const tx = await program.methods.initialize("Hello", "Solana")
    .accounts({
      signer : signer.publicKey,
      dataAccount: data_account.publicKey
    })
    .signers([signer, data_account])
    .rpc();
    console.log("Your transaction signature", tx);
    const dataAccount = await program.account.dataAccount.fetch(data_account.publicKey);
    console.log("Data Account: ", dataAccount)
    //console.log("Your transaction signature", tx);
  });

  // it("Is updated!", async () => {
  //   // Add your test here.
  //   const tx = await program.methods.update().rpc();
  //   console.log("Your transaction signature for Update function", tx);
  // });
});
