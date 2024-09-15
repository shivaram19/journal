'use client';

import { getJournalProgram, getJournalProgramId } from '@journal/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';


interface EntryArgs{
  title:string;
  message:string;
  owner:PublicKey;
}
export function useJournalProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getJournalProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getJournalProgram(provider);

  const accounts = useQuery({
    queryKey: ['journal', 'all', { cluster }],
    queryFn: () => program.account.journalEntryState.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createEntry = useMutation<string, Error, EntryArgs>({
    mutationKey: ['journal', 'create', { cluster }],
    mutationFn: async ({ title, message, owner }) =>{
      const [journalEntryAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from(title), owner.toBuffer()],
        programId
      );
      return program.methods.createEntry(title, message).accounts({journalEntry: journalEntryAddress}).rpc();
    },
    onSuccess: signature => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createEntry
  };
}

export function useJournalProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { programId, program, accounts } = useJournalProgram();

  const accountQuery = useQuery({
    queryKey: ['journal', 'fetch', { cluster, account }],
    queryFn: () => program.account.journalEntryState.fetch(account),
  });

  const updateEntry = useMutation<string, Error, EntryArgs>({
    mutationKey: ['journal', 'update', { cluster, account }],
    mutationFn: async({title, message, owner}) => {
      const [journalEntryAddress] =  PublicKey.findProgramAddressSync(
        [Buffer.from(title),owner.toBuffer()],
        programId
      );
      return program.methods.updateEntry(title, message).accounts({journalEntry: journalEntryAddress}).rpc();
    },
    onSuccess: signature => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to Update the message in the account')
  });

  const deleteEntry = useMutation({
    mutationKey: ['journal', 'delete', { cluster, account }],
    mutationFn: async(title:string) => {
      program.methods.deleteEntry(title).accounts({ journalEntry: account }).rpc();
    },
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  return {
    accountQuery,
    updateEntry,
    deleteEntry
  };
}
