import "./itemsList.css"

function ItemsList({title, data, total}) {
  return (
    <div className="itemsList">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
        {
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.date.substring(0, 10)}</td>
                <td>{item.description === "undefined" ? "" : item.description}</td>
                <td>{item.amount}€</td>
              </tr>)
          })
        }
        </tbody>
      </table>
      <span className="itemsTotal">Total: {total}€</span>
    </div>
  );
}

export default ItemsList;
