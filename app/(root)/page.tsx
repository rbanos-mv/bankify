import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return;

  const accounts = {
    data: [
      { name: 'Plaid Checking', currentBalance: 1250.12, mask: '1111' },
      { name: 'Plaid Savings', currentBalance: 2500.24, mask: '2222' },
      { name: 'Plaid Credit', currentBalance: 3750.36, mask: '3333' }
    ],
    totalBanks: 0,
    totalCurrentBalance: 0,
    transactions: []
  };
  const accountsData = accounts?.data as Bank[] & Account[];
  accounts.totalBanks = accountsData.length;
  accounts.totalCurrentBalance = accounts?.data?.reduce((accumulator, currentValue) => accumulator + currentValue.currentBalance, 0);

  return (
    <section className='home'>
      <div className="home-content">
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || 'Guest'}
            subtext='Access and manage your account and transactions efficiently.'
          />
          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accountsData.slice(0, 2)}
      />
    </section>
  )
}

export default Home