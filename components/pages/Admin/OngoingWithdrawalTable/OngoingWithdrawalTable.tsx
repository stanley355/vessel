import React from 'react';

interface IWithdrawalTable {
  ongoingWithdrawals: any[]
}

const OngoingWithdrawalTable = (props: IWithdrawalTable) => {
  const { ongoingWithdrawals } = props;

  //   account_number
  // account_owner_name
  // amount
  // bank_name
  // created_at
  // id
  // status
  // updated_at
  // user_id
  console.log(ongoingWithdrawals);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>User ID</td>
            <td>Created At</td>
            <td>Bank</td>
            <td>Acc No.</td>
            <td>Acc Owner Name</td>
            <td>Amount</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {ongoingWithdrawals.length > 0 &&
            ongoingWithdrawals.map((withdrawal: any) =>
              <tr>
                <td>{withdrawal.id}</td>
                <td>{withdrawal.user_id}</td>
                <td>{new Date(withdrawal.created_at).toDateString()}</td>
                <td>{withdrawal.bank_name}</td>
                <td>{withdrawal.account_number}</td>
                <td>{withdrawal.account_owner_name}</td>
                <td>{withdrawal.amount}</td>
                <td>{withdrawal.status}</td>
                <td>
                  <button>Accept</button>
                  <button>Reject</button>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default OngoingWithdrawalTable;