import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { Button } from './ui/button';
const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    }

    return () => {
      getLinkToken();
    }
  }, [user])

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user })

      router.push('/');
    },
    [router, user],
  )

  const config: PlaidLinkOptions = { token, onSuccess }

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary'
        ? (<Button onClick={() => open()} disabled={!ready} className='plaidlink-primary'>
          Connect Bank
        </Button>)
        : variant === 'ghost'
          ? (<Button onClick={() => open()} disabled={!ready} variant='ghost' className='plaidlink-ghost'>
            <Image
              src='/icons/connect-bank.svg'
              alt='connect bank'
              height={24}
              width={24}
            />
            <p className='hidden text-[16px] font-semibold text-black-2 xl:block'>Connect Bank</p>
          </Button>)
          : variant === 'mobile-nav'
            ? (<Link
              href='#'
              onClick={() => open()}
              key={'connect bank'}
              className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': false })}
            >
              <Image
                src='/icons/connect-bank.svg'
                alt='connect bank'
                height={20}
                width={20}
                className={cn({ 'brightness-[3] invert-0': false })}
              />
              <p className={cn('text-16 font-semibold text-black-2', { '!text-white': false })}>
                Connect Bank
              </p>
            </Link>)
            : (<Link
              href='#'
              onClick={() => open()}
              key={'connect bank'}
              className={cn('sidebar-link', { 'bg-bank-gradient': false })}
            >
              <div className='relative size-6'>
                <Image
                  src='/icons/connect-bank.svg'
                  alt='connect bank'
                  fill
                  className={cn({ 'brightness-[3] invert-0': false })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': false })}>
                Connect Bank
              </p>
            </Link>)
      }
    </>
  )
}

export default PlaidLink
