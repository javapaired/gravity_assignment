db.sales.aggregate([
  { $unwind: "$items" },
  {
    $project: {
      store: 1,
      month: { $dateToString: { format: "%Y-%m", date: "$date" } },
      quantity: "$items.quantity",
      price: "$items.price",
      revenue: { $multiply: ["$items.quantity", "$items.price"] },
    },
  },

  {
    $group: {
      _id: { store: "$store", month: "$month" },
      totalRevenue: { $sum: "$revenue" },
      totalPrice: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      totalQuantity: { $sum: "$quantity" },
    },
  },

  {
    $project: {
      _id: 0,
      store: "$_id.store",
      month: "$_id.month",
      totalRevenue: 1,
      averagePrice: {
        $cond: [
          { $eq: ["$totalQuantity", 0] },
          0,
          { $divide: ["$totalPrice", "$totalQuantity"] },
        ],
      },
    },
  },

  { $sort: { store: 1, month: 1 } },
]);

//Output
[
  {
    store: "Store A",
    month: "2025-19",
    totalRevenue: 110.0,
    averagePrice: 13.75,
  },
];
