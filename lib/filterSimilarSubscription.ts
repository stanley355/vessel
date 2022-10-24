const filterSimilarSubscription = (subscriptions: any[]) => {
  let filteredList:any[] = [subscriptions[0]];
  
  subscriptions.map((subs:any, index: number)=> {
    if (index < subscriptions.length) {
      filteredList.map((filt:any, filtIndex: number) => {
        if (filt.channels_id === subs.channels_id) {
          filteredList[filtIndex] = subs;
        } else {
          filteredList.push(subs);
        }
      });
    }
  });

  return filteredList;
};

export default filterSimilarSubscription;
