use anchor_lang::prelude::*;

declare_id!("FXjLkwmKYhHVvVkgLevyPfYkcqmGHSCakpHhLoqC2VUg");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, hello: String, message: String) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);

        let data_account = &mut ctx.accounts.data_account;
        let content_account = &mut ctx.accounts.content_account;

        content_account.content = message;
        data_account.hello = hello;
        data_account.message = message;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        space = 200,
    )]
    pub data_account: Account<'info,DataAccount>,
    #[account(
        init,
        payer = signer,
        space = 250
    )]
    pub content_account: Account<'info,ContentAccount>,
    pub system_program: Program<'info,System>
}

#[account]
pub struct DataAccount {
   pub hello: String,
   pub message: String,
}

#[account]
pub struct ContentAccount{
    pub content: String,
}
