import HeaderBox from '@/components/HeaderBox'

const TransactionHistory = () => {
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>
    </section>
  )
}

export default TransactionHistory