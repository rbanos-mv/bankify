import HeaderBox from '@/components/HeaderBox'

const MyBanks = () => {
  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />
      </div>
    </section>
  )
}

export default MyBanks