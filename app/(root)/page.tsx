import HeaderBox from '@/components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = async () => {
  const loggedIn = { firstName: 'Roberto', lastName: 'Baños', email: 'roberto.banos@gmail.com' };
  const accounts = {
    data: [
      { name: 'Plaid Checking', currentBalance: 1250.12, mask: '1111' },
      { name: 'Plaid Savings', currentBalance: 2500.24, mask: '2222' },
      { name: 'Plaid Credit', currentBalance: 3750.36, mask: '3333' }
    ],
    totalBanks: 0,
    totalCurrentBalance: 0
  };
  const accountsData = accounts?.data as Account[];
  accounts.totalBanks = accountsData.length;
  accounts.totalCurrentBalance = accountsData?.reduce((accumulator, currentValue) => accumulator + currentValue.currentBalance, 0);

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
    </section>
  )
}

export default Home